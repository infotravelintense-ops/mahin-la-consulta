'use client';

import { useLang } from './language-context';
import { Lang } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const langs: { code: Lang; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ca', label: 'Català', flag: '🇹🇩' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref?.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = langs.find((l: { code: Lang; label: string; flag: string }) => l.code === lang) ?? langs[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-sm font-medium transition-colors"
        aria-label="Cambiar idioma"
      >
        <Globe className="w-4 h-4" />
        <span>{current?.flag}</span>
        <span className="hidden sm:inline">{current?.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-50 min-w-[140px]">
          {langs.map((l: { code: Lang; label: string; flag: string }) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-primary/10 transition-colors ${
                lang === l.code ? 'bg-primary/5 font-semibold text-primary' : ''
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
