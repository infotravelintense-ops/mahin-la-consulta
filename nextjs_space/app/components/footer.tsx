'use client';

import { useLang } from './language-context';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Settings } from 'lucide-react';

const legalLabels: Record<string, { privacy: string; cookies: string; legal: string; admin: string }> = {
  es: { privacy: 'Política de Privacidad', cookies: 'Política de Cookies', legal: 'Aviso Legal', admin: 'Administración' },
  ca: { privacy: 'Política de Privacitat', cookies: 'Política de Cookies', legal: 'Avís Legal', admin: 'Administració' },
  de: { privacy: 'Datenschutz', cookies: 'Cookie-Richtlinie', legal: 'Impressum', admin: 'Verwaltung' },
  en: { privacy: 'Privacy Policy', cookies: 'Cookie Policy', legal: 'Legal Notice', admin: 'Admin' },
};

export default function Footer() {
  const { t, lang } = useLang();
  const year = 2026;
  const labels = legalLabels[lang] || legalLabels.es;

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 items-center">
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <Image src="/images/logo-official.png" alt="Mahin Kuhenuri" fill className="object-contain" />
            </div>
            <div>
              <p className="font-display font-bold text-base">Mahin Kuhenuri</p>
              <p className="text-xs text-muted-foreground">Terapias Naturales & Enfermería</p>
              <p className="text-xs text-muted-foreground">La Barceloneta, Barcelona</p>
            </div>
          </Link>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">{t('footer_privacy')}</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <Link href="/politica-privacidad" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {labels.privacy}
              </Link>
              <Link href="/politica-cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {labels.cookies}
              </Link>
              <Link href="/aviso-legal" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {labels.legal}
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-primary" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Mahin Kuhenuri. {t('footer_rights')}
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            <Settings className="w-3 h-3" />
            {labels.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
