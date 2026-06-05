'use client';

import { useLang } from '../language-context';
import { motion } from 'framer-motion';

const content: Record<string, { title: string; lastUpdate: string; sections: { heading: string; text: string }[] }> = {
  es: {
    title: 'Política de Cookies',
    lastUpdate: 'Última actualización: junio 2026',
    sections: [
      {
        heading: '1. ¿Qué son las cookies?',
        text: 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten que el sitio recuerde tus acciones y preferencias durante un período de tiempo, para que no tengas que volver a configurarlas cada vez que vuelvas a visitar el sitio.',
      },
      {
        heading: '2. Cookies que utilizamos',
        text: 'Este sitio web utiliza las siguientes cookies:\n\n• Cookies técnicas (necesarias): Permiten la navegación y el uso de las funciones básicas del sitio, como la selección de idioma. No requieren consentimiento.\n\n• Cookies de sesión: Se utilizan para mantener tu sesión activa mientras navegas por el sitio. Se eliminan al cerrar el navegador.\n\n• Cookies de preferencias: Almacenan tu idioma preferido y tus preferencias de cookies.',
      },
      {
        heading: '3. Cookies de terceros',
        text: 'Este sitio web puede integrar contenido de terceros como Google Maps en la página de contacto. Estos servicios pueden establecer sus propias cookies según sus respectivas políticas de privacidad. Te recomendamos consultar las políticas de privacidad de estos terceros.',
      },
      {
        heading: '4. Gestión de cookies',
        text: 'Puedes gestionar tus preferencias de cookies en cualquier momento a través del banner de cookies que aparece en la parte inferior de la pantalla. También puedes configurar tu navegador para rechazar todas las cookies, aunque esto podría afectar a la funcionalidad del sitio.',
      },
      {
        heading: '5. Cómo desactivar cookies en tu navegador',
        text: '• Chrome: Configuración → Privacidad y seguridad → Cookies\n• Firefox: Opciones → Privacidad y Seguridad → Cookies\n• Safari: Preferencias → Privacidad → Cookies\n• Edge: Configuración → Privacidad → Cookies',
      },
      {
        heading: '6. Más información',
        text: 'Para más información sobre el uso de cookies y tus datos personales, consulta nuestra Política de Privacidad o contacta con nosotros en mahineta@hotmail.com.',
      },
    ],
  },
  ca: {
    title: 'Política de Cookies',
    lastUpdate: 'Última actualització: juny 2026',
    sections: [
      {
        heading: '1. Què són les cookies?',
        text: "Les cookies són petits arxius de text que s'emmagatzemen al teu dispositiu quan visites un lloc web. Permeten que el lloc recordi les teves accions i preferències durant un període de temps.",
      },
      {
        heading: '2. Cookies que utilitzem',
        text: "Aquest lloc web utilitza les següents cookies:\n\n• Cookies tècniques (necessàries): Permeten la navegació i l'ús de les funcions bàsiques del lloc, com la selecció d'idioma.\n\n• Cookies de sessió: S'utilitzen per mantenir la teva sessió activa.\n\n• Cookies de preferències: Emmagatzemen el teu idioma preferit i les teves preferències de cookies.",
      },
      {
        heading: '3. Cookies de tercers',
        text: "Aquest lloc web pot integrar contingut de tercers com Google Maps a la pàgina de contacte. Aquests serveis poden establir les seves pròpies cookies.",
      },
      {
        heading: '4. Gestió de cookies',
        text: 'Pots gestionar les teves preferències de cookies en qualsevol moment a través del banner de cookies que apareix a la part inferior de la pantalla.',
      },
      {
        heading: '5. Com desactivar cookies al teu navegador',
        text: '• Chrome: Configuració → Privacitat i seguretat → Cookies\n• Firefox: Opcions → Privacitat i Seguretat → Cookies\n• Safari: Preferències → Privacitat → Cookies\n• Edge: Configuració → Privacitat → Cookies',
      },
      {
        heading: '6. Més informació',
        text: "Per a més informació sobre l'ús de cookies i les teves dades personals, consulta la nostra Política de Privacitat o contacta amb nosaltres a mahineta@hotmail.com.",
      },
    ],
  },
  de: {
    title: 'Cookie-Richtlinie',
    lastUpdate: 'Letztes Update: Juni 2026',
    sections: [
      {
        heading: '1. Was sind Cookies?',
        text: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie ermöglichen es der Website, sich Ihre Aktionen und Einstellungen über einen bestimmten Zeitraum zu merken.',
      },
      {
        heading: '2. Verwendete Cookies',
        text: 'Diese Website verwendet folgende Cookies:\n\n• Technische Cookies (notwendig): Ermöglichen die Navigation und grundlegende Funktionen wie die Sprachauswahl.\n\n• Sitzungscookies: Halten Ihre Sitzung aktiv während Sie surfen.\n\n• Präferenz-Cookies: Speichern Ihre Sprachpräferenz und Cookie-Einstellungen.',
      },
      {
        heading: '3. Cookies von Drittanbietern',
        text: 'Diese Website kann Inhalte von Drittanbietern wie Google Maps integrieren. Diese Dienste können eigene Cookies gemäß ihren Datenschutzrichtlinien setzen.',
      },
      {
        heading: '4. Cookie-Verwaltung',
        text: 'Sie können Ihre Cookie-Einstellungen jederzeit über das Cookie-Banner am unteren Bildschirmrand verwalten.',
      },
      {
        heading: '5. Cookies im Browser deaktivieren',
        text: '• Chrome: Einstellungen → Datenschutz und Sicherheit → Cookies\n• Firefox: Optionen → Datenschutz & Sicherheit → Cookies\n• Safari: Einstellungen → Datenschutz → Cookies\n• Edge: Einstellungen → Datenschutz → Cookies',
      },
      {
        heading: '6. Weitere Informationen',
        text: 'Für weitere Informationen kontaktieren Sie uns unter mahineta@hotmail.com oder lesen Sie unsere Datenschutzerklärung.',
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    lastUpdate: 'Last updated: June 2026',
    sections: [
      {
        heading: '1. What are cookies?',
        text: 'Cookies are small text files stored on your device when you visit a website. They allow the site to remember your actions and preferences over a period of time.',
      },
      {
        heading: '2. Cookies we use',
        text: 'This website uses the following cookies:\n\n• Technical cookies (necessary): Enable navigation and basic site functionality, such as language selection. They do not require consent.\n\n• Session cookies: Used to maintain your active session while browsing. They are deleted when you close your browser.\n\n• Preference cookies: Store your preferred language and cookie preferences.',
      },
      {
        heading: '3. Third-party cookies',
        text: 'This website may integrate third-party content such as Google Maps on the contact page. These services may set their own cookies according to their respective privacy policies.',
      },
      {
        heading: '4. Managing cookies',
        text: 'You can manage your cookie preferences at any time through the cookie banner displayed at the bottom of the screen.',
      },
      {
        heading: '5. How to disable cookies in your browser',
        text: '• Chrome: Settings → Privacy and Security → Cookies\n• Firefox: Options → Privacy & Security → Cookies\n• Safari: Preferences → Privacy → Cookies\n• Edge: Settings → Privacy → Cookies',
      },
      {
        heading: '6. More information',
        text: 'For more information about the use of cookies and your personal data, please see our Privacy Policy or contact us at mahineta@hotmail.com.',
      },
    ],
  },
};

export default function CookiesPage() {
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
              <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
