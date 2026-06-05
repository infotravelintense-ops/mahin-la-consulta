export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const content = await prisma.siteContent.findMany();
    const map: Record<string, any> = {};
    (content ?? []).forEach((c: any) => { map[c?.key] = c; });
    return NextResponse.json(map);
  } catch (error: any) {
    console.error('Error fetching content:', error);
    return NextResponse.json({});
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const data = await request.json();
    const { key, valueEs, valueCa, valueDe, valueEn } = data ?? {};
    if (!key) return NextResponse.json({ error: 'Key requerido' }, { status: 400 });
    const updated = await prisma.siteContent.upsert({
      where: { key },
      update: { valueEs: valueEs ?? '', valueCa: valueCa ?? '', valueDe: valueDe ?? '', valueEn: valueEn ?? '' },
      create: { key, valueEs: valueEs ?? '', valueCa: valueCa ?? '', valueDe: valueDe ?? '', valueEn: valueEn ?? '' },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}
