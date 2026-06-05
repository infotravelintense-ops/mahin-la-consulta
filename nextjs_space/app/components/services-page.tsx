'use client';

import { useLang } from './language-context';
import { WhatsAppServiceButton } from './whatsapp-button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Lang } from '@/lib/i18n';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Leaf, Sun, HeartPulse, Home, Sparkles } from 'lucide-react';

interface Service {
  id: string;
  slug: string;
  category: string;
  imageUrl: string | null;
  nameEs: string;
  nameCa: string;
  nameDe: string;
  nameEn: string;
  descEs: string;
  descCa: string;
  descDe: string;
  descEn: string;
  shortDescEs: string;
  shortDescCa: string;
  shortDescDe: string;
  shortDescEn: string;
}

const categoryIcons: Record<string, any> = {
  western: Leaf,
  oriental: Sun,
  programs: HeartPulse,
  nursing: Home,
};

const categoryKeys: Record<string, string> = {
  western: 'services_western',
  oriental: 'services_oriental',
  programs: 'services_programs',
  nursing: 'services_nursing',
};

const categoryAccents: Record<string, string> = {
  western: 'from-emerald-500/15 to-green-600/5',
  oriental: 'from-amber-500/15 to-orange-500/5',
  programs: 'from-rose-500/15 to-pink-500/5',
  nursing: 'from-sky-500/15 to-blue-500/5',
};

function getLocalizedName(service: Service, lang: Lang): string {
  if (lang === 'ca') return service?.nameCa || service?.nameEs || '';
  if (lang === 'de') return service?.nameDe || service?.nameEs || '';
  if (lang === 'en') return service?.nameEn || service?.nameEs || '';
  return service?.nameEs || '';
}

function getLocalizedShortDesc(service: Service, lang: Lang): string {
  if (lang === 'ca') return service?.shortDescCa || service?.shortDescEs || '';
  if (lang === 'de') return service?.shortDescDe || service?.shortDescEs || '';
  if (lang === 'en') return service?.shortDescEn || service?.shortDescEs || '';
  return service?.shortDescEs || '';
}

function getLocalizedDesc(service: Service, lang: Lang): string {
  if (lang === 'ca') return service?.descCa || service?.descEs || '';
  if (lang === 'de') return service?.descDe || service?.descEs || '';
  if (lang === 'en') return service?.descEn || service?.descEs || '';
  return service?.descEs || '';
}

function ServiceCard({ service, lang }: { service: Service; lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  const name = getLocalizedName(service, lang);
  const shortDesc = getLocalizedShortDesc(service, lang);
  const fullDesc = getLocalizedDesc(service, lang);

  return (
    <motion.div
      layout
      className="card-tilt bg-card rounded-2xl overflow-hidden shadow-sm group relative"
    >
      {service?.imageUrl && (
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          <Image
            src={service.imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display font-bold text-lg mb-2">{name}</h3>
        {shortDesc && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{shortDesc}</p>}

        <AnimatePresence>
          {expanded && fullDesc && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 overflow-hidden"
            >
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{fullDesc}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-border/50">
          <WhatsAppServiceButton serviceName={name} />
          {fullDesc && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium transition-colors"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const { t, lang } = useLang();
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState('western');

  useEffect(() => {
    fetch('/api/services')
      .then((r: Response) => r.json())
      .then((data: Service[]) => setServices(data ?? []))
      .catch(() => setServices([]));
  }, []);

  const categories = ['western', 'oriental', 'programs', 'nursing'];
  const filtered = (services ?? []).filter((s: Service) => s?.category === activeCategory);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 sm:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/8 blob blur-2xl animate-float-reverse pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-6"
            >
              <span className="w-8 h-px bg-primary" />
              <Sparkles className="w-4 h-4" />
              <span className="w-8 h-px bg-primary" />
            </motion.span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
              {t('services_title')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{t('services_subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {categories.map((cat: string) => {
              const Icon = categoryIcons[cat] ?? Leaf;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                      : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(categoryKeys[cat] ?? '')}
                </button>
              );
            })}
          </motion.div>

          {/* Services grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((service: Service, i: number) => (
                <motion.div
                  key={service?.id ?? i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  <ServiceCard service={service} lang={lang} />
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground col-span-full text-center py-12"
                >
                  {t('loading')}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
