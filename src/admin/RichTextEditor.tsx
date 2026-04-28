import React, { useEffect, useRef } from 'react';

/**
 * Minimal contenteditable-based rich-text editor with a small toolbar.
 * Emits HTML via `onChange`. Sanitisation happens at render time on the
 * site (see `sanitize-html.ts`), so we keep raw HTML here for fidelity.
 *
 * Supported actions: H2 / H3, bold, italic, underline, bullet list,
 * numbered list, link, blockquote, clear formatting.
 */

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
};

type Cmd =
  | { type: 'exec'; cmd: string; value?: string; label: string; title: string }
  | { type: 'block'; tag: string; label: string; title: string }
  | { type: 'link'; label: string; title: string }
  | { type: 'clear'; label: string; title: string };

const COMMANDS: Cmd[] = [
  { type: 'block', tag: 'h2', label: 'H2', title: 'Überschrift' },
  { type: 'block', tag: 'h3', label: 'H3', title: 'Zwischenüberschrift' },
  { type: 'block', tag: 'p', label: '¶', title: 'Absatz' },
  { type: 'exec', cmd: 'bold', label: 'B', title: 'Fett (Ctrl+B)' },
  { type: 'exec', cmd: 'italic', label: 'I', title: 'Kursiv (Ctrl+I)' },
  { type: 'exec', cmd: 'underline', label: 'U', title: 'Unterstrichen' },
  { type: 'exec', cmd: 'insertUnorderedList', label: '• Liste', title: 'Aufzählung' },
  { type: 'exec', cmd: 'insertOrderedList', label: '1. Liste', title: 'Nummerierte Liste' },
  { type: 'block', tag: 'blockquote', label: '“ Zitat', title: 'Zitat' },
  { type: 'link', label: 'Link', title: 'Link einfügen' },
  { type: 'clear', label: 'Format löschen', title: 'Formatierung entfernen' },
];

export function RichTextEditor({ value, onChange, placeholder, className, rows = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lastValue = useRef<string>('');

  // Initial fill + external value changes.
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML !== value && value !== lastValue.current) {
      ref.current.innerHTML = value || '';
      lastValue.current = value || '';
    }
  }, [value]);

  const emit = () => {
    if (!ref.current) return;
    const html = ref.current.innerHTML;
    lastValue.current = html;
    onChange(html);
  };

  const handle = (c: Cmd) => {
    if (!ref.current) return;
    ref.current.focus();
    if (c.type === 'exec') {
      document.execCommand(c.cmd, false, c.value);
    } else if (c.type === 'block') {
      // formatBlock requires angle brackets in some browsers.
      document.execCommand('formatBlock', false, `<${c.tag}>`);
    } else if (c.type === 'link') {
      const url = window.prompt('URL (https://…)');
      if (url) {
        document.execCommand('createLink', false, url);
        // Set rel/target on freshly created anchors.
        const anchors = ref.current.querySelectorAll('a[href]');
        anchors.forEach((a) => {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        });
      }
    } else if (c.type === 'clear') {
      document.execCommand('removeFormat');
      document.execCommand('formatBlock', false, '<p>');
    }
    emit();
  };

  // Plain-text paste so we don't import styles from Word/etc.
  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className={['rounded-2xl border border-line bg-white overflow-hidden', className || ''].join(' ')}>
      <div className="flex flex-wrap gap-1 border-b border-line px-2 py-2 bg-[#fafaf7]">
        {COMMANDS.map((c, i) => (
          <button
            key={i}
            type="button"
            title={c.title}
            onMouseDown={(e) => { e.preventDefault(); handle(c); }}
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-line transition-colors"
          >
            {c.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        onPaste={onPaste}
        data-placeholder={placeholder || 'Beitrag schreiben …'}
        className="rte-content prose prose-slate max-w-none px-4 py-3 outline-none focus:ring-0"
        style={{ minHeight: `${rows * 1.5}rem` }}
      />
      <style>{`
        .rte-content:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        .rte-content h2 { font-size: 1.5rem; font-weight: 600; margin: 1.2em 0 0.4em; }
        .rte-content h3 { font-size: 1.2rem; font-weight: 600; margin: 1em 0 0.3em; }
        .rte-content p { margin: 0.6em 0; }
        .rte-content ul { list-style: disc; padding-left: 1.4rem; margin: 0.6em 0; }
        .rte-content ol { list-style: decimal; padding-left: 1.4rem; margin: 0.6em 0; }
        .rte-content blockquote { border-left: 3px solid #cbd5e1; padding-left: 1rem; color: #475569; margin: 0.8em 0; font-style: italic; }
        .rte-content a { color: #1d4ed8; text-decoration: underline; }
      `}</style>
    </div>
  );
}
