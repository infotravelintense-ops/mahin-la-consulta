'use client';

import { useLang } from './language-context';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Leaf, Heart, Sun, Stethoscope, Globe, Award, Phone, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

const highlights = [
  { icon: Leaf, key: 'home_highlight_western', href: '/servicios', color: 'from-emerald-500/20 to-green-600/10' },
  { icon: Sun, key: 'home_highlight_oriental', href: '/servicios', color: 'from-amber-500/20 to-orange-500/10' },
  { icon: Heart, key: 'home_highlight_programs', href: '/servicios', color: 'from-rose-500/20 to-pink-500/10' },
  { icon: Stethoscope, key: 'home_highlight_nursing', href: '/servicios', color: 'from-sky-500/20 to-blue-500/10' },
];

const stats = [
  { value: 35, suffix: '+', key: 'home_stat_years' },
  { value: 6, suffix: '', key: 'home_stat_langs' },
  { value: 20, suffix: '+', key: 'home_stat_therapies' },
  { value: 11, suffix: '', key: 'home_stat_clinic' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <>
      {/* ===== HERO — Full-bleed cinematic ===== */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        {/* BG image with parallax zoom */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <Image
            src="/images/hero-wellness.jpg"
            alt="Terapias naturales ambiente zen"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Dark cinematic overlay for text contrast */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#1a2010]/90 via-[#1a2010]/70 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#1a2010]/80 via-transparent to-[#1a2010]/30" />

        {/* Animated light accents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 2 }}
          className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none z-[2]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute bottom-[15%] right-[30%] w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none z-[2]"
        />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity, y: textY }} className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            {/* Badge — sweeps in */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2.5 rounded-full text-sm font-medium border border-white/15">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                La Barceloneta, Barcelona
              </div>
            </motion.div>

            {/* Title — dramatic line-by-line reveal */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] text-white"
              >
                {t('hero_title')}
              </motion.h1>
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left w-24 h-1 bg-gradient-to-r from-emerald-400 to-primary mb-8 rounded-full"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-xl"
            >
              {t('hero_subtitle')}
            </motion.p>

            {/* CTA buttons — slide up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`https://wa.me/34636699055?text=${encodeURIComponent(t('whatsapp_text'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-white text-[#1a2010] px-8 py-4 rounded-xl font-bold text-base shadow-2xl shadow-black/20 hover:shadow-emerald-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('hero_cta')}
              </a>
              <Link
                href="/servicios"
                className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold text-base border border-white/20 hover:bg-white/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                {t('hero_services')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Stats Strip — Animated counters ===== */}
      <section className="relative bg-primary text-primary-foreground py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a5a2a] via-primary to-[#4a5a2a]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                <p className="font-display text-5xl sm:text-6xl font-bold mb-2 text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/75 font-medium">{t(stat.key)}</p>
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-14 bg-white/15" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Service Highlights ===== */}
      <section className="py-28 sm:py-36 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4"
            >
              <span className="w-8 h-px bg-primary" />
              {t('hero_services')}
              <span className="w-8 h-px bg-primary" />
            </motion.span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-5">
              {t('home_services_title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t('home_services_subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {highlights.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  className="card-tilt block bg-card rounded-2xl p-8 shadow-sm text-center h-full relative overflow-hidden group border border-border/30"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-3">{t(`${item.key}_title`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t(`${item.key}_desc`)}</p>
                    <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      {t('home_discover')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About Preview ===== */}
      <section className="py-28 sm:py-36 bg-card relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 blob animate-float-slow pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-3xl" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-2xl">
                <Image
                  src="/images/mahin-portrait.jpg"
                  alt="Mahin Kuhenuri - Enfermera y Naturópata"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-7 rounded-2xl shadow-xl"
              >
                <p className="font-display font-bold text-3xl">35+</p>
                <p className="text-sm opacity-90">{t('about_exp')}</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-7"
            >
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase">
                <span className="w-8 h-px bg-primary" />
                {t('about_title')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">{t('about_page_title')}</h2>
              <p className="text-primary font-medium text-lg">{t('about_role')}</p>
              <p className="text-muted-foreground leading-relaxed text-base">{t('about_text1')}</p>
              <p className="text-muted-foreground leading-relaxed text-base">{t('about_text2')}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                {[{ icon: Award, label: 'about_exp' }, { icon: Globe, label: 'about_langs' }].map((badge, idx) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-2.5 bg-background rounded-xl px-5 py-3 shadow-sm border border-border/50"
                  >
                    <badge.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{t(badge.label)}</span>
                  </motion.div>
                ))}
              </div>
              <Link
                href="/sobre-mi"
                className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all group"
              >
                {t('home_about_cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-28 sm:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {t('home_cta_title')}
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              {t('home_cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/34636699055?text=${encodeURIComponent(t('whatsapp_text'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
              >
                <Phone className="w-5 h-5" />
                {t('hero_cta')}
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
              >
                {t('home_contact_cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
