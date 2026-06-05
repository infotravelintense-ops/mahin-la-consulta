export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, subject, message, lang } = data ?? {};
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Nombre, email y mensaje son obligatorios' }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: name ?? '',
        email: email ?? '',
        phone: phone ?? '',
        subject: subject ?? '',
        message: message ?? '',
        lang: lang ?? 'es',
      },
    });

    // Send email notification
    try {
      const appUrl = process.env.NEXTAUTH_URL || '';
      const appName = 'Mahin Kuhenuri';
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6B7B3A; border-bottom: 2px solid #6B7B3A; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>
          <div style="background: #F5F0E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Teléfono:</strong> ${phone}</p>` : ''}
            ${subject ? `<p style="margin: 10px 0;"><strong>Asunto:</strong> ${subject}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Mensaje:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #6B7B3A;">
              ${message}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">Idioma: ${lang || 'es'} | Enviado: ${new Date().toLocaleString('es-ES')}</p>
        </div>
      `;

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_FORMULARIO_DE_CONTACTO,
          subject: `Nuevo contacto web: ${name} - ${subject || 'Sin asunto'}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'mahineta@hotmail.com',
          reply_to: email,
          sender_email: appUrl ? `noreply@${new URL(appUrl).hostname}` : 'noreply@mail.abacusai.app',
          sender_alias: appName,
        }),
      });
    } catch (emailErr: any) {
      console.error('Email notification error:', emailErr);
    }

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 });
  }
}

export async function GET() {
  // Protected route for admin
  const { getServerSession } = await import('next-auth');
  const { authOptions } = await import('@/lib/auth');
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(submissions);
}
