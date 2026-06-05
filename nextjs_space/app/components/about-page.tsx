'use client';

import { useLang } from './language-context';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Globe, Heart, Stethoscope, GraduationCap, MapPin, Languages, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function AboutPage() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const credentials = [
    { icon: GraduationCap, key: 'about_cred1', num: '01' },
    { icon: GraduationCap, key: 'about_cred2', num: '02' },
    { icon: GraduationCap, key: 'about_cred3', num: '03' },
    { icon: Award, key: 'about_cred4', num: '04' },
  ];

  const values = [
    { icon: Heart, key: 'about_val1', accent: 'from-rose-500/15 to-pink-500/5' },
    { icon: Stethoscope, key: 'about_val2', accent: 'from-emerald-500/15 to-green-500/5' },
    { icon: Globe, key: 'about_val3', accent: 'from-sky-500/15 to-blue-500/5' },
    { icon: CheckCircle, key: 'about_val4', accent: 'from-amber-500/15 to-orange-500/5' },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section ref={heroRef} className="relative py-32 sm:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/8 blob blur-2xl animate-float-reverse pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-6"
              >
                <span className="w-8 h-px bg-primary" />
                {t('about_title')}
              </motion.span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]">
                {t('about_page_title')}
              </h1>
              <p className="text-primary font-medium text-xl mb-6">{t('about_role')}</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">{t('about_text1')}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('about_text2')}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-foreground leading-relaxed font-medium flex items-center gap-2"
              >
                <Languages className="w-5 h-5 text-primary" />
                {t('about_text3')}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -top-5 -left-5 w-full h-full bg-primary/10 rounded-3xl rotate-3" />
              <div className="absolute -bottom-5 -right-5 w-full h-full bg-accent/10 rounded-3xl -rotate-2" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-2xl">
                <Image
                  src="/images/mahin-portrait.jpg"
                  alt="Mahin Kuhenuri - Enfermera y Naturópata"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-7 rounded-2xl shadow-xl"
              >
                <p className="font-display font-bold text-3xl">35+</p>
                <p className="text-sm opacity-90">{t('about_exp')}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-primary text-primary-foreground py-14 overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-90" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '35+', key: 'home_stat_years' },
              { value: '6', key: 'home_stat_langs' },
              { value: '20+', key: 'home_stat_therapies' },
              { value: '11', key: 'home_stat_clinic' },
            ].map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="relative"
              >
                <p className="font-display text-4xl sm:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm opacity-85 font-medium">{t(stat.key)}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-primary-foreground/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials — Timeline style */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              <span className="w-8 h-px bg-primary" />
              CV
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t('about_credentials_title')}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden sm:block" />

            {credentials.map((cred, i) => (
              <motion.div
                key={cred.key}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex items-start gap-6 mb-8 last:mb-0 relative"
              >
                <div className="relative z-10 hidden sm:flex w-16 h-16 rounded-2xl bg-card border-2 border-primary/20 items-center justify-center shrink-0 shadow-md">
                  <span className="font-display font-bold text-primary text-sm">{cred.num}</span>
                </div>
                <div className="flex-1 bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-border/30 card-tilt">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 sm:hidden">
                      <cred.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{t(cred.key)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy — Value cards */}
      <section className="py-24 sm:py-32 bg-card relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 blob blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
              {t('about_philosophy_title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t('about_philosophy_text')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.key}
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="card-tilt bg-background rounded-2xl p-7 shadow-sm text-center relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${val.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <val.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{t(`${val.key}_title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`${val.key}_desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">{t('home_cta_title')}</h2>
            <Link
              href="/contacto"
              className="btn-magnetic inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('home_contact_cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
