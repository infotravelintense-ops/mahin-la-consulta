'use client';

import { useState, useEffect } from 'react';
import { useLang } from './language-context';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const texts: Record<string, { message: string; accept: string; reject: string; config: string; link: string }> = {
  es: {
    message: 'Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación.',
    accept: 'Aceptar todas',
    reject: 'Solo necesarias',
    config: 'Configurar',
    link: 'Política de Cookies',
  },
  ca: {
    message: 'Utilitzem cookies pròpies i de tercers per millorar la teva experiència de navegació.',
    accept: 'Acceptar totes',
    reject: 'Només necessàries',
    config: 'Configurar',
    link: 'Política de Cookies',
  },
  de: {
    message: 'Wir verwenden eigene Cookies und Cookies von Drittanbietern, um Ihr Surferlebnis zu verbessern.',
    accept: 'Alle akzeptieren',
    reject: 'Nur notwendige',
    config: 'Einstellungen',
    link: 'Cookie-Richtlinie',
  },
  en: {
    message: 'We use our own and third-party cookies to improve your browsing experience.',
    accept: 'Accept all',
    reject: 'Necessary only',
    config: 'Settings',
    link: 'Cookie Policy',
  },
};

export default function CookieBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const t = texts[lang] || texts.es;

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem('cookie_consent', 'all');
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem('cookie_consent', 'necessary');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="max-w-[900px] mx-auto bg-card rounded-2xl shadow-lg border border-border p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t.message}{' '}
                  <Link href="/politica-cookies" className="text-primary hover:underline font-medium">
                    {t.link}
                  </Link>
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleAccept}
                    className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
                  >
                    {t.accept}
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-secondary text-secondary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-all"
                  >
                    {t.reject}
                  </button>
                </div>
              </div>
              <button
                onClick={handleReject}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors shrink-0"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
