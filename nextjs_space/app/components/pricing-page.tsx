'use client';

import { useLang } from './language-context';
import { motion } from 'framer-motion';
import { Clock, Users, Package, CheckCircle, ArrowRight, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const { t } = useLang();

  const cards = [
    {
      icon: Clock,
      title: 'pricing_rate',
      subtitle: 'pricing_example',
      detail: 'pricing_rate_detail',
      featured: true,
      accent: 'from-primary/20 to-accent/10',
    },
    {
      icon: Users,
      title: 'pricing_discount',
      subtitle: 'pricing_discount_example',
      detail: 'pricing_discount_detail',
      featured: false,
      accent: 'from-amber-500/15 to-orange-500/5',
    },
    {
      icon: Package,
      title: null,
      titleText: 'Packs',
      subtitle: 'pricing_packs',
      detail: 'pricing_packs_detail',
      featured: false,
      accent: 'from-sky-500/15 to-blue-500/5',
    },
  ];

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
              {t('pricing_title')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{t('pricing_page_subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 sm:py-28">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-7">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`card-tilt relative bg-card rounded-2xl p-8 shadow-sm text-center overflow-hidden group ${
                  card.featured ? 'ring-2 ring-primary/30 shadow-lg shadow-primary/10' : 'border border-border/30'
                }`}
              >
                {card.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  {card.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4"
                    >
                      <Star className="w-3 h-3" />
                      Popular
                    </motion.div>
                  )}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-primary mb-2">
                    {card.title ? t(card.title) : card.titleText}
                  </p>
                  <p className="text-muted-foreground mb-5">{t(card.subtitle)}</p>
                  <div className="h-px bg-border/50 my-5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(card.detail)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-card rounded-2xl p-8 sm:p-12 shadow-sm border border-border/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center">{t('pricing_includes_title')}</h2>
            <div className="grid sm:grid-cols-2 gap-5 relative z-10">
              {['pricing_inc1', 'pricing_inc2', 'pricing_inc3', 'pricing_inc4', 'pricing_inc5', 'pricing_inc6'].map((key, idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-start gap-3 group/item"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(key)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <a
              href={`https://wa.me/34636699055?text=${encodeURIComponent(t('whatsapp_text'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('hero_cta')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
