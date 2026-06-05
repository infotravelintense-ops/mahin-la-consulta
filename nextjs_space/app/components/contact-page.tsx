'use client';

import { useLang } from './language-context';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...(form ?? {}), lang }),
      });
      if (res.ok) {
        setSent(true);
        toast.success(t('contact_success'));
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error(t('contact_error'));
      }
    } catch {
      toast.error(t('contact_error'));
    } finally {
      setLoading(false);
    }
  }

  const contactItems = [
    {
      icon: MapPin,
      label: 'contact_address',
      value: 'contact_address_val',
      isLink: false,
    },
    {
      icon: Clock,
      label: 'contact_schedule',
      value: 'contact_schedule_val',
      isLink: false,
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      rawValue: '+34 636 699 055',
      href: 'tel:+34636699055',
      isLink: true,
    },
    {
      icon: Mail,
      label: 'Email',
      rawValue: 'mahineta@hotmail.com',
      href: 'mailto:mahineta@hotmail.com',
      isLink: true,
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
              {t('contact_title')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{t('contact_subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl p-7 shadow-sm space-y-0 border border-border/30 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                {contactItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-start gap-4 py-5 relative z-10 ${idx < contactItems.length - 1 ? 'border-b border-border/30' : ''}`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{item.isLink ? item.label : t(item.label)}</p>
                      {item.isLink ? (
                        <a href={item.href} className="text-sm text-primary hover:underline font-medium">{item.rawValue}</a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{t(item.value!)}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-sm h-72 border border-border/30"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.1!2d2.1862!3d41.3789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a30a!2sLa+Barceloneta!5e0!3m2!1ses!2ses!4v1000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación consulta"
                />
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-2xl p-10 shadow-sm text-center border border-border/30"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mb-3">{t('contact_success')}</h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-7 sm:p-9 shadow-sm border border-border/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  <div className="relative z-10 space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2">{t('contact_name')} *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...(form ?? {}), name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">{t('contact_email')} *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...(form ?? {}), email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">{t('contact_phone')}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...(form ?? {}), phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">{t('contact_subject')}</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...(form ?? {}), subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">{t('contact_message')} *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...(form ?? {}), message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-magnetic w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? '...' : t('contact_send')}
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      {lang === 'de' ? 'Ihre Daten werden vertraulich behandelt.' : lang === 'en' ? 'Your data will be treated confidentially.' : lang === 'ca' ? 'Les teves dades seran tractades de manera confidencial.' : 'Tus datos serán tratados de manera confidencial.'}
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
