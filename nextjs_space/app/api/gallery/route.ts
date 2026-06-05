export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(images);
  } catch (error: any) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const data = await request.json();
    const image = await prisma.galleryImage.create({ data: {
      imageUrl: data?.imageUrl ?? '',
      cloud_storage_path: data?.cloud_storage_path ?? null,
      isPublic: data?.isPublic ?? true,
      captionEs: data?.captionEs ?? '',
      captionCa: data?.captionCa ?? '',
      captionDe: data?.captionDe ?? '',
      captionEn: data?.captionEn ?? '',
      sortOrder: data?.sortOrder ?? 0,
    }});
    return NextResponse.json(image);
  } catch (error: any) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json({ error: 'Error al crear' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    await prisma.galleryImage.update({ where: { id }, data: { active: false } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
  }
}
