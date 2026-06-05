'use client';

import { useLang } from '../language-context';
import { motion } from 'framer-motion';

const content: Record<string, { title: string; lastUpdate: string; sections: { heading: string; text: string }[] }> = {
  es: {
    title: 'Aviso Legal',
    lastUpdate: 'Última actualización: junio 2026',
    sections: [
      {
        heading: '1. Datos identificativos',
        text: 'En cumplimiento del deber de información establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se facilitan los siguientes datos:\n\n• Titular: Mahin Kuhenuri\n• Actividad: Enfermería y Terapias Naturales\n• Colegiada: Nº 47266 COIB\n• Dirección: C/ Mar 109-111, 5°1a, 08003 Barcelona\n• Email: mahineta@hotmail.com\n• Teléfono: +34 636 699 055',
      },
      {
        heading: '2. Objeto',
        text: 'El presente sitio web tiene como finalidad proporcionar información sobre los servicios de terapias naturales y enfermería ofrecidos por Mahin Kuhenuri, así como facilitar el contacto con los usuarios interesados.',
      },
      {
        heading: '3. Condiciones de uso',
        text: 'El acceso y uso de este sitio web atribuye la condición de usuario y supone la aceptación de todas las condiciones incluidas en este Aviso Legal. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen, absteniéndose de utilizarlos con fines ilícitos o contrarios a la buena fe.',
      },
      {
        heading: '4. Propiedad intelectual',
        text: 'Todos los contenidos de este sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, son propiedad intelectual de Mahin Kuhenuri o de terceros que han autorizado su uso, sin que puedan considerarse cedidos al usuario ninguno de los derechos de explotación.',
      },
      {
        heading: '5. Limitación de responsabilidad',
        text: 'La información proporcionada en este sitio web tiene carácter meramente informativo y no sustituye en ningún caso el asesoramiento médico profesional. Mahin Kuhenuri no se responsabiliza del uso que los usuarios puedan hacer de la información contenida en esta web.',
      },
      {
        heading: '6. Legislación aplicable',
        text: 'Para la resolución de cualquier controversia que pudiera surgir en relación con el uso de este sitio web, serán de aplicación las leyes españolas, siendo competentes los juzgados y tribunales de Barcelona.',
      },
    ],
  },
  ca: {
    title: 'Avís Legal',
    lastUpdate: 'Última actualització: juny 2026',
    sections: [
      {
        heading: '1. Dades identificatives',
        text: "En compliment del deure d'informació establert a la Llei 34/2002, de l'11 de juliol, es faciliten les dades següents:\n\n• Titular: Mahin Kuhenuri\n• Activitat: Infermeria i Teràpies Naturals\n• Col·legiada: Nº 47266 COIB\n• Adreça: C/ Mar 109-111, 5°1a, 08003 Barcelona\n• Email: mahineta@hotmail.com\n• Telèfon: +34 636 699 055",
      },
      {
        heading: '2. Objecte',
        text: "Aquest lloc web té com a finalitat proporcionar informació sobre els serveis de teràpies naturals i infermeria oferts per Mahin Kuhenuri.",
      },
      {
        heading: "3. Condicions d'ús",
        text: "L'accés i l'ús d'aquest lloc web atribueix la condició d'usuari i suposa l'acceptació de totes les condicions incloses en aquest Avís Legal.",
      },
      {
        heading: '4. Propietat intel·lectual',
        text: "Tots els continguts d'aquest lloc web, incloent textos, fotografies, gràfics i el seu disseny gràfic, són propietat intel·lectual de Mahin Kuhenuri.",
      },
      {
        heading: '5. Limitació de responsabilitat',
        text: "La informació proporcionada en aquest lloc web té caràcter merament informatiu i no substitueix en cap cas l'assessorament mèdic professional.",
      },
      {
        heading: '6. Legislació aplicable',
        text: "Per a la resolució de qualsevol controvèrsia seran d'aplicació les lleis espanyoles, sent competents els jutjats i tribunals de Barcelona.",
      },
    ],
  },
  de: {
    title: 'Impressum',
    lastUpdate: 'Letztes Update: Juni 2026',
    sections: [
      {
        heading: '1. Angaben gemäß § 5 TMG',
        text: '• Inhaberin: Mahin Kuhenuri\n• Tätigkeit: Krankenpflege und Naturheilkunde\n• Registrierung: Nr. 47266 COIB\n• Adresse: C/ Mar 109-111, 5°1a, 08003 Barcelona\n• E-Mail: mahineta@hotmail.com\n• Telefon: +34 636 699 055',
      },
      {
        heading: '2. Zweck',
        text: 'Diese Website dient dazu, Informationen über die von Mahin Kuhenuri angebotenen Naturheilkunde- und Pflegeleistungen bereitzustellen.',
      },
      {
        heading: '3. Nutzungsbedingungen',
        text: 'Der Zugang und die Nutzung dieser Website implizieren die Anerkennung aller in diesem Impressum enthaltenen Bedingungen.',
      },
      {
        heading: '4. Geistiges Eigentum',
        text: 'Alle Inhalte dieser Website sind geistiges Eigentum von Mahin Kuhenuri.',
      },
      {
        heading: '5. Haftungsbeschränkung',
        text: 'Die auf dieser Website bereitgestellten Informationen sind rein informativer Natur und ersetzen keinesfalls eine professionelle medizinische Beratung.',
      },
      {
        heading: '6. Anwendbares Recht',
        text: 'Für Streitigkeiten im Zusammenhang mit dieser Website gilt spanisches Recht. Zuständig sind die Gerichte von Barcelona.',
      },
    ],
  },
  en: {
    title: 'Legal Notice',
    lastUpdate: 'Last updated: June 2026',
    sections: [
      {
        heading: '1. Identification Details',
        text: 'In compliance with Spanish Law 34/2002 (LSSICE), the following details are provided:\n\n• Owner: Mahin Kuhenuri\n• Activity: Nursing and Natural Therapies\n• Registration: No. 47266 COIB\n• Address: C/ Mar 109-111, 5°1a, 08003 Barcelona\n• Email: mahineta@hotmail.com\n• Phone: +34 636 699 055',
      },
      {
        heading: '2. Purpose',
        text: 'This website aims to provide information about the natural therapy and nursing services offered by Mahin Kuhenuri.',
      },
      {
        heading: '3. Terms of Use',
        text: 'Access to and use of this website grants user status and implies acceptance of all conditions included in this Legal Notice.',
      },
      {
        heading: '4. Intellectual Property',
        text: 'All content on this website is the intellectual property of Mahin Kuhenuri.',
      },
      {
        heading: '5. Limitation of Liability',
        text: 'The information provided on this website is purely informative and does not replace professional medical advice in any case.',
      },
      {
        heading: '6. Applicable Law',
        text: 'Spanish law shall apply to any disputes arising in connection with this website. The courts of Barcelona shall have jurisdiction.',
      },
    ],
  },
};

export default function LegalPage() {
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
