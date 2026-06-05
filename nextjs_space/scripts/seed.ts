import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed admin users
  const hashedPassword = await bcrypt.hash('johndoe123', 12);
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: { email: 'john@doe.com', password: hashedPassword, name: 'Admin', role: 'admin' },
  });

  // Client admin account
  const clientPassword = await bcrypt.hash('Mahin2024!', 12);
  await prisma.user.upsert({
    where: { email: 'mahineta@hotmail.com' },
    update: { password: clientPassword, name: 'Mahin Kuhenuri', role: 'admin' },
    create: { email: 'mahineta@hotmail.com', password: clientPassword, name: 'Mahin Kuhenuri', role: 'admin' },
  });

  // Seed services
  const services = [
    // Western therapies
    { slug: 'alimentacion-sana', category: 'western', sortOrder: 1, imageUrl: '/images/dietetica.jpg',
      nameEs: 'Alimentación sana(dora)', nameCa: 'Alimentació sana(dora)', nameDe: 'Gesunde Ernährung', nameEn: 'Healthy Nutrition',
      shortDescEs: 'Asesoramiento nutricional personalizado para mejorar tu salud desde la base.', shortDescCa: 'Assessorament nutricional personalitzat per millorar la teva salut des de la base.', shortDescDe: 'Personalisierte Ernährungsberatung für bessere Gesundheit.', shortDescEn: 'Personalized nutritional advice to improve your health from the ground up.',
      descEs: 'La alimentación es la base de la salud. Mediante un análisis nutricional detallado, te proporciono un plan alimentario adaptado a tus necesidades específicas, condiciones de salud y estilo de vida. Trabajamos juntos para que tu dieta se convierta en tu mejor medicina.', descCa: "L'alimentació és la base de la salut. Mitjançant una anàlisi nutricional detallada, et proporciono un pla alimentari adaptat a les teves necessitats específiques.", descDe: 'Ernährung ist die Grundlage der Gesundheit. Durch eine detaillierte Ernährungsanalyse erstelle ich einen auf Ihre spezifischen Bedürfnisse zugeschnittenen Ernährungsplan.', descEn: 'Nutrition is the foundation of health. Through a detailed nutritional analysis, I provide you with a dietary plan tailored to your specific needs, health conditions and lifestyle.' },
    { slug: 'fitoterapia', category: 'western', sortOrder: 2, imageUrl: '/images/fitoterapia.jpg',
      nameEs: 'Fitoterapia', nameCa: 'Fitoteràpia', nameDe: 'Phytotherapie', nameEn: 'Phytotherapy',
      shortDescEs: 'Tratamiento con plantas medicinales para restaurar el equilibrio natural del organismo.', shortDescCa: 'Tractament amb plantes medicinals per restaurar l\'equilibri natural de l\'organisme.', shortDescDe: 'Behandlung mit Heilpflanzen zur Wiederherstellung des natürlichen Gleichgewichts.', shortDescEn: 'Treatment with medicinal plants to restore the natural balance of the body.',
      descEs: 'La fitoterapia utiliza las propiedades curativas de las plantas medicinales para tratar diversas dolencias. Selecciono cuidadosamente las plantas adecuadas según tu condición, considerando posibles interacciones con medicamentos convencionales.', descCa: 'La fitoteràpia utilitza les propietats curatives de les plantes medicinals per tractar diverses dolències.', descDe: 'Die Phytotherapie nutzt die Heilkräfte von Heilpflanzen zur Behandlung verschiedener Beschwerden.', descEn: 'Phytotherapy uses the healing properties of medicinal plants to treat various ailments.' },
    { slug: 'flores-bach', category: 'western', sortOrder: 3, imageUrl: '/images/flores-bach.jpg',
      nameEs: 'Flores de Bach', nameCa: 'Flors de Bach', nameDe: 'Bachblüten', nameEn: 'Bach Flowers',
      shortDescEs: 'Esencias florales para el equilibrio emocional y el bienestar interior.', shortDescCa: 'Essències florals per a l\'equilibri emocional i el benestar interior.', shortDescDe: 'Blütenessenzen für emotionales Gleichgewicht und inneres Wohlbefinden.', shortDescEn: 'Flower essences for emotional balance and inner wellbeing.',
      descEs: 'Las Flores de Bach son 38 esencias florales que actúan sobre los estados emocionales negativos, transformándolos en su polo positivo. Un método suave, seguro y sin efectos secundarios, ideal para todas las edades.', descCa: 'Les Flors de Bach són 38 essències florals que actuen sobre els estats emocionals negatius.', descDe: 'Die 38 Bachblütenmittel wirken auf negative emotionale Zustände und wandeln sie in positive um.', descEn: 'Bach Flowers are 38 flower essences that act on negative emotional states, transforming them into their positive counterpart.' },
    { slug: 'homeopatia', category: 'western', sortOrder: 4, imageUrl: '/images/homeopatia.jpg',
      nameEs: 'Homeopatía', nameCa: 'Homeopatia', nameDe: 'Homöopathie', nameEn: 'Homeopathy',
      shortDescEs: 'Tratamiento individualizado basado en el principio de similitud para estimular la capacidad curativa.', shortDescCa: 'Tractament individualitzat basat en el principi de similitud.', shortDescDe: 'Individuelle Behandlung basierend auf dem Ähnlichkeitsprinzip.', shortDescEn: 'Individualized treatment based on the principle of similarity to stimulate healing.',
      descEs: 'La homeopatía trata al paciente en su totalidad, no solo la enfermedad. Mediante una anamnesis detallada, selecciono el remedio homeopatíco más adecuado para estimular tu propia capacidad de curación.', descCa: 'L\'homeopatia tracta el pacient en la seva totalitat, no només la malaltia.', descDe: 'Die Homöopathie behandelt den Patienten in seiner Gesamtheit, nicht nur die Krankheit.', descEn: 'Homeopathy treats the patient as a whole, not just the disease.' },
    { slug: 'sales-schussler', category: 'western', sortOrder: 5, imageUrl: '/images/sales-schussler.jpg',
      nameEs: 'Sales de Schüssler', nameCa: 'Sals de Schüssler', nameDe: 'Schüßler-Salze', nameEn: 'Schüssler Salts',
      shortDescEs: 'Sales minerales bioquimicas para equilibrar las carencias del organismo.', shortDescCa: 'Sals minerals bioquímiques per equilibrar les carències de l\'organisme.', shortDescDe: 'Biochemische Mineralsalze zum Ausgleich von Mangelzuständen.', shortDescEn: 'Biochemical mineral salts to balance deficiencies in the body.',
      descEs: 'Las 12 Sales de Schüssler son minerales esenciales que regulan las funciones celulares. Corrigen los desequilibrios minerales del organismo de forma suave y natural.', descCa: 'Les 12 Sals de Schüssler són minerals essencials que regulen les funcions cel·lulars.', descDe: 'Die 12 Schüßler-Salze sind essentielle Mineralstoffe, die Zellfunktionen regulieren.', descEn: 'The 12 Schüssler Salts are essential minerals that regulate cellular functions.' },
    { slug: 'terapia-ortomolecular', category: 'western', sortOrder: 6, imageUrl: '/images/ortomolecular.jpg',
      nameEs: 'Terapia Ortomolecular', nameCa: 'Teràpia Ortomolecular', nameDe: 'Orthomolekulare Therapie', nameEn: 'Orthomolecular Therapy',
      shortDescEs: 'Suplementación nutricional científica para optimizar la salud celular.', shortDescCa: 'Suplementació nutricional científica per optimitzar la salut cel·lular.', shortDescDe: 'Wissenschaftliche Nährstoffergänzung für optimale Zellgesundheit.', shortDescEn: 'Scientific nutritional supplementation to optimize cellular health.',
      descEs: 'La terapia ortomolecular proporciona las moléculas correctas (vitaminas, minerales, aminoácidos) en las cantidades adecuadas para restaurar la salud óptima a nivel celular.', descCa: 'La teràpia ortomolecular proporciona les molècules correctes en les quantitats adequades.', descDe: 'Die orthomolekulare Therapie liefert die richtigen Moleküle in den richtigen Mengen.', descEn: 'Orthomolecular therapy provides the right molecules in the right amounts to restore optimal health at the cellular level.' },
    { slug: 'reflexologia', category: 'western', sortOrder: 7, imageUrl: '/images/reflexologia.jpg',
      nameEs: 'Reflexología', nameCa: 'Reflexologia', nameDe: 'Reflexologie', nameEn: 'Reflexology',
      shortDescEs: 'Estimulación de puntos reflejos en los pies para armonizar los órganos y sistemas del cuerpo.', shortDescCa: 'Estimulació de punts reflexos als peus per harmonitzar els òrgans.', shortDescDe: 'Stimulation von Reflexzonen an den Füßen zur Harmonisierung der Körpersysteme.', shortDescEn: 'Stimulation of reflex points on the feet to harmonize body organs and systems.',
      descEs: 'La reflexología podal trabaja sobre las zonas reflejas de los pies que corresponden a órganos y sistemas del cuerpo, estimulando la capacidad de autocuración del organismo.', descCa: 'La reflexologia podal treballa sobre les zones reflexes dels peus.', descDe: 'Die Fußreflexzonenmassage arbeitet an den Reflexzonen der Füße.', descEn: 'Foot reflexology works on the reflex zones of the feet that correspond to body organs and systems.' },
    { slug: 'masaje-silla', category: 'western', sortOrder: 8, imageUrl: '/images/masaje-silla.jpg',
      nameEs: 'Masaje en silla "On Site"', nameCa: 'Massatge en cadira "On Site"', nameDe: 'Stuhlmassage "On Site"', nameEn: 'Chair Massage "On Site"',
      shortDescEs: 'Masaje rápido y efectivo en silla ergonómica, ideal para empresas y eventos.', shortDescCa: 'Massatge ràpid i efectiu en cadira ergonòmica.', shortDescDe: 'Schnelle und effektive Massage auf einem ergonomischen Stuhl.', shortDescEn: 'Quick and effective massage on an ergonomic chair, ideal for offices and events.',
      descEs: 'Masaje de 15-20 minutos en silla ergonómica que trabaja cuello, hombros, espalda, brazos y cabeza. Sin aceite, con ropa. Perfecto para aliviar tensiones en el lugar de trabajo.', descCa: 'Massatge de 15-20 minuts en cadira ergonòmica.', descDe: '15-20 minütige Massage auf einem ergonomischen Stuhl.', descEn: '15-20 minute massage on an ergonomic chair working neck, shoulders, back, arms and head.' },
    { slug: 'masaje-facial', category: 'western', sortOrder: 9, imageUrl: '/images/masaje-facial.jpg',
      nameEs: 'Masaje Facial Integral', nameCa: 'Massatge Facial Integral', nameDe: 'Ganzheitliche Gesichtsmassage', nameEn: 'Integral Facial Massage',
      shortDescEs: 'Masaje facial combinando técnicas Kobido, Shiatsu y drenaje linfático.', shortDescCa: 'Massatge facial combinant tècniques Kobido, Shiatsu i drenatge limfàtic.', shortDescDe: 'Gesichtsmassage mit Kobido-, Shiatsu- und Lymphdrainage-Techniken.', shortDescEn: 'Facial massage combining Kobido, Shiatsu and lymphatic drainage techniques.',
      descEs: 'Un tratamiento facial completo que combina las técnicas del Kobido japonés, Shiatsu facial, drenaje linfático y reflexología facial para rejuvenecer y revitalizar la piel.', descCa: 'Un tractament facial complet que combina les tècniques del Kobido japonès.', descDe: 'Eine umfassende Gesichtsbehandlung, die japanische Kobido-Techniken kombiniert.', descEn: 'A complete facial treatment combining Japanese Kobido, facial Shiatsu, lymphatic drainage and facial reflexology.' },
    { slug: 'liebscher-bracht', category: 'western', sortOrder: 10, imageUrl: '/images/liebscher.jpg',
      nameEs: 'Terapia del dolor Liebscher & Bracht', nameCa: 'Teràpia del dolor Liebscher & Bracht', nameDe: 'Schmerztherapie Liebscher & Bracht', nameEn: 'Liebscher & Bracht Pain Therapy',
      shortDescEs: 'Técnica innovadora para tratar el dolor crónico mediante la presión en puntos específicos.', shortDescCa: 'Tècnica innovadora per tractar el dolor crònic.', shortDescDe: 'Innovative Technik zur Behandlung chronischer Schmerzen.', shortDescEn: 'Innovative technique to treat chronic pain through specific pressure points.',
      descEs: 'Método alemán de terapia del dolor que trabaja con puntos de presión específicos y ejercicios de estiramiento para eliminar el dolor de forma natural, sin medicamentos.', descCa: 'Mètode alemany de teràpia del dolor.', descDe: 'Deutsche Schmerztherapie-Methode, die mit spezifischen Druckpunkten und Dehnübungen arbeitet.', descEn: 'German pain therapy method that works with specific pressure points and stretching exercises.' },
    // Oriental therapies
    { slug: 'acupuntura', category: 'oriental', sortOrder: 1, imageUrl: '/images/acupuntura.jpg',
      nameEs: 'Acupuntura Zonal', nameCa: 'Acupuntura Zonal', nameDe: 'Zonale Akupunktur', nameEn: 'Zonal Acupuncture',
      shortDescEs: 'Estimulación de puntos energéticos para restaurar el flujo vital y aliviar el dolor.', shortDescCa: 'Estimulació de punts energètics per restaurar el flux vital.', shortDescDe: 'Stimulation von Energiepunkten zur Wiederherstellung des Vitalflusses.', shortDescEn: 'Stimulation of energy points to restore vital flow and relieve pain.',
      descEs: 'La acupuntura zonal trabaja sobre meridianos específicos del cuerpo mediante la inserción de finas agujas estériles para restaurar el equilibrio energético y aliviar el dolor. Eficaz para problemas musculoesqueléticos, digestivos, emocionales y más.', descCa: 'L\'acupuntura zonal treballa sobre meridians específics del cos.', descDe: 'Die zonale Akupunktur arbeitet an spezifischen Körpermeridianen.', descEn: 'Zonal acupuncture works on specific body meridians through the insertion of fine sterile needles.' },
    { slug: 'auriculoterapia', category: 'oriental', sortOrder: 2, imageUrl: '/images/auriculoterapia.jpg',
      nameEs: 'Auriculoterapia', nameCa: 'Auriculoteràpia', nameDe: 'Ohrakupunktur', nameEn: 'Auriculotherapy',
      shortDescEs: 'Microsistema auricular para diagnóstico y tratamiento de múltiples dolencias.', shortDescCa: 'Microsistema auricular per a diagnòstic i tractament.', shortDescDe: 'Ohrmikrosystem für Diagnose und Behandlung.', shortDescEn: 'Auricular microsystem for diagnosis and treatment of multiple ailments.',
      descEs: 'La auriculoterapia utiliza puntos reflejos en la oreja para diagnosticar y tratar diversas patologías. Es especialmente útil para el dolor, ansiedad, adicciones y trastornos del sueño.', descCa: 'L\'auriculoteràpia utilitza punts reflexos a l\'orella.', descDe: 'Die Ohrakupunktur nutzt Reflexpunkte am Ohr.', descEn: 'Auriculotherapy uses reflex points on the ear to diagnose and treat various conditions.' },
    { slug: 'moxibustion', category: 'oriental', sortOrder: 3, imageUrl: '/images/moxibustion.jpg',
      nameEs: 'Moxibustión', nameCa: 'Moxibustió', nameDe: 'Moxibustion', nameEn: 'Moxibustion',
      shortDescEs: 'Aplicación de calor terapéutico con artemisa para estimular la circulación y la energía vital.', shortDescCa: 'Aplicació de calor terapèutic amb artemisa.', shortDescDe: 'Therapeutische Wärmeanwendung mit Beifuss.', shortDescEn: 'Therapeutic heat application with mugwort to stimulate circulation and vital energy.',
      descEs: 'La moxibustión aplica calor terapéutico mediante la combustión de artemisa (moxa) cerca de los puntos de acupuntura. Fortalece el sistema inmunológico, mejora la circulación y alivia el dolor crónico.', descCa: 'La moxibustió aplica calor terapèutic mitjançant la combustió d\'artemisa.', descDe: 'Die Moxibustion wendet therapeutische Wärme durch Verbrennung von Beifuss an.', descEn: 'Moxibustion applies therapeutic heat through the burning of mugwort near acupuncture points.' },
    { slug: 'ventosas', category: 'oriental', sortOrder: 4, imageUrl: '/images/ventosas.jpg',
      nameEs: 'Ventosas', nameCa: 'Ventoses', nameDe: 'Schröpfen', nameEn: 'Cupping Therapy',
      shortDescEs: 'Succión terapéutica para aliviar contracturas, mejorar la circulación y eliminar toxinas.', shortDescCa: 'Succió terapèutica per alleujar contractures.', shortDescDe: 'Therapeutisches Schöpfen zur Linderung von Verspannungen.', shortDescEn: 'Therapeutic suction to relieve muscle tension, improve circulation and eliminate toxins.',
      descEs: 'Las ventosas crean succión en la piel para aumentar la circulación local, aliviar contracturas musculares y facilitar la eliminación de toxinas. Técnica milenaria china muy efectiva para el dolor y la tensión muscular.', descCa: 'Les ventoses creen succió a la pell per augmentar la circulació local.', descDe: 'Das Schröpfen erzeugt Unterdruck auf der Haut, um die lokale Durchblutung zu verbessern.', descEn: 'Cupping creates suction on the skin to increase local circulation, relieve muscle tension and facilitate toxin elimination.' },
    { slug: 'lifting-facial', category: 'oriental', sortOrder: 5, imageUrl: '/images/lifting-facial.jpg',
      nameEs: 'Lifting Facial Acupuntural', nameCa: 'Lifting Facial Acupuntural', nameDe: 'Akupunktur-Facelifting', nameEn: 'Acupuncture Facial Lifting',
      shortDescEs: 'Rejuvenecimiento facial natural mediante acupuntura cosmética.', shortDescCa: 'Rejoveniment facial natural mitjançant acupuntura cosmètica.', shortDescDe: 'Natürliche Gesichtsverjüngung durch kosmetische Akupunktur.', shortDescEn: 'Natural facial rejuvenation through cosmetic acupuncture.',
      descEs: 'El lifting facial con acupuntura estimula la producción de colágeno y elastina de forma natural, reduciendo líneas de expresión y mejorando el tono de la piel sin cirugía ni químicos.', descCa: 'El lifting facial amb acupuntura estimula la producció de col·lagen.', descDe: 'Das Akupunktur-Facelifting stimuliert die Kollagen- und Elastinproduktion.', descEn: 'Acupuncture facial lifting naturally stimulates collagen and elastin production.' },
    { slug: 'masaje-pindas', category: 'oriental', sortOrder: 6, imageUrl: '/images/pindas.jpg',
      nameEs: 'Masaje con Pindas', nameCa: 'Massatge amb Pindas', nameDe: 'Kräuterstempelmassage', nameEn: 'Herbal Compress Massage',
      shortDescEs: 'Masaje con compresas de hierbas medicinales calientes para una relajación profunda.', shortDescCa: 'Massatge amb compreses d\'herbes medicinals calentes.', shortDescDe: 'Massage mit heißen Heilkräuter-Stempeln.', shortDescEn: 'Massage with hot medicinal herb compresses for deep relaxation.',
      descEs: 'Las pindas son bolsitas de tela rellenas de hierbas medicinales que se calientan y se aplican mediante masaje. Las propiedades de las hierbas penetran a través de la piel produciendo una relajación profunda.', descCa: 'Les pindas són bossetes de tela plenes d\'herbes medicinals.', descDe: 'Pindas sind mit Heilkräutern gefüllte Stoffbeutel.', descEn: 'Pindas are fabric bags filled with medicinal herbs that are heated and applied through massage.' },
    { slug: 'masaje-tui-na', category: 'oriental', sortOrder: 7, imageUrl: '/images/tui-na.jpg',
      nameEs: 'Masaje TUI-NA', nameCa: 'Massatge TUI-NA', nameDe: 'TUI-NA Massage', nameEn: 'TUI-NA Massage',
      shortDescEs: 'Masaje terapéutico chino que trabaja los meridianos de energía para restaurar el equilibrio.', shortDescCa: 'Massatge terapèutic xinès que treballa els meridians d\'energia.', shortDescDe: 'Chinesische therapeutische Massage, die an Energiemeridianen arbeitet.', shortDescEn: 'Chinese therapeutic massage that works on energy meridians to restore balance.',
      descEs: 'El Tui-Na es una forma de masaje terapéutico chino que utiliza técnicas de presión, fricción y manipulación sobre los meridianos y puntos de acupuntura para tratar problemas musculoesqueléticos y energéticos.', descCa: 'El Tui-Na és una forma de massatge terapèutic xinès.', descDe: 'Tui-Na ist eine Form der chinesischen therapeutischen Massage.', descEn: 'Tui-Na is a form of Chinese therapeutic massage that uses pressure, friction and manipulation techniques.' },
    { slug: 'masaje-tailandes', category: 'oriental', sortOrder: 8, imageUrl: '/images/masaje-tailandes.jpg',
      nameEs: 'Masaje Tradicional Tailandés', nameCa: 'Massatge Tradicional Tailandès', nameDe: 'Traditionelle Thai-Massage', nameEn: 'Traditional Thai Massage',
      shortDescEs: 'Masaje ancestral tailandés con estiramientos y presiones, se realiza con ropa.', shortDescCa: 'Massatge ancestral tailandès amb estiraments i pressions.', shortDescDe: 'Traditionelle Thai-Massage mit Dehnungen und Drucktechniken, in Kleidung.', shortDescEn: 'Ancient Thai massage with stretching and pressure techniques, performed with clothes on.',
      descEs: 'El masaje tailandés combina presiones, estiramientos y movimientos de yoga pasivo para liberar bloqueos energéticos, mejorar la flexibilidad y aliviar tensiones profundas. Se realiza en el suelo con ropa cómoda.', descCa: 'El massatge tailandès combina pressions, estiraments i moviments de ioga passiu.', descDe: 'Die Thai-Massage kombiniert Druck, Dehnungen und passive Yoga-Bewegungen.', descEn: 'Thai massage combines pressure, stretching and passive yoga movements to release energy blocks.' },
    // Special programs
    { slug: 'dejar-fumar', category: 'programs', sortOrder: 1, imageUrl: '/images/hero-wellness.jpg',
      nameEs: 'Programa dejar de fumar', nameCa: 'Programa deixar de fumar', nameDe: 'Raucherentwöhnung', nameEn: 'Quit Smoking Program',
      shortDescEs: 'Programa integral de cesación tabáquica combinando auriculoterapia, fitoterapia y apoyo emocional.', shortDescCa: 'Programa integral de cessació tabàquica.', shortDescDe: 'Umfassendes Raucherentwöhnungsprogramm.', shortDescEn: 'Comprehensive smoking cessation program combining auriculotherapy, phytotherapy and emotional support.',
      descEs: 'Programa personalizado para dejar de fumar que combina auriculoterapia, fitoterapia, Flores de Bach y asesoramiento nutricional. El tratamiento reduce la ansiedad, los síntomas de abstinencia y ayuda a mantener el peso.', descCa: 'Programa personalitzat per deixar de fumar.', descDe: 'Personalisiertes Raucherentwöhnungsprogramm.', descEn: 'Personalized quit-smoking program combining auriculotherapy, phytotherapy, Bach Flowers and nutritional advice.' },
    { slug: 'perder-peso', category: 'programs', sortOrder: 2, imageUrl: '/images/menu-sano.jpg',
      nameEs: 'Programa pérdida de peso', nameCa: 'Programa pèrdua de pes', nameDe: 'Gewichtsabnahme-Programm', nameEn: 'Weight Loss Program',
      shortDescEs: 'Plan integral de pérdida de peso con dietoterapia, auriculoterapia y acompañamiento personalizado.', shortDescCa: 'Pla integral de pèrdua de pes.', shortDescDe: 'Umfassendes Gewichtsabnahme-Programm.', shortDescEn: 'Comprehensive weight loss plan with diet therapy, auriculotherapy and personalized guidance.',
      descEs: 'Programa personalizado de pérdida de peso que incluye plan nutricional, auriculoterapia para reducir la ansiedad por comer, y suplementación natural. Sin dietas agresivas, con resultados duraderos.', descCa: 'Programa personalitzat de pèrdua de pes.', descDe: 'Personalisiertes Gewichtsabnahme-Programm.', descEn: 'Personalized weight loss program including nutritional plan, auriculotherapy and natural supplementation.' },
    { slug: 'patologias-cronicas', category: 'programs', sortOrder: 3, imageUrl: '/images/consulta.jpg',
      nameEs: 'Patologías crónicas', nameCa: 'Patologies cròniques', nameDe: 'Chronische Erkrankungen', nameEn: 'Chronic Conditions',
      shortDescEs: 'Programas específicos para artrosis, reuma, diabetes tipo 2, hipotiroidismo e hipertensión.', shortDescCa: 'Programes específics per artrosi, reuma, diabetis tipus 2.', shortDescDe: 'Spezifische Programme für Arthrose, Rheuma, Diabetes Typ 2.', shortDescEn: 'Specific programs for arthrosis, rheumatism, type 2 diabetes, hypothyroidism and hypertension.',
      descEs: 'Tratamientos integradores para patologías crónicas como artrosis, artritis, reuma, diabetes tipo 2, hipotiroidismo/Hashimoto e hipertensión. Combinando terapias naturales con el seguimiento médico convencional.', descCa: 'Tractaments integradors per a patologies cròniques.', descDe: 'Integrative Behandlungen für chronische Erkrankungen.', descEn: 'Integrative treatments for chronic conditions such as arthrosis, arthritis, type 2 diabetes, hypothyroidism and hypertension.' },
    // Nursing
    { slug: 'enfermeria-domicilio', category: 'nursing', sortOrder: 1, imageUrl: '/images/enfermeria.jpg',
      nameEs: 'Enfermería a Domicilio', nameCa: 'Infermeria a Domicili', nameDe: 'Häusliche Pflege', nameEn: 'Home Nursing Care',
      shortDescEs: 'Servicios profesionales de enfermería en la comodidad de tu hogar.', shortDescCa: 'Serveis professionals d\'infermeria a la comoditat de casa teva.', shortDescDe: 'Professionelle Pflegedienste in Ihrem Zuhause.', shortDescEn: 'Professional nursing services in the comfort of your home.',
      descEs: 'Ofrezco servicios completos de enfermería a domicilio: curas, inyecciones, control de constantes, seguimiento de medicación, cuidados postoperatorios y acompañamiento terapéutico. Con más de 35 años de experiencia hospitalaria y clínica.', descCa: 'Ofereixo serveis complets d\'infermeria a domicili: cures, injeccions, control de constants.', descDe: 'Ich biete umfassende häusliche Pflegedienste an: Wundversorgung, Injektionen, Vitalzeichenkontrolle.', descEn: 'I offer comprehensive home nursing services: wound care, injections, vital signs monitoring, medication follow-up, post-operative care and therapeutic support.' },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        ...service,
      },
      create: service,
    });
  }

  // Seed gallery images
  const galleryImages = [
    { imageUrl: '/images/consulta.jpg', captionEs: 'La consulta', captionCa: 'La consulta', captionDe: 'Die Praxis', captionEn: 'The practice', sortOrder: 1 },
    { imageUrl: '/images/acupuntura.jpg', captionEs: 'Acupuntura', captionCa: 'Acupuntura', captionDe: 'Akupunktur', captionEn: 'Acupuncture', sortOrder: 2 },
    { imageUrl: '/images/moxibustion.jpg', captionEs: 'Moxibustión', captionCa: 'Moxibustió', captionDe: 'Moxibustion', captionEn: 'Moxibustion', sortOrder: 3 },
    { imageUrl: '/images/reflexologia.jpg', captionEs: 'Reflexología', captionCa: 'Reflexologia', captionDe: 'Reflexologie', captionEn: 'Reflexology', sortOrder: 4 },
    { imageUrl: '/images/pindas.jpg', captionEs: 'Masaje con pindas', captionCa: 'Massatge amb pindas', captionDe: 'Kräuterstempelmassage', captionEn: 'Herbal compress massage', sortOrder: 5 },
    { imageUrl: '/images/homeopatia.jpg', captionEs: 'Homeopatía', captionCa: 'Homeopatia', captionDe: 'Homöopathie', captionEn: 'Homeopathy', sortOrder: 6 },
    { imageUrl: '/images/ventosas.jpg', captionEs: 'Ventosas', captionCa: 'Ventoses', captionDe: 'Schröpfen', captionEn: 'Cupping therapy', sortOrder: 7 },
    { imageUrl: '/images/masaje-tailandes.jpg', captionEs: 'Masaje tailandés', captionCa: 'Massatge tailandès', captionDe: 'Thai-Massage', captionEn: 'Thai massage', sortOrder: 8 },
  ];

  for (let i = 0; i < galleryImages.length; i++) {
    const img = galleryImages[i];
    // Use upsert-like approach: check if exists by imageUrl
    const existing = await prisma.galleryImage.findFirst({ where: { imageUrl: img.imageUrl } });
    if (!existing) {
      await prisma.galleryImage.create({ data: img });
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
