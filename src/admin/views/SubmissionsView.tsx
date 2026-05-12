/**
 * Phase 7b — Submissions Inbox.
 * Shows all form submissions for the current tenant:
 * reservations, RSVPs, quote requests, room inquiries, training signups.
 *
 * CSV export is client-side (no backend needed — all data already loaded).
 */
import { useEffect, useState } from 'react';
import type { AdminSession } from '../AdminApp';

type FormType = 'reservation' | 'rsvp' | 'quote-request' | 'room-inquiry' | 'training-signup';

interface Submission {
  id: string;
  formType: FormType;
  data: Record<string, unknown>;
  submittedAt: string;
}

interface RsvpRow {
  id: string;
  guestName: string;
  attending: boolean;
  guestCount: number;
  menuChoice: string;
  message: string;
  submittedAt: string;
}

const FORM_TABS: { id: FormType | 'rsvp'; label: string; icon: string }[] = [
  { id: 'reservation', label: 'Reservierungen', icon: '🍽️' },
  { id: 'rsvp', label: 'RSVP', icon: '💍' },
  { id: 'quote-request', label: 'Anfragen', icon: '🔧' },
  { id: 'room-inquiry', label: 'Zimmer', icon: '🏨' },
  { id: 'training-signup', label: 'Probetraining', icon: '💪' },
];

const PAGE_SIZE = 25;

export function SubmissionsView({ session }: { session: AdminSession }) {
  const slug = session.slug ?? '';
  const [activeTab, setActiveTab] = useState<FormType | 'rsvp'>('reservation');
  const [rows, setRows] = useState<(Submission | RsvpRow)[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  // Reset page when tab changes
  useEffect(() => { setPage(0); }, [activeTab]);

  useEffect(() => {
    if (!slug) return;
    loadTab(activeTab);
  }, [activeTab, slug]);

  const pageRows = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);

  async function loadTab(tab: FormType | 'rsvp') {
    setLoading(true);
    setRows([]);
    try {
      if (tab === 'rsvp') {
        const r = await fetch(`/api/rsvp?slug=${slug}`);
        const j = await r.json();
        setRows((j.rsvps as RsvpRow[]) ?? []);
      } else {
        const endpointMap: Record<string, string> = {
          reservation: 'reservation',
          'quote-request': 'quote-request',
          'room-inquiry': 'room-inquiry',
          'training-signup': 'training-signup',
        };
        const r = await fetch(`/api/${endpointMap[tab]}?slug=${slug}`);
        const j = await r.json();
        const key = Object.keys(j).find((k) => Array.isArray(j[k]));
        setRows(key ? (j[key] as Submission[]) : []);
      }
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    if (!rows.length) return;
    const isRsvp = activeTab === 'rsvp';

    const headers = isRsvp
      ? ['ID', 'Name', 'Dabei', 'Personen', 'Menü', 'Nachricht', 'Eingegangen']
      : ['ID', ...Object.keys((rows[0] as Submission).data ?? {}), 'Eingegangen'];

    const csvRows = rows.map((row) => {
      if (isRsvp) {
        const r = row as RsvpRow;
        return [r.id, r.guestName, r.attending ? 'Ja' : 'Nein', r.guestCount, r.menuChoice, r.message, r.submittedAt];
      }
      const s = row as Submission;
      return [s.id, ...Object.values(s.data ?? {}), s.submittedAt];
    });

    const csv = [headers, ...csvRows]
      .map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Posteingang</h1>
          <p className="text-sm text-slate-500 mt-0.5">Eingegangene Formulare & Anfragen</p>
        </div>
        {rows.length > 0 && (
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            ↓ CSV Export ({rows.length})
          </button>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {FORM_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeTab === t.id
                ? 'bg-slate-900 text-white font-medium'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-sm text-slate-400 py-8 text-center">Lädt…</div>
      ) : rows.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-sm">Noch keine Einträge vorhanden.</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {activeTab === 'rsvp'
              ? (pageRows as RsvpRow[]).map((r) => <RsvpCard key={r.id} row={r} />)
              : (pageRows as Submission[]).map((s) => <SubmissionCard key={s.id} row={s} />)}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, rows.length)} von {rows.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 0}
                  className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Zurück
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages - 1}
                  className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Weiter →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SubmissionCard({ row }: { row: Submission }) {
  const [expanded, setExpanded] = useState(false);
  const preview = Object.entries(row.data ?? {}).slice(0, 3);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm font-medium text-slate-900">
              {String(row.data?.name || row.data?.guestName || '—')}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {preview.map(([k, v]) => `${k}: ${v}`).join(' · ')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className="text-xs text-slate-400">{formatDate(row.submittedAt)}</span>
          <span className="text-slate-400 text-xs">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {expanded && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
            {Object.entries(row.data ?? {}).map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-slate-400 capitalize">{k}</dt>
                <dd className="text-sm text-slate-800 break-words">{String(v ?? '—')}</dd>
              </div>
            ))}
            <div>
              <dt className="text-xs text-slate-400">Eingegangen</dt>
              <dd className="text-sm text-slate-800">{formatDate(row.submittedAt)}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

function RsvpCard({ row }: { row: RsvpRow }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.attending ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {row.attending ? '✓ Dabei' : '✗ Abgesagt'}
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900">{row.guestName}</p>
            <p className="text-xs text-slate-500">{row.guestCount} {row.guestCount === 1 ? 'Person' : 'Personen'}{row.menuChoice ? ` · ${row.menuChoice}` : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className="text-xs text-slate-400">{formatDate(row.submittedAt)}</span>
          <span className="text-slate-400 text-xs">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {expanded && row.message && (
        <div className="border-t border-slate-100 px-5 py-3 bg-slate-50">
          <p className="text-xs text-slate-500 mb-1">Nachricht</p>
          <p className="text-sm text-slate-800">{row.message}</p>
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('de-AT', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return iso;
  }
}
