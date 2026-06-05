'use client';

import { useLang } from '../language-context';
import { motion } from 'framer-motion';

const content: Record<string, { title: string; lastUpdate: string; sections: { heading: string; text: string }[] }> = {
  es: {
    title: 'Política de Privacidad',
    lastUpdate: 'Última actualización: junio 2026',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        text: 'Mahin Kuhenuri, con domicilio profesional en C/ Mar 109-111, 5°1a, 08003 Barcelona (La Barceloneta), es la responsable del tratamiento de los datos personales recogidos a través de este sitio web. Contacto: mahineta@hotmail.com | Teléfono: +34 636 699 055.',
      },
      {
        heading: '2. Datos que recogemos',
        text: 'Recogemos los datos personales que nos proporcionas voluntariamente a través del formulario de contacto: nombre, dirección de correo electrónico, número de teléfono (opcional), asunto y mensaje. No recogemos datos sensibles de salud a través de este sitio web.',
      },
      {
        heading: '3. Finalidad del tratamiento',
        text: 'Los datos recogidos se utilizan exclusivamente para: responder a tus consultas y solicitudes de información, gestionar citas y comunicaciones relacionadas con los servicios ofrecidos, y enviarte información relevante sobre nuestros servicios si así lo has solicitado.',
      },
      {
        heading: '4. Base legal del tratamiento',
        text: 'El tratamiento de tus datos se basa en tu consentimiento expreso al enviar el formulario de contacto (Art. 6.1.a RGPD) y en el interés legítimo de atender tus solicitudes (Art. 6.1.f RGPD).',
      },
      {
        heading: '5. Conservación de datos',
        text: 'Tus datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para determinar posibles responsabilidades derivadas de dicho tratamiento, conforme a la legislación vigente.',
      },
      {
        heading: '6. Derechos del interesado',
        text: 'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de datos enviando un correo electrónico a mahineta@hotmail.com indicando tu nombre completo y el derecho que deseas ejercer. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).',
      },
      {
        heading: '7. Seguridad',
        text: 'Adoptamos las medidas técnicas y organizativas necesarias para garantizar la seguridad de tus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.',
      },
      {
        heading: '8. Comunicación a terceros',
        text: 'No compartimos tus datos personales con terceros, salvo obligación legal. Los datos del formulario de contacto son tratados únicamente por Mahin Kuhenuri para la finalidad indicada.',
      },
    ],
  },
  ca: {
    title: 'Política de Privacitat',
    lastUpdate: 'Última actualització: juny 2026',
    sections: [
      {
        heading: '1. Responsable del tractament',
        text: "Mahin Kuhenuri, amb domicili professional a C/ Mar 109-111, 5°1a, 08003 Barcelona (La Barceloneta), és la responsable del tractament de les dades personals recollides a través d'aquest lloc web. Contacte: mahineta@hotmail.com | Telèfon: +34 636 699 055.",
      },
      {
        heading: '2. Dades que recollim',
        text: "Recollim les dades personals que ens proporciones voluntàriament a través del formulari de contacte: nom, adreça de correu electrònic, número de telèfon (opcional), assumpte i missatge. No recollim dades sensibles de salut a través d'aquest lloc web.",
      },
      {
        heading: '3. Finalitat del tractament',
        text: 'Les dades recollides es fan servir exclusivament per: respondre a les teves consultes i sol·licituds d\'informació, gestionar cites i comunicacions relacionades amb els serveis oferts, i enviar-te informació rellevant sobre els nostres serveis si així ho has sol·licitat.',
      },
      {
        heading: '4. Base legal del tractament',
        text: 'El tractament de les teves dades es basa en el teu consentiment exprés en enviar el formulari de contacte (Art. 6.1.a RGPD) i en l\'interès legítim d\'atendre les teves sol·licituds (Art. 6.1.f RGPD).',
      },
      {
        heading: '5. Conservació de dades',
        text: 'Les teves dades personals es conservaran durant el temps necessari per complir amb la finalitat per a la qual van ser recollides i per determinar possibles responsabilitats derivades d\'aquest tractament.',
      },
      {
        heading: '6. Drets de l\'interessat',
        text: 'Pots exercir els teus drets d\'accés, rectificació, supressió, oposició, limitació del tractament i portabilitat de dades enviant un correu electrònic a mahineta@hotmail.com indicant el teu nom complet i el dret que desitges exercir.',
      },
      {
        heading: '7. Seguretat',
        text: 'Adoptem les mesures tècniques i organitzatives necessàries per garantir la seguretat de les teves dades personals i evitar-ne l\'alteració, pèrdua, tractament o accés no autoritzat.',
      },
      {
        heading: '8. Comunicació a tercers',
        text: 'No compartim les teves dades personals amb tercers, excepte obligació legal. Les dades del formulari de contacte són tractades únicament per Mahin Kuhenuri per a la finalitat indicada.',
      },
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    lastUpdate: 'Letztes Update: Juni 2026',
    sections: [
      {
        heading: '1. Verantwortliche Stelle',
        text: 'Mahin Kuhenuri, mit beruflichem Sitz in C/ Mar 109-111, 5°1a, 08003 Barcelona (La Barceloneta), ist verantwortlich für die Verarbeitung der über diese Website erhobenen personenbezogenen Daten. Kontakt: mahineta@hotmail.com | Telefon: +34 636 699 055.',
      },
      {
        heading: '2. Erhobene Daten',
        text: 'Wir erfassen die personenbezogenen Daten, die Sie uns freiwillig über das Kontaktformular mitteilen: Name, E-Mail-Adresse, Telefonnummer (optional), Betreff und Nachricht. Über diese Website werden keine sensiblen Gesundheitsdaten erhoben.',
      },
      {
        heading: '3. Zweck der Datenverarbeitung',
        text: 'Die erhobenen Daten werden ausschließlich verwendet, um: Ihre Anfragen und Informationsanfragen zu beantworten, Termine und Kommunikation im Zusammenhang mit den angebotenen Leistungen zu verwalten und Ihnen auf Wunsch relevante Informationen über unsere Leistungen zuzusenden.',
      },
      {
        heading: '4. Rechtsgrundlage',
        text: 'Die Verarbeitung Ihrer Daten basiert auf Ihrer ausdrücklichen Einwilligung beim Absenden des Kontaktformulars (Art. 6 Abs. 1 lit. a DSGVO) und auf dem berechtigten Interesse, Ihre Anfragen zu bearbeiten (Art. 6 Abs. 1 lit. f DSGVO).',
      },
      {
        heading: '5. Speicherung der Daten',
        text: 'Ihre personenbezogenen Daten werden so lange aufbewahrt, wie es zur Erfüllung des Zwecks, für den sie erhoben wurden, erforderlich ist und um mögliche Verantwortlichkeiten zu bestimmen.',
      },
      {
        heading: '6. Betroffenenrechte',
        text: 'Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung, Widerspruch, Einschränkung der Verarbeitung und Datenübertragbarkeit ausüben, indem Sie eine E-Mail an mahineta@hotmail.com senden.',
      },
      {
        heading: '7. Sicherheit',
        text: 'Wir ergreifen die notwendigen technischen und organisatorischen Maßnahmen, um die Sicherheit Ihrer personenbezogenen Daten zu gewährleisten.',
      },
      {
        heading: '8. Weitergabe an Dritte',
        text: 'Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, es sei denn, dies ist gesetzlich vorgeschrieben.',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdate: 'Last updated: June 2026',
    sections: [
      {
        heading: '1. Data Controller',
        text: 'Mahin Kuhenuri, with professional address at C/ Mar 109-111, 5°1a, 08003 Barcelona (La Barceloneta), is responsible for the processing of personal data collected through this website. Contact: mahineta@hotmail.com | Phone: +34 636 699 055.',
      },
      {
        heading: '2. Data We Collect',
        text: 'We collect personal data that you voluntarily provide through the contact form: name, email address, phone number (optional), subject and message. We do not collect sensitive health data through this website.',
      },
      {
        heading: '3. Purpose of Processing',
        text: 'The data collected is used exclusively to: respond to your inquiries and information requests, manage appointments and communications related to the services offered, and send you relevant information about our services if you have requested it.',
      },
      {
        heading: '4. Legal Basis',
        text: 'The processing of your data is based on your explicit consent when submitting the contact form (Art. 6.1.a GDPR) and on the legitimate interest of responding to your requests (Art. 6.1.f GDPR).',
      },
      {
        heading: '5. Data Retention',
        text: 'Your personal data will be retained for as long as necessary to fulfil the purpose for which it was collected and to determine any liabilities arising from such processing.',
      },
      {
        heading: '6. Your Rights',
        text: 'You may exercise your rights of access, rectification, erasure, objection, restriction of processing and data portability by sending an email to mahineta@hotmail.com.',
      },
      {
        heading: '7. Security',
        text: 'We adopt the necessary technical and organizational measures to ensure the security of your personal data.',
      },
      {
        heading: '8. Third-Party Disclosure',
        text: 'We do not share your personal data with third parties, except where legally required.',
      },
    ],
  },
};

export default function PrivacyPage() {
  const { lang } = useLang();
  const c = content[lang] || content.es;

  return (
    <>
      <section className="py-32 sm:py-40 bg-primary/5">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">{c.title}</h1>
            <p className="text-sm text-muted-foreground">{c.lastUpdate}</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-8">
          {c.sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="font-display text-lg font-bold mb-2">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
