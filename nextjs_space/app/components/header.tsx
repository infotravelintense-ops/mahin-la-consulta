'use client';

import { useState, useEffect } from 'react';
import { useLang } from './language-context';
import LanguageSwitcher from './language-switcher';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_about', href: '/sobre-mi' },
  { key: 'nav_services', href: '/servicios' },
  { key: 'nav_pricing', href: '/tarifas' },
  { key: 'nav_gallery', href: '/galeria' },
  { key: 'nav_contact', href: '/contacto' },
];

export default function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const showSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid
          ? 'bg-background/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${showSolid ? 'h-16 sm:h-18' : 'h-18 sm:h-22'}`}>
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className={`relative transition-all duration-300 ${showSolid ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-12 h-12 sm:w-14 sm:h-14'}`}>
              <Image src="/images/logo-official.png" alt="Mahin Kuhenuri Logo" fill className="object-contain" />
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-sm leading-tight tracking-tight group-hover:text-primary transition-colors">Mahin Kuhenuri</p>
              <p className="text-xs text-muted-foreground">Terapias Naturales</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'hover:text-primary'
                  }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="md:hidden p-2.5 rounded-xl hover:bg-primary/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-t border-border/30"
          >
            <div className="max-w-[1200px] mx-auto px-4 py-4 space-y-1">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-primary/5'
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
