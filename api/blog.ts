/**
 * GET    /api/blog?slug=<tenant>           → list published posts (public)
 * GET    /api/blog?slug=<tenant>&admin=1   → all posts (admin)
 * GET    /api/blog?slug=<tenant>&post=<id> → single post by ID (admin)
 * POST   /api/blog?slug=<tenant>           → create post (admin)
 * PATCH  /api/blog?id=<id>                 → update post (admin)
 * DELETE /api/blog?id=<id>                 → delete post (admin)
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq, and, desc } from 'drizzle-orm';
import { db, schema } from '../src/lib/db/client.js';
import { getSession, unauthorized } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return handleGet(req, res);
  if (req.method === 'POST') return handlePost(req, res);
  if (req.method === 'PATCH') return handlePatch(req, res);
  if (req.method === 'DELETE') return handleDelete(req, res);
  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const isAdmin = req.query.admin === '1';
  if (isAdmin) {
    const session = await getSession(req);
    if (!session) return unauthorized(res);
  }

  const postId = req.query.post ? String(req.query.post) : null;
  if (postId) {
    const post = await db.query.blogPosts.findFirst({
      where: and(eq(schema.blogPosts.id, postId), eq(schema.blogPosts.tenantId, tenant.id)),
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.status(200).json({ post });
  }

  const where = isAdmin
    ? eq(schema.blogPosts.tenantId, tenant.id)
    : and(eq(schema.blogPosts.tenantId, tenant.id), eq(schema.blogPosts.published, true));

  const posts = await db.query.blogPosts.findMany({
    where,
    orderBy: [desc(schema.blogPosts.publishedAt), desc(schema.blogPosts.createdAt)],
  });

  res.status(200).json({ posts });
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const tenantSlug = String(req.query.slug || '');
  if (!tenantSlug) return res.status(400).json({ error: 'slug required' });

  const tenant = await db.query.tenants.findFirst({ where: eq(schema.tenants.slug, tenantSlug) });
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const body = req.body as Record<string, unknown>;
  const slug = String(body.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const title = String(body.title || '');
  if (!slug || !title) return res.status(400).json({ error: 'slug and title required' });

  const published = Boolean(body.published ?? false);

  const [post] = await db
    .insert(schema.blogPosts)
    .values({
      tenantId: tenant.id,
      slug,
      title,
      excerpt: String(body.excerpt || ''),
      featuredImage: String(body.featuredImage || ''),
      content: Array.isArray(body.content) ? (body.content as Record<string, unknown>[]) : [],
      author: String(body.author || ''),
      category: String(body.category || ''),
      tags: (body.tags as string[]) ?? [],
      published,
      publishedAt: published ? new Date() : null,
      seoTitle: String(body.seoTitle || body.metaTitle || ''),
      seoDescription: String(body.seoDescription || body.metaDescription || ''),
    })
    .returning();

  res.status(201).json({ post });
}

async function handlePatch(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  const body = req.body as Record<string, unknown>;
  const update: Partial<typeof schema.blogPosts.$inferInsert> = {};

  if (body.title !== undefined) update.title = String(body.title);
  if (body.slug !== undefined) update.slug = String(body.slug);
  if (body.excerpt !== undefined) update.excerpt = String(body.excerpt);
  if (body.featuredImage !== undefined) update.featuredImage = String(body.featuredImage);
  if (body.content !== undefined) update.content = Array.isArray(body.content) ? (body.content as Record<string, unknown>[]) : [];
  if (body.author !== undefined) update.author = String(body.author);
  if (body.category !== undefined) update.category = String(body.category);
  if (body.tags !== undefined) update.tags = body.tags as string[];
  if (body.seoTitle !== undefined) update.seoTitle = String(body.seoTitle);
  if (body.seoDescription !== undefined) update.seoDescription = String(body.seoDescription);
  if (body.published !== undefined) {
    update.published = Boolean(body.published);
    if (update.published) update.publishedAt = new Date();
  }

  const [updated] = await db
    .update(schema.blogPosts)
    .set({ ...update, updatedAt: new Date() })
    .where(eq(schema.blogPosts.id, id))
    .returning();

  if (!updated) return res.status(404).json({ error: 'Post not found' });
  res.status(200).json({ post: updated });
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return unauthorized(res);

  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'id required' });

  await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
  res.status(200).json({ ok: true });
}
