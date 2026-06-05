export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });
    return NextResponse.json(services);
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const data = await request.json();
    const { id, ...rest } = data ?? {};
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    const updated = await prisma.service.update({ where: { id }, data: rest });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}
