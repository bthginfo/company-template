import { useState } from 'react';
import { SECTION_TYPE_MAP, type SectionFieldSpec, type ArrayFieldDef } from '../section-types';
import { ImageField } from '../ImageField';
import { RichTextEditor } from '../RichTextEditor';

type Props = {
  sectionType: string;
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
};

export function SectionDataEditor({ sectionType, data, onChange }: Props) {
  const typeDef = SECTION_TYPE_MAP[sectionType];

  function setField(key: string, value: unknown) {
    onChange({ ...data, [key]: value });
  }

  if (!typeDef) {
    return <GenericJsonEditor data={data} onChange={onChange} />;
  }

  return (
    <div className="space-y-4">
      {typeDef.fields.map((field) => {
        if (field.type === 'array') {
          const items = Array.isArray(data[field.key])
            ? (data[field.key] as Record<string, unknown>[])
            : [];
          return (
            <ArrayEditor
              key={field.key}
              def={field}
              value={items}
              onChange={(v) => setField(field.key, v)}
            />
          );
        }
        return (
          <FieldInput
            key={field.key}
            def={field}
            value={data[field.key]}
            onChange={(v) => setField(field.key, v)}
          />
        );
      })}
    </div>
  );
}

// ─── FieldInput ──────────────────────────────────────────────────────────────

function FieldInput({
  def,
  value,
  onChange,
}: {
  def: Exclude<SectionFieldSpec, ArrayFieldDef>;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const inputClass =
    'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400';

  // Image — use the real upload widget
  if (def.type === 'image') {
    return (
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-2">{def.label}</label>
        {def.hint && <p className="text-[11px] text-slate-400 mb-2 leading-snug">{def.hint}</p>}
        <ImageField
          url={String(value ?? '')}
          onChange={(url) => onChange(url)}
          buttonLabel="Bild hochladen"
        />
      </div>
    );
  }

  // Boolean — rendered as a checkbox with inline label
  if (def.type === 'boolean') {
    return (
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded accent-slate-800 cursor-pointer"
        />
        <span className="text-sm text-slate-700">{def.label}</span>
      </label>
    );
  }

  const strVal = String(value ?? '');

  // textarea fields named "body" or "content" get the full rich-text editor
  if (def.type === 'textarea' && (def.key === 'body' || def.key === 'content')) {
    return (
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-2">{def.label}</label>
        <RichTextEditor
          value={strVal}
          onChange={(html) => onChange(html)}
          placeholder={def.placeholder}
          rows={12}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {def.label}
      </label>
      {def.hint && <p className="text-[11px] text-slate-400 mb-1.5 leading-snug">{def.hint}</p>}

      {def.type === 'textarea' ? (
        <textarea
          value={strVal}
          onChange={(e) => onChange(e.target.value)}
          placeholder={def.placeholder}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      ) : def.type === 'select' ? (
        <select
          value={strVal}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          {def.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={def.type === 'url' ? 'url' : 'text'}
          value={strVal}
          onChange={(e) => onChange(e.target.value)}
          placeholder={def.placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}

// ─── ArrayEditor ─────────────────────────────────────────────────────────────

type ArrayItem = Record<string, unknown>;

function ArrayEditor({
  def,
  value,
  onChange,
}: {
  def: ArrayFieldDef;
  value: ArrayItem[];
  onChange: (items: ArrayItem[]) => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  function addItem() {
    const blank: ArrayItem = {};
    def.fields.forEach((f) => {
      blank[f.key] = '';
    });
    const next = [...value, blank];
    onChange(next);
    setExpanded(next.length - 1);
  }

  function removeItem(idx: number) {
    if (!confirm('Eintrag löschen?')) return;
    onChange(value.filter((_, i) => i !== idx));
    if (expanded === idx) setExpanded(null);
    else if (expanded !== null && expanded > idx) setExpanded(expanded - 1);
  }

  function updateField(idx: number, key: string, v: unknown) {
    onChange(value.map((item, i) => (i === idx ? { ...item, [key]: v } : item)));
  }

  function moveItem(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
    setExpanded(target);
  }

  const previewField = def.fields.find((f) =>
    ['name', 'title', 'question', 'headline', 'value', 'label'].includes(f.key),
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600">{def.label}</span>
        <button
          type="button"
          onClick={addItem}
          className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          + {def.addLabel ?? 'Hinzufügen'}
        </button>
      </div>

      {value.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-lg p-4 text-center">
          <p className="text-xs text-slate-400">Noch keine Einträge.</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {value.map((item, idx) => {
            const isOpen = expanded === idx;
            const preview = previewField ? String(item[previewField.key] ?? '') : '';
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg bg-white overflow-hidden"
              >
                <div
                  className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : idx)}
                >
                  <span className="text-[11px] text-slate-400 font-mono w-5 shrink-0 text-right">
                    {idx + 1}.
                  </span>
                  <span className="text-sm text-slate-700 flex-1 truncate min-w-0">
                    {preview || `${def.itemLabel ?? 'Eintrag'} ${idx + 1}`}
                  </span>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveItem(idx, -1);
                      }}
                      disabled={idx === 0}
                      className="w-6 h-6 flex items-center justify-center text-xs text-slate-400 hover:text-slate-700 disabled:opacity-25 transition-colors"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveItem(idx, 1);
                      }}
                      disabled={idx === value.length - 1}
                      className="w-6 h-6 flex items-center justify-center text-xs text-slate-400 hover:text-slate-700 disabled:opacity-25 transition-colors"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(idx);
                      }}
                      className="w-6 h-6 flex items-center justify-center text-xs text-slate-300 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                    <span
                      className={`text-slate-400 text-xs ml-1 transition-transform duration-150 inline-block ${isOpen ? 'rotate-180' : ''}`}
                    >
                      ▾
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-slate-100 px-3 py-3 space-y-3 bg-slate-50/40">
                    {def.fields.map((field) => (
                      <FieldInput
                        key={field.key}
                        def={field}
                        value={item[field.key]}
                        onChange={(v) => updateField(idx, field.key, v)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Generic JSON Fallback ────────────────────────────────────────────────────

function GenericJsonEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
}) {
  const [text, setText] = useState(() => JSON.stringify(data, null, 2));
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setText(val);
    try {
      const parsed = JSON.parse(val) as Record<string, unknown>;
      onChange(parsed);
      setError('');
    } catch {
      setError('Ungültiges JSON');
    }
  }

  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        Sektions-Daten (JSON)
      </label>
      {error && <p className="text-xs text-red-500 mb-1">{error}</p>}
      <textarea
        value={text}
        onChange={handleChange}
        rows={10}
        spellCheck={false}
        className="w-full font-mono text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      />
    </div>
  );
}
