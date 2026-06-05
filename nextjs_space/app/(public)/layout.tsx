'use client';

import { LangProvider } from '../components/language-context';
import Header from '../components/header';
import Footer from '../components/footer';
import { WhatsAppFloat } from '../components/whatsapp-button';
import CookieBanner from '../components/cookie-banner';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </LangProvider>
  );
}
