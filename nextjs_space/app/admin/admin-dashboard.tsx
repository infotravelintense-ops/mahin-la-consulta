'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LogOut, FileText, Image as ImageIcon, MessageSquare, Layout, ExternalLink, Save, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import NextImage from 'next/image';

interface Service {
  id: string;
  slug: string;
  category: string;
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
  imageUrl: string | null;
  active: boolean;
  sortOrder: number;
}

interface ContactSub {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  lang: string;
  status: string;
  createdAt: string;
}

interface GalleryImg {
  id: string;
  imageUrl: string;
  captionEs: string;
  captionCa: string;
  captionDe: string;
  captionEn: string;
  sortOrder: number;
  active: boolean;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState<Service[]>([]);
  const [contacts, setContacts] = useState<ContactSub[]>([]);
  const [gallery, setGallery] = useState<GalleryImg[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  async function fetchData() {
    try {
      const [sRes, cRes, gRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/contact'),
        fetch('/api/gallery'),
      ]);
      const sData = await sRes.json();
      const cData = await cRes.json();
      const gData = await gRes.json();
      setServices(sData ?? []);
      setContacts(cData ?? []);
      setGallery(gData ?? []);
    } catch {
      console.error('Error fetching data');
    }
  }

  async function saveService() {
    if (!editingService) return;
    setSaving(true);
    try {
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });
      if (res.ok) {
        toast.success('Servicio guardado');
        setEditingService(null);
        fetchData();
      } else {
        toast.error('Error al guardar');
      }
    } catch {
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function addGalleryImage() {
    const url = prompt('URL de la imagen:');
    if (!url) return;
    const captionEs = prompt('Descripción (ES):') || '';
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: url, captionEs, captionCa: captionEs, captionDe: captionEs, captionEn: captionEs }),
      });
      if (res.ok) {
        toast.success('Imagen añadida');
        fetchData();
      }
    } catch {
      toast.error('Error al añadir imagen');
    }
  }

  async function deleteGalleryImage(id: string) {
    if (!confirm('¿Eliminar esta imagen?')) return;
    try {
      await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      toast.success('Imagen eliminada');
      fetchData();
    } catch {
      toast.error('Error al eliminar');
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status !== 'authenticated') return null;

  const tabs = [
    { key: 'services', label: 'Servicios', icon: Layout },
    { key: 'contacts', label: 'Mensajes', icon: MessageSquare },
    { key: 'gallery', label: 'Galería', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary/10">
              <NextImage src="/images/logo.jpg" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="font-display font-bold text-sm">Panel CMS</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-sm text-primary flex items-center gap-1 hover:underline">
              <ExternalLink className="w-3.5 h-3.5" /> Ver web
            </a>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab: any) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-primary/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services tab */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">Gestionar Servicios</h2>
            <p className="text-sm text-muted-foreground">Haz clic en "Editar" para modificar el contenido de cada servicio en los 4 idiomas.</p>

            {editingService && (
              <div className="bg-card rounded-xl p-6 shadow-sm border border-primary/20 space-y-4">
                <h3 className="font-bold">Editando: {editingService.nameEs}</h3>
                {['Es', 'Ca', 'De', 'En'].map((langKey: string) => (
                  <div key={langKey} className="space-y-2">
                    <h4 className="text-xs font-semibold text-primary uppercase">{langKey === 'Es' ? 'Español' : langKey === 'Ca' ? 'Català' : langKey === 'De' ? 'Deutsch' : 'English'}</h4>
                    <input
                      placeholder={`Nombre (${langKey})`}
                      value={(editingService as any)?.[`name${langKey}`] ?? ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingService({ ...(editingService ?? {} as Service), [`name${langKey}`]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                    />
                    <input
                      placeholder={`Descripción corta (${langKey})`}
                      value={(editingService as any)?.[`shortDesc${langKey}`] ?? ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingService({ ...(editingService ?? {} as Service), [`shortDesc${langKey}`]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                    />
                    <textarea
                      placeholder={`Descripción completa (${langKey})`}
                      rows={3}
                      value={(editingService as any)?.[`desc${langKey}`] ?? ''}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingService({ ...(editingService ?? {} as Service), [`desc${langKey}`]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium">URL de imagen</label>
                  <input
                    value={editingService?.imageUrl ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingService({ ...(editingService ?? {} as Service), imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm mt-1"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={saveService}
                    disabled={saving}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Guardando...' : 'Guardar'}
                  </button>
                  <button
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 rounded-lg text-sm bg-secondary hover:bg-secondary/80"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-3">
              {(services ?? []).map((s: Service) => (
                <div key={s.id} className="bg-card rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {s?.imageUrl && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                        <NextImage src={s.imageUrl} alt={s.nameEs} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm">{s?.nameEs}</p>
                      <p className="text-xs text-muted-foreground">{s?.category} | {s?.shortDescEs?.slice(0, 50) ?? ''}...</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingService(s)}
                    className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <Edit className="w-3.5 h-3.5" /> Editar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">Mensajes recibidos</h2>
            {(contacts ?? []).length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay mensajes aún.</p>
            ) : (
              <div className="grid gap-3">
                {(contacts ?? []).map((c: ContactSub) => (
                  <div key={c.id} className="bg-card rounded-xl p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{c?.name}</p>
                        <p className="text-xs text-muted-foreground">{c?.email} {c?.phone ? `| ${c.phone}` : ''}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        c?.status === 'new' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {c?.status === 'new' ? 'Nuevo' : c?.status}
                      </span>
                    </div>
                    {c?.subject && <p className="text-sm font-medium mb-1">{c.subject}</p>}
                    <p className="text-sm text-muted-foreground">{c?.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {c?.createdAt ? new Date(c.createdAt).toLocaleString('es-ES') : ''}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gallery tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Gestionar Galería</h2>
              <button
                onClick={addGalleryImage}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> Añadir imagen
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {(gallery ?? []).map((img: GalleryImg) => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden bg-muted aspect-square">
                  <NextImage src={img?.imageUrl ?? ''} alt={img?.captionEs ?? ''} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => deleteGalleryImage(img.id)}
                      className="opacity-0 group-hover:opacity-100 bg-destructive text-white p-2 rounded-full transition-opacity"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {img?.captionEs && (
                    <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">{img.captionEs}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
