'use client';

import { useLang } from './language-context';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';
import { Lang } from '@/lib/i18n';

interface GalleryImg {
  id: string;
  imageUrl: string;
  captionEs: string;
  captionCa: string;
  captionDe: string;
  captionEn: string;
}

function getCaption(img: GalleryImg, lang: Lang): string {
  if (lang === 'ca') return img?.captionCa || img?.captionEs || '';
  if (lang === 'de') return img?.captionDe || img?.captionEs || '';
  if (lang === 'en') return img?.captionEn || img?.captionEs || '';
  return img?.captionEs || '';
}

export default function GalleryPage() {
  const { t, lang } = useLang();
  const [images, setImages] = useState<GalleryImg[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r: Response) => r.json())
      .then((data: GalleryImg[]) => setImages(data ?? []))
      .catch(() => setImages([]));
  }, []);

  const selectedImg = selectedIdx !== null ? (images ?? [])[selectedIdx] : null;

  const goNext = () => {
    if (selectedIdx !== null && images.length > 0) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };
  const goPrev = () => {
    if (selectedIdx !== null && images.length > 0) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  // Varied aspect ratios for masonry feel
  const aspectClasses = [
    'aspect-square',
    'aspect-[4/5]',
    'aspect-square',
    'aspect-[5/4]',
    'aspect-[4/5]',
    'aspect-square',
    'aspect-[5/4]',
    'aspect-square',
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 sm:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/8 blob blur-2xl animate-float-reverse pointer-events-none" />

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
              {t('gallery_title')}
            </h1>
            <p className="text-muted-foreground text-lg">{t('gallery_subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid — Creative masonry-like */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {(images ?? []).length === 0 ? (
            <p className="text-muted-foreground text-center py-16">{t('loading')}</p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {(images ?? []).map((img: GalleryImg, i: number) => (
                <motion.div
                  key={img?.id ?? i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.06 * (i % 8) }}
                  className="relative rounded-2xl overflow-hidden bg-muted cursor-pointer group break-inside-avoid"
                  onClick={() => setSelectedIdx(i)}
                >
                  <div className={aspectClasses[i % aspectClasses.length] + ' relative'}>
                    <Image
                      src={img?.imageUrl ?? ''}
                      alt={getCaption(img, lang) || 'Galería'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    {getCaption(img, lang) && (
                      <p className="text-white text-sm p-4 font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {getCaption(img, lang)}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox — With navigation */}
      <AnimatePresence>
        {selectedImg && selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <button
              className="absolute top-4 right-4 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={() => setSelectedIdx(null)}
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Image
                src={selectedImg?.imageUrl ?? ''}
                alt={getCaption(selectedImg, lang) || 'Galería'}
                fill
                className="object-contain"
              />
              {getCaption(selectedImg, lang) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-center font-medium">{getCaption(selectedImg, lang)}</p>
                </div>
              )}
            </motion.div>

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
                {selectedIdx + 1} / {images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
