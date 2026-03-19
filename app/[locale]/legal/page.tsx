"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)",
};

function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}

type Section = { id: string; label: string; content: { title: string; text: string }[] };

const sections_fr: Section[] = [
  {
    id: "mentions",
    label: "Mentions légales",
    content: [
      { title: "Éditeur du site", text: "Le site acfstandard.vercel.app est édité par AI CONSULTING, SASU au capital variable, dont le siège social est situé au 38 Bis Boulevard Victor Hugo, 06000 Nice, France. Immatriculation RCS Nice : 909116329. Numéro de TVA intracommunautaire : FR96909116329. Directeur de la publication : Vincent DORANGE." },
      { title: "Hébergement", text: "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. Site web : vercel.com." },
      { title: "Propriété intellectuelle", text: "L'ensemble des contenus présents sur ce site (textes, graphismes, logos, icônes, images, méthodologies, frameworks) sont la propriété exclusive d'AI CONSULTING ou font l'objet d'une autorisation d'utilisation. « Agentic Commerce Framework® » et « ACF® » sont des marques déposées. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable." },
      { title: "Créateur du Framework", text: "L'Agentic Commerce Framework® (ACF®) est une méthodologie propriétaire conçue et développée par Vincent DORANGE. Tous droits réservés." },
      { title: "Contact", text: "Pour toute question relative aux mentions légales, vous pouvez nous contacter via la page Contact du site ou par courrier à l'adresse du siège social." },
    ]
  },
  {
    id: "cgu",
    label: "Conditions d'utilisation",
    content: [
      { title: "Objet", text: "Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'accès et d'utilisation du site acfstandard.vercel.app et de ses services associés, incluant notamment le diagnostic ACF Score® et les informations relatives à l'Agentic Commerce Framework®." },
      { title: "Accès au site", text: "L'accès au site est gratuit. Le diagnostic ACF Score® est accessible sans inscription et sans frais. Certains services premium (ACF Control, Certification, Accompagnement) pourront faire l'objet de conditions particulières et de tarifications spécifiques communiquées au moment de la souscription." },
      { title: "Utilisation du Score ACF®", text: "Le Score ACF® est un outil de diagnostic indicatif. Il ne constitue ni un audit réglementaire, ni une certification officielle, ni un conseil juridique. Les résultats et recommandations fournis sont à titre informatif et ne sauraient engager la responsabilité d'AI CONSULTING. L'utilisateur est seul responsable de l'interprétation et de la mise en œuvre des recommandations." },
      { title: "Propriété intellectuelle", text: "La méthodologie ACF®, les algorithmes de scoring, la structure du framework en 4 couches, et l'ensemble des livrables associés sont protégés par le droit de la propriété intellectuelle. Toute utilisation commerciale non autorisée est strictement interdite." },
      { title: "Responsabilité", text: "AI CONSULTING s'efforce de fournir des informations exactes et à jour. Toutefois, AI CONSULTING ne garantit pas l'exactitude, la complétude ou l'actualité des informations diffusées sur le site. AI CONSULTING ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder." },
      { title: "Modification des CGU", text: "AI CONSULTING se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur le site. L'utilisation continue du site après publication des modifications vaut acceptation des nouvelles CGU." },
    ]
  },
  {
    id: "confidentialite",
    label: "Politique de confidentialité",
    content: [
      { title: "Responsable du traitement", text: "Le responsable du traitement des données personnelles est AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nice, France. Contact : via la page Contact du site." },
      { title: "Données collectées", text: "Dans le cadre du diagnostic ACF Score® : les réponses aux questions du questionnaire sont traitées en temps réel pour calculer votre score et ne sont pas stockées sans votre consentement explicite. Si vous fournissez votre adresse email : celle-ci est utilisée uniquement pour l'envoi de votre rapport PDF et, avec votre accord, pour des communications relatives à l'ACF®." },
      { title: "Formulaire de contact", text: "Les informations saisies dans le formulaire de contact (nom, email, entreprise, message) sont utilisées exclusivement pour répondre à votre demande. Elles ne sont ni revendues, ni partagées avec des tiers." },
      { title: "Cookies", text: "Le site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est utilisé. Les cookies d'analyse (si activés) sont anonymisés et utilisés uniquement pour améliorer l'expérience utilisateur." },
      { title: "Hébergement des données", text: "Les données sont hébergées par Vercel Inc. (États-Unis) dans le cadre du Data Privacy Framework UE-US. Vercel est conforme aux standards de protection des données applicables." },
      { title: "Vos droits (RGPD)", text: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous via la page Contact en précisant votre demande. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés)." },
      { title: "Conservation des données", text: "Les données personnelles sont conservées pendant la durée strictement nécessaire aux finalités pour lesquelles elles sont traitées. Les données du formulaire de contact sont conservées 12 mois maximum. Les données de diagnostic ne sont pas conservées sauf consentement explicite." },
    ]
  },
  {
    id: "cookies",
    label: "Politique cookies",
    content: [
      { title: "Qu'est-ce qu'un cookie ?", text: "Un cookie est un petit fichier texte stocké sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur un site web. Il permet au site de mémoriser des informations sur votre visite." },
      { title: "Cookies utilisés", text: "Le site utilise exclusivement des cookies techniques essentiels au fonctionnement du site (gestion de session, préférences de langue, affichage). Ces cookies ne nécessitent pas votre consentement préalable car ils sont strictement nécessaires à la fourniture du service." },
      { title: "Cookies analytiques", text: "Si des outils d'analyse sont mis en place, ils utiliseront des données anonymisées et ne permettront pas de vous identifier personnellement. Vous serez informé et votre consentement sera recueilli avant l'activation de ces cookies." },
      { title: "Cookies tiers", text: "Le site n'utilise aucun cookie publicitaire ni aucun cookie de réseaux sociaux. Aucune donnée n'est partagée avec des plateformes publicitaires." },
      { title: "Gestion des cookies", text: "Vous pouvez à tout moment gérer vos préférences en matière de cookies via les paramètres de votre navigateur. La désactivation de certains cookies peut affecter votre expérience de navigation." },
    ]
  },
];

const sections_en: Section[] = [
  {
    id: "mentions",
    label: "Legal Notice",
    content: [
      { title: "Website Publisher", text: "The website acfstandard.vercel.app is published by AI CONSULTING, a simplified joint-stock company (SASU) with variable capital, headquartered at 38 Bis Boulevard Victor Hugo, 06000 Nice, France. RCS Nice registration: 909116329. Intra-community VAT number: FR96909116329. Publication Director: Vincent DORANGE." },
      { title: "Hosting", text: "The website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States. Website: vercel.com." },
      { title: "Intellectual Property", text: "All content on this website (text, graphics, logos, icons, images, methodologies, frameworks) is the exclusive property of AI CONSULTING or is used under license. 'Agentic Commerce Framework\u00ae' and 'ACF\u00ae' are registered trademarks. Any reproduction, representation, modification, publication, or adaptation of all or part of the website elements is prohibited without prior written authorization." },
      { title: "Framework Creator", text: "The Agentic Commerce Framework\u00ae (ACF\u00ae) is a proprietary methodology designed and developed by Vincent DORANGE. All rights reserved." },
      { title: "Contact", text: "For any questions regarding this legal notice, you can contact us via the Contact page or by mail to the registered office address." },
    ]
  },
  {
    id: "cgu",
    label: "Terms of Use",
    content: [
      { title: "Purpose", text: "These Terms of Use define the conditions for accessing and using the website acfstandard.vercel.app and its associated services, including the ACF Score\u00ae diagnostic and information related to the Agentic Commerce Framework\u00ae." },
      { title: "Website Access", text: "Access to the website is free. The ACF Score\u00ae diagnostic is accessible without registration and at no cost. Certain premium services (ACF Control, Certification, Support) may be subject to specific conditions and pricing communicated at the time of subscription." },
      { title: "Use of ACF Score\u00ae", text: "The ACF Score\u00ae is an indicative diagnostic tool. It does not constitute a regulatory audit, official certification, or legal advice. Results and recommendations are provided for informational purposes only and shall not engage the liability of AI CONSULTING. Users are solely responsible for interpreting and implementing the recommendations." },
      { title: "Intellectual Property", text: "The ACF\u00ae methodology, scoring algorithms, 4-layer framework structure, and all associated deliverables are protected by intellectual property law. Any unauthorized commercial use is strictly prohibited." },
      { title: "Liability", text: "AI CONSULTING endeavors to provide accurate and up-to-date information. However, AI CONSULTING does not guarantee the accuracy, completeness, or timeliness of information published on the website. AI CONSULTING shall not be liable for any direct or indirect damages resulting from the use of the website or the inability to access it." },
      { title: "Modification of Terms", text: "AI CONSULTING reserves the right to modify these Terms at any time. Modifications shall take effect upon publication on the website. Continued use of the website after publication of modifications constitutes acceptance of the new Terms." },
    ]
  },
  {
    id: "confidentialite",
    label: "Privacy Policy",
    content: [
      { title: "Data Controller", text: "The data controller for personal data is AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nice, France. Contact: via the Contact page." },
      { title: "Data Collected", text: "For the ACF Score\u00ae diagnostic: questionnaire responses are processed in real-time to calculate your score and are not stored without your explicit consent. If you provide your email address: it is used solely for sending your PDF report and, with your consent, for communications related to ACF\u00ae." },
      { title: "Contact Form", text: "Information entered in the contact form (name, email, company, message) is used exclusively to respond to your request. It is neither resold nor shared with third parties." },
      { title: "Cookies", text: "The website uses technical cookies necessary for its operation. No advertising or third-party tracking cookies are used. Analytics cookies (if enabled) are anonymized and used solely to improve user experience." },
      { title: "Data Hosting", text: "Data is hosted by Vercel Inc. (United States) under the EU-US Data Privacy Framework. Vercel complies with applicable data protection standards." },
      { title: "Your Rights (GDPR)", text: "In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify, erase, restrict processing, data portability, and object regarding your personal data. To exercise these rights, contact us via the Contact page specifying your request. You also have the right to lodge a complaint with the CNIL (French National Commission on Informatics and Liberty)." },
      { title: "Data Retention", text: "Personal data is retained for the period strictly necessary for the purposes for which it is processed. Contact form data is retained for a maximum of 12 months. Diagnostic data is not retained without explicit consent." },
    ]
  },
  {
    id: "cookies",
    label: "Cookie Policy",
    content: [
      { title: "What is a Cookie?", text: "A cookie is a small text file stored on your device (computer, tablet, smartphone) when you visit a website. It allows the website to remember information about your visit." },
      { title: "Cookies Used", text: "The website exclusively uses essential technical cookies for site operation (session management, language preferences, display). These cookies do not require your prior consent as they are strictly necessary for providing the service." },
      { title: "Analytics Cookies", text: "If analytics tools are implemented, they will use anonymized data and will not allow personal identification. You will be informed and your consent will be obtained before activating these cookies." },
      { title: "Third-Party Cookies", text: "The website does not use any advertising cookies or social media cookies. No data is shared with advertising platforms." },
      { title: "Managing Cookies", text: "You can manage your cookie preferences at any time through your browser settings. Disabling certain cookies may affect your browsing experience." },
    ]
  },
];

const sections_es: Section[] = [
  {
    id: "mentions",
    label: "Aviso legal",
    content: [
      { title: "Editor del sitio", text: "El sitio acfstandard.vercel.app es editado por AI CONSULTING, SASU con capital variable, con sede social en 38 Bis Boulevard Victor Hugo, 06000 Niza, Francia. Registro RCS Niza: 909116329. Número de IVA intracomunitario: FR96909116329. Director de publicación: Vincent DORANGE." },
      { title: "Alojamiento", text: "El sitio está alojado por Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Estados Unidos. Sitio web: vercel.com." },
      { title: "Propiedad intelectual", text: "Todo el contenido de este sitio (textos, gráficos, logotipos, iconos, imágenes, metodologías, frameworks) es propiedad exclusiva de AI CONSULTING o se utiliza bajo licencia. 'Agentic Commerce Framework®' y 'ACF®' son marcas registradas. Queda prohibida cualquier reproducción, representación, modificación, publicación o adaptación total o parcial de los elementos del sitio sin autorización escrita previa." },
      { title: "Creador del Framework", text: "El Agentic Commerce Framework® (ACF®) es una metodología propietaria diseñada y desarrollada por Vincent DORANGE. Todos los derechos reservados." },
      { title: "Contacto", text: "Para cualquier pregunta relativa al aviso legal, puede contactarnos a través de la página de Contacto del sitio o por correo postal a la dirección de la sede social." },
    ]
  },
  {
    id: "cgu",
    label: "Condiciones de uso",
    content: [
      { title: "Objeto", text: "Las presentes Condiciones Generales de Uso tienen por objeto definir las modalidades y condiciones de acceso y uso del sitio acfstandard.vercel.app y sus servicios asociados, incluyendo el diagnóstico ACF Score® y la información relativa al Agentic Commerce Framework®." },
      { title: "Acceso al sitio", text: "El acceso al sitio es gratuito. El diagnóstico ACF Score® es accesible sin registro y sin coste. Algunos servicios premium (ACF Control, Certificación, Acompañamiento) podrán estar sujetos a condiciones particulares y tarifas específicas comunicadas en el momento de la suscripción." },
      { title: "Uso del Score ACF®", text: "El Score ACF® es una herramienta de diagnóstico indicativa. No constituye una auditoría regulatoria, una certificación oficial ni un asesoramiento jurídico. Los resultados y recomendaciones se proporcionan a título informativo y no comprometen la responsabilidad de AI CONSULTING. El usuario es el único responsable de la interpretación e implementación de las recomendaciones." },
      { title: "Propiedad intelectual", text: "La metodología ACF®, los algoritmos de puntuación, la estructura del framework de 4 capas y todos los entregables asociados están protegidos por la ley de propiedad intelectual. Cualquier uso comercial no autorizado está estrictamente prohibido." },
      { title: "Responsabilidad", text: "AI CONSULTING se esfuerza por proporcionar información precisa y actualizada. Sin embargo, AI CONSULTING no garantiza la exactitud, integridad o actualidad de la información publicada en el sitio. AI CONSULTING no será responsable de los daños directos o indirectos derivados del uso del sitio o de la imposibilidad de acceder al mismo." },
      { title: "Modificación de las condiciones", text: "AI CONSULTING se reserva el derecho de modificar las presentes condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio. El uso continuado del sitio después de la publicación de las modificaciones constituye la aceptación de las nuevas condiciones." },
    ]
  },
  {
    id: "confidentialite",
    label: "Política de privacidad",
    content: [
      { title: "Responsable del tratamiento", text: "El responsable del tratamiento de datos personales es AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Niza, Francia. Contacto: a través de la página de Contacto del sitio." },
      { title: "Datos recogidos", text: "Para el diagnóstico ACF Score®: las respuestas al cuestionario se procesan en tiempo real para calcular su puntuación y no se almacenan sin su consentimiento explícito. Si proporciona su dirección de correo electrónico: se utiliza únicamente para enviar su informe PDF y, con su consentimiento, para comunicaciones relacionadas con ACF®." },
      { title: "Formulario de contacto", text: "La información introducida en el formulario de contacto (nombre, correo electrónico, empresa, mensaje) se utiliza exclusivamente para responder a su solicitud. No se revende ni se comparte con terceros." },
      { title: "Cookies", text: "El sitio utiliza cookies técnicas necesarias para su funcionamiento. No se utilizan cookies publicitarias ni de seguimiento de terceros. Las cookies analíticas (si están activadas) son anonimizadas y se utilizan únicamente para mejorar la experiencia del usuario." },
      { title: "Alojamiento de datos", text: "Los datos están alojados por Vercel Inc. (Estados Unidos) en el marco del Marco de Privacidad de Datos UE-EE.UU. Vercel cumple con los estándares de protección de datos aplicables." },
      { title: "Sus derechos (RGPD)", text: "De conformidad con el Reglamento General de Protección de Datos (RGPD), usted tiene derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición respecto a sus datos personales. Para ejercer estos derechos, contáctenos a través de la página de Contacto especificando su solicitud. También tiene derecho a presentar una reclamación ante la CNIL (Comisión Nacional de Informática y Libertades de Francia)." },
      { title: "Conservación de datos", text: "Los datos personales se conservan durante el período estrictamente necesario para los fines para los que se tratan. Los datos del formulario de contacto se conservan durante un máximo de 12 meses. Los datos de diagnóstico no se conservan sin consentimiento explícito." },
    ]
  },
  {
    id: "cookies",
    label: "Política de cookies",
    content: [
      { title: "¿Qué es una cookie?", text: "Una cookie es un pequeño archivo de texto almacenado en su dispositivo (ordenador, tableta, smartphone) cuando visita un sitio web. Permite al sitio recordar información sobre su visita." },
      { title: "Cookies utilizadas", text: "El sitio utiliza exclusivamente cookies técnicas esenciales para el funcionamiento del sitio (gestión de sesión, preferencias de idioma, visualización). Estas cookies no requieren su consentimiento previo ya que son estrictamente necesarias para la prestación del servicio." },
      { title: "Cookies analíticas", text: "Si se implementan herramientas de análisis, utilizarán datos anonimizados y no permitirán la identificación personal. Se le informará y se obtendrá su consentimiento antes de activar estas cookies." },
      { title: "Cookies de terceros", text: "El sitio no utiliza cookies publicitarias ni cookies de redes sociales. No se comparten datos con plataformas publicitarias." },
      { title: "Gestión de cookies", text: "Puede gestionar sus preferencias de cookies en cualquier momento a través de la configuración de su navegador. La desactivación de ciertas cookies puede afectar su experiencia de navegación." },
    ]
  },
];

const sections_de: Section[] = [
  {
    id: "mentions",
    label: "Impressum",
    content: [
      { title: "Herausgeber der Website", text: "Die Website acfstandard.vercel.app wird herausgegeben von AI CONSULTING, einer vereinfachten Aktiengesellschaft (SASU) mit variablem Kapital, mit Sitz in 38 Bis Boulevard Victor Hugo, 06000 Nizza, Frankreich. RCS Nizza: 909116329. Umsatzsteuer-Identifikationsnummer: FR96909116329. Verantwortlicher Direktor: Vincent DORANGE." },
      { title: "Hosting", text: "Die Website wird gehostet von Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Vereinigte Staaten. Website: vercel.com." },
      { title: "Geistiges Eigentum", text: "Alle Inhalte dieser Website (Texte, Grafiken, Logos, Icons, Bilder, Methoden, Frameworks) sind ausschließliches Eigentum von AI CONSULTING oder werden unter Lizenz verwendet. 'Agentic Commerce Framework®' und 'ACF®' sind eingetragene Marken. Jede Reproduktion, Darstellung, Änderung, Veröffentlichung oder Anpassung aller oder eines Teils der Website-Elemente ist ohne vorherige schriftliche Genehmigung untersagt." },
      { title: "Framework-Ersteller", text: "Das Agentic Commerce Framework® (ACF®) ist eine proprietäre Methodik, die von Vincent DORANGE entworfen und entwickelt wurde. Alle Rechte vorbehalten." },
      { title: "Kontakt", text: "Bei Fragen zu diesem Impressum können Sie uns über die Kontaktseite oder per Post an die Adresse des eingetragenen Sitzes kontaktieren." },
    ]
  },
  {
    id: "cgu",
    label: "Nutzungsbedingungen",
    content: [
      { title: "Gegenstand", text: "Diese Allgemeinen Nutzungsbedingungen definieren die Modalitäten und Bedingungen für den Zugang und die Nutzung der Website acfstandard.vercel.app und ihrer zugehörigen Dienste, einschließlich der ACF Score®-Diagnose und Informationen zum Agentic Commerce Framework®." },
      { title: "Zugang zur Website", text: "Der Zugang zur Website ist kostenlos. Die ACF Score®-Diagnose ist ohne Registrierung und kostenfrei zugänglich. Bestimmte Premium-Dienste (ACF Control, Zertifizierung, Begleitung) können besonderen Bedingungen und spezifischen Preisen unterliegen, die zum Zeitpunkt der Anmeldung mitgeteilt werden." },
      { title: "Nutzung des ACF Score®", text: "Der ACF Score® ist ein indikatives Diagnosewerkzeug. Er stellt weder ein regulatorisches Audit, noch eine offizielle Zertifizierung, noch eine Rechtsberatung dar. Die Ergebnisse und Empfehlungen werden nur zu Informationszwecken bereitgestellt und begründen keine Haftung von AI CONSULTING. Die Nutzer sind allein für die Interpretation und Umsetzung der Empfehlungen verantwortlich." },
      { title: "Geistiges Eigentum", text: "Die ACF®-Methodik, die Scoring-Algorithmen, die 4-Schichten-Framework-Struktur und alle zugehörigen Ergebnisse sind durch das Recht des geistigen Eigentums geschützt. Jede nicht autorisierte kommerzielle Nutzung ist strengstens untersagt." },
      { title: "Haftung", text: "AI CONSULTING bemüht sich, genaue und aktuelle Informationen bereitzustellen. AI CONSULTING garantiert jedoch nicht die Genauigkeit, Vollständigkeit oder Aktualität der auf der Website veröffentlichten Informationen. AI CONSULTING haftet nicht für direkte oder indirekte Schäden, die aus der Nutzung der Website oder der Unmöglichkeit des Zugangs resultieren." },
      { title: "Änderung der Bedingungen", text: "AI CONSULTING behält sich das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen treten mit ihrer Veröffentlichung auf der Website in Kraft. Die fortgesetzte Nutzung der Website nach Veröffentlichung der Änderungen gilt als Annahme der neuen Bedingungen." },
    ]
  },
  {
    id: "confidentialite",
    label: "Datenschutzrichtlinie",
    content: [
      { title: "Verantwortlicher", text: "Der Verantwortliche für die Verarbeitung personenbezogener Daten ist AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nizza, Frankreich. Kontakt: über die Kontaktseite der Website." },
      { title: "Erhobene Daten", text: "Für die ACF Score®-Diagnose: Die Antworten auf den Fragebogen werden in Echtzeit verarbeitet, um Ihren Score zu berechnen, und werden ohne Ihre ausdrückliche Zustimmung nicht gespeichert. Wenn Sie Ihre E-Mail-Adresse angeben: Diese wird ausschließlich für den Versand Ihres PDF-Berichts und, mit Ihrer Zustimmung, für Mitteilungen im Zusammenhang mit ACF® verwendet." },
      { title: "Kontaktformular", text: "Die im Kontaktformular eingegebenen Informationen (Name, E-Mail, Unternehmen, Nachricht) werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet. Sie werden weder weiterverkauft noch an Dritte weitergegeben." },
      { title: "Cookies", text: "Die Website verwendet technische Cookies, die für ihren Betrieb erforderlich sind. Es werden keine Werbe- oder Tracking-Cookies von Drittanbietern verwendet. Analyse-Cookies (falls aktiviert) sind anonymisiert und werden ausschließlich zur Verbesserung der Benutzererfahrung verwendet." },
      { title: "Datenhosting", text: "Die Daten werden von Vercel Inc. (Vereinigte Staaten) im Rahmen des EU-US-Datenschutzrahmens gehostet. Vercel erfüllt die geltenden Datenschutzstandards." },
      { title: "Ihre Rechte (DSGVO)", text: "Gemäß der Datenschutz-Grundverordnung (DSGVO) haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch bezüglich Ihrer personenbezogenen Daten. Um diese Rechte auszuüben, kontaktieren Sie uns über die Kontaktseite unter Angabe Ihrer Anfrage. Sie haben auch das Recht, eine Beschwerde bei der CNIL (Französische Nationale Kommission für Informatik und Freiheiten) einzureichen." },
      { title: "Datenspeicherung", text: "Personenbezogene Daten werden nur so lange aufbewahrt, wie es für die Zwecke, für die sie verarbeitet werden, unbedingt erforderlich ist. Kontaktformulardaten werden maximal 12 Monate aufbewahrt. Diagnosedaten werden ohne ausdrückliche Zustimmung nicht aufbewahrt." },
    ]
  },
  {
    id: "cookies",
    label: "Cookie-Richtlinie",
    content: [
      { title: "Was ist ein Cookie?", text: "Ein Cookie ist eine kleine Textdatei, die auf Ihrem Gerät (Computer, Tablet, Smartphone) gespeichert wird, wenn Sie eine Website besuchen. Es ermöglicht der Website, Informationen über Ihren Besuch zu speichern." },
      { title: "Verwendete Cookies", text: "Die Website verwendet ausschließlich technische Cookies, die für den Betrieb der Website erforderlich sind (Sitzungsverwaltung, Spracheinstellungen, Anzeige). Diese Cookies erfordern keine vorherige Zustimmung, da sie für die Bereitstellung des Dienstes streng erforderlich sind." },
      { title: "Analyse-Cookies", text: "Wenn Analyse-Tools implementiert werden, verwenden sie anonymisierte Daten und ermöglichen keine persönliche Identifizierung. Sie werden informiert und Ihre Zustimmung wird eingeholt, bevor diese Cookies aktiviert werden." },
      { title: "Cookies von Drittanbietern", text: "Die Website verwendet keine Werbe-Cookies oder Social-Media-Cookies. Es werden keine Daten an Werbeplattformen weitergegeben." },
      { title: "Cookies verwalten", text: "Sie können Ihre Cookie-Einstellungen jederzeit über Ihre Browser-Einstellungen verwalten. Die Deaktivierung bestimmter Cookies kann Ihr Browsing-Erlebnis beeinträchtigen." },
    ]
  },
];

const sections_pt: Section[] = [
  {
    id: "mentions",
    label: "Aviso legal",
    content: [
      { title: "Editor do site", text: "O site acfstandard.vercel.app é editado por AI CONSULTING, SASU com capital variável, com sede em 38 Bis Boulevard Victor Hugo, 06000 Nice, França. Registo RCS Nice: 909116329. Número de IVA intracomunitário: FR96909116329. Diretor de publicação: Vincent DORANGE." },
      { title: "Alojamento", text: "O site é alojado pela Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Estados Unidos. Site: vercel.com." },
      { title: "Propriedade intelectual", text: "Todo o conteúdo deste site (textos, gráficos, logótipos, ícones, imagens, metodologias, frameworks) é propriedade exclusiva da AI CONSULTING ou é utilizado sob licença. 'Agentic Commerce Framework®' e 'ACF®' são marcas registadas. É proibida qualquer reprodução, representação, modificação, publicação ou adaptação total ou parcial dos elementos do site sem autorização escrita prévia." },
      { title: "Criador do Framework", text: "O Agentic Commerce Framework® (ACF®) é uma metodologia proprietária concebida e desenvolvida por Vincent DORANGE. Todos os direitos reservados." },
      { title: "Contacto", text: "Para qualquer questão relativa ao aviso legal, pode contactar-nos através da página de Contacto do site ou por correio para a morada da sede social." },
    ]
  },
  {
    id: "cgu",
    label: "Condições de utilização",
    content: [
      { title: "Objeto", text: "As presentes Condições Gerais de Utilização definem as modalidades e condições de acesso e utilização do site acfstandard.vercel.app e dos seus serviços associados, incluindo o diagnóstico ACF Score® e as informações relativas ao Agentic Commerce Framework®." },
      { title: "Acesso ao site", text: "O acesso ao site é gratuito. O diagnóstico ACF Score® é acessível sem registo e sem custos. Alguns serviços premium (ACF Control, Certificação, Acompanhamento) poderão estar sujeitos a condições particulares e tarifas específicas comunicadas no momento da subscrição." },
      { title: "Utilização do Score ACF®", text: "O Score ACF® é uma ferramenta de diagnóstico indicativa. Não constitui uma auditoria regulamentar, uma certificação oficial nem um aconselhamento jurídico. Os resultados e recomendações são fornecidos a título informativo e não comprometem a responsabilidade da AI CONSULTING. O utilizador é o único responsável pela interpretação e implementação das recomendações." },
      { title: "Propriedade intelectual", text: "A metodologia ACF®, os algoritmos de pontuação, a estrutura do framework de 4 camadas e todos os entregáveis associados são protegidos pela lei de propriedade intelectual. Qualquer utilização comercial não autorizada é estritamente proibida." },
      { title: "Responsabilidade", text: "A AI CONSULTING esforça-se por fornecer informações precisas e atualizadas. No entanto, a AI CONSULTING não garante a exatidão, integridade ou atualidade das informações publicadas no site. A AI CONSULTING não será responsável por quaisquer danos diretos ou indiretos resultantes da utilização do site ou da impossibilidade de acesso ao mesmo." },
      { title: "Modificação das condições", text: "A AI CONSULTING reserva-se o direito de modificar as presentes condições a qualquer momento. As modificações entrarão em vigor a partir da sua publicação no site. A utilização continuada do site após a publicação das modificações constitui a aceitação das novas condições." },
    ]
  },
  {
    id: "confidentialite",
    label: "Política de privacidade",
    content: [
      { title: "Responsável pelo tratamento", text: "O responsável pelo tratamento de dados pessoais é a AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nice, França. Contacto: através da página de Contacto do site." },
      { title: "Dados recolhidos", text: "Para o diagnóstico ACF Score®: as respostas ao questionário são processadas em tempo real para calcular a sua pontuação e não são armazenadas sem o seu consentimento explícito. Se fornecer o seu endereço de e-mail: é utilizado unicamente para o envio do seu relatório PDF e, com o seu consentimento, para comunicações relacionadas com o ACF®." },
      { title: "Formulário de contacto", text: "As informações introduzidas no formulário de contacto (nome, e-mail, empresa, mensagem) são utilizadas exclusivamente para responder ao seu pedido. Não são revendidas nem partilhadas com terceiros." },
      { title: "Cookies", text: "O site utiliza cookies técnicos necessários ao seu funcionamento. Não são utilizados cookies publicitários nem de rastreamento de terceiros. Os cookies analíticos (se ativados) são anonimizados e utilizados unicamente para melhorar a experiência do utilizador." },
      { title: "Alojamento de dados", text: "Os dados são alojados pela Vercel Inc. (Estados Unidos) ao abrigo do Quadro de Privacidade de Dados UE-EUA. A Vercel cumpre os padrões de proteção de dados aplicáveis." },
      { title: "Os seus direitos (RGPD)", text: "De acordo com o Regulamento Geral de Proteção de Dados (RGPD), tem o direito de acesso, retificação, apagamento, limitação do tratamento, portabilidade e oposição relativamente aos seus dados pessoais. Para exercer estes direitos, contacte-nos através da página de Contacto especificando o seu pedido. Tem também o direito de apresentar uma reclamação junto da CNIL (Comissão Nacional de Informática e Liberdades de França)." },
      { title: "Conservação de dados", text: "Os dados pessoais são conservados durante o período estritamente necessário para os fins para os quais são tratados. Os dados do formulário de contacto são conservados por um máximo de 12 meses. Os dados de diagnóstico não são conservados sem consentimento explícito." },
    ]
  },
  {
    id: "cookies",
    label: "Política de cookies",
    content: [
      { title: "O que é um cookie?", text: "Um cookie é um pequeno ficheiro de texto armazenado no seu dispositivo (computador, tablet, smartphone) quando visita um site. Permite ao site memorizar informações sobre a sua visita." },
      { title: "Cookies utilizados", text: "O site utiliza exclusivamente cookies técnicos essenciais para o funcionamento do site (gestão de sessão, preferências de idioma, visualização). Estes cookies não requerem o seu consentimento prévio, pois são estritamente necessários para a prestação do serviço." },
      { title: "Cookies analíticos", text: "Se forem implementadas ferramentas de análise, utilizarão dados anonimizados e não permitirão a identificação pessoal. Será informado e o seu consentimento será obtido antes da ativação destes cookies." },
      { title: "Cookies de terceiros", text: "O site não utiliza cookies publicitários nem cookies de redes sociais. Nenhum dado é partilhado com plataformas publicitárias." },
      { title: "Gestão de cookies", text: "Pode gerir as suas preferências de cookies a qualquer momento através das definições do seu navegador. A desativação de certos cookies pode afetar a sua experiência de navegação." },
    ]
  },
];

const sections_ja: Section[] = [
  {
    id: "mentions",
    label: "法的通知",
    content: [
      { title: "サイト発行者", text: "ウェブサイト acfstandard.vercel.app は、フランス・ニース 06000、38 Bis Boulevard Victor Hugo に本社を置く可変資本の簡易株式会社（SASU）である AI CONSULTING が発行しています。RCS ニース登録番号：909116329。EU内付加価値税番号：FR96909116329。発行責任者：Vincent DORANGE。" },
      { title: "ホスティング", text: "本サイトは Vercel Inc.（340 S Lemon Ave #4133, Walnut, CA 91789, アメリカ合衆国）によりホスティングされています。ウェブサイト：vercel.com。" },
      { title: "知的財産", text: "本サイト上のすべてのコンテンツ（テキスト、グラフィックス、ロゴ、アイコン、画像、方法論、フレームワーク）は AI CONSULTING の独占的所有物であるか、ライセンスに基づき使用されています。「Agentic Commerce Framework®」および「ACF®」は登録商標です。事前の書面による許可なく、サイトの要素の全部または一部を複製、表現、修正、公開、または翻案することは禁止されています。" },
      { title: "フレームワーク作成者", text: "Agentic Commerce Framework®（ACF®）は、Vincent DORANGE により設計・開発された独自の方法論です。全著作権所有。" },
      { title: "お問い合わせ", text: "法的通知に関するご質問は、サイトのお問い合わせページまたは本社住所への郵送にてお問い合わせください。" },
    ]
  },
  {
    id: "cgu",
    label: "利用規約",
    content: [
      { title: "目的", text: "本利用規約は、ウェブサイト acfstandard.vercel.app およびACF Score®診断やAgentic Commerce Framework®に関する情報を含む関連サービスへのアクセスおよび利用の条件を定めるものです。" },
      { title: "サイトへのアクセス", text: "サイトへのアクセスは無料です。ACF Score®診断は登録不要かつ無料でご利用いただけます。一部のプレミアムサービス（ACF Control、認証、サポート）には、契約時にお知らせする特別な条件および料金が適用される場合があります。" },
      { title: "ACF Score®の使用", text: "ACF Score®は参考的な診断ツールです。規制監査、公式認証、または法的助言を構成するものではありません。結果および推奨事項は情報提供のみを目的としており、AI CONSULTING の責任を構成するものではありません。ユーザーは推奨事項の解釈および実施について単独で責任を負います。" },
      { title: "知的財産", text: "ACF®の方法論、スコアリングアルゴリズム、4層フレームワーク構造、およびすべての関連成果物は知的財産法により保護されています。許可のない商業利用は固く禁じられています。" },
      { title: "責任", text: "AI CONSULTING は正確かつ最新の情報を提供するよう努めています。ただし、AI CONSULTING はサイト上に公開された情報の正確性、完全性、または最新性を保証しません。AI CONSULTING は、サイトの利用またはアクセス不能から生じる直接的または間接的な損害について責任を負いません。" },
      { title: "規約の変更", text: "AI CONSULTING はいつでも本規約を変更する権利を留保します。変更はサイトへの掲載をもって発効します。変更掲載後のサイトの継続使用は、新しい規約の承認とみなされます。" },
    ]
  },
  {
    id: "confidentialite",
    label: "プライバシーポリシー",
    content: [
      { title: "データ管理者", text: "個人データの管理者は AI CONSULTING（SASU、38 Bis Boulevard Victor Hugo, 06000 ニース、フランス）です。お問い合わせ：サイトのお問い合わせページをご利用ください。" },
      { title: "収集するデータ", text: "ACF Score®診断について：アンケートへの回答はスコア算出のためリアルタイムで処理され、明示的な同意なしに保存されることはありません。メールアドレスをご提供いただいた場合：PDFレポートの送付、およびお客様の同意を得た上でのACF®に関する連絡にのみ使用されます。" },
      { title: "お問い合わせフォーム", text: "お問い合わせフォームに入力された情報（氏名、メール、企業名、メッセージ）は、お問い合わせへの対応のみに使用されます。第三者に転売または共有されることはありません。" },
      { title: "Cookie", text: "本サイトはその運営に必要な技術的Cookieを使用しています。広告やサードパーティのトラッキングCookieは使用していません。分析Cookie（有効な場合）は匿名化され、ユーザー体験の向上のみに使用されます。" },
      { title: "データのホスティング", text: "データは EU-米国データプライバシーフレームワークの下、Vercel Inc.（アメリカ合衆国）によりホスティングされています。Vercel は適用されるデータ保護基準に準拠しています。" },
      { title: "お客様の権利（GDPR）", text: "一般データ保護規則（GDPR）に基づき、お客様は個人データに関するアクセス、訂正、削除、処理の制限、データポータビリティ、および異議申立ての権利を有します。これらの権利を行使するには、お問い合わせページからご要望を明記の上ご連絡ください。また、CNIL（フランス国家情報処理・自由委員会）に苦情を申し立てる権利もあります。" },
      { title: "データの保存", text: "個人データは、処理目的に厳密に必要な期間のみ保持されます。お問い合わせフォームのデータは最大12か月保持されます。診断データは明示的な同意なしに保持されることはありません。" },
    ]
  },
  {
    id: "cookies",
    label: "Cookieポリシー",
    content: [
      { title: "Cookieとは？", text: "Cookieとは、ウェブサイトを訪問した際にお客様のデバイス（コンピュータ、タブレット、スマートフォン）に保存される小さなテキストファイルです。これにより、サイトはお客様の訪問に関する情報を記憶できます。" },
      { title: "使用するCookie", text: "本サイトはサイト運営に不可欠な技術的Cookieのみを使用しています（セッション管理、言語設定、表示）。これらのCookieはサービス提供に厳密に必要であるため、事前の同意を必要としません。" },
      { title: "分析Cookie", text: "分析ツールが導入される場合、匿名化されたデータを使用し、個人の特定はできません。これらのCookieを有効化する前に、お客様に通知し同意を求めます。" },
      { title: "サードパーティCookie", text: "本サイトは広告Cookieやソーシャルメディアのクッキーを使用していません。広告プラットフォームとデータを共有することはありません。" },
      { title: "Cookieの管理", text: "ブラウザの設定を通じていつでもCookieの設定を管理できます。特定のCookieを無効にすると、ブラウジング体験に影響を与える場合があります。" },
    ]
  },
];

const sections_zh: Section[] = [
  {
    id: "mentions",
    label: "法律声明",
    content: [
      { title: "网站发布者", text: "网站 acfstandard.vercel.app 由 AI CONSULTING 发布，该公司为可变资本的简化股份公司（SASU），总部位于法国尼斯 06000，38 Bis Boulevard Victor Hugo。RCS 尼斯注册号：909116329。欧盟增值税号：FR96909116329。出版总监：Vincent DORANGE。" },
      { title: "托管", text: "本网站由 Vercel Inc. 托管，地址：340 S Lemon Ave #4133, Walnut, CA 91789，美国。网站：vercel.com。" },
      { title: "知识产权", text: "本网站上的所有内容（文字、图形、标志、图标、图片、方法论、框架）均为 AI CONSULTING 的独有财产或根据许可使用。'Agentic Commerce Framework®' 和 'ACF®' 是注册商标。未经事先书面授权，禁止对网站元素的全部或部分进行复制、表述、修改、发布或改编。" },
      { title: "框架创建者", text: "Agentic Commerce Framework®（ACF®）是由 Vincent DORANGE 设计和开发的专有方法论。保留所有权利。" },
      { title: "联系方式", text: "如有任何关于法律声明的问题，您可以通过网站的联系页面或邮寄至注册办公地址与我们联系。" },
    ]
  },
  {
    id: "cgu",
    label: "使用条款",
    content: [
      { title: "目的", text: "本使用条款定义了访问和使用网站 acfstandard.vercel.app 及其相关服务的条件，包括 ACF Score® 诊断和与 Agentic Commerce Framework® 相关的信息。" },
      { title: "网站访问", text: "网站访问免费。ACF Score® 诊断无需注册且免费使用。某些高级服务（ACF Control、认证、支持）可能受特定条件和定价约束，具体信息将在订阅时告知。" },
      { title: "ACF Score® 的使用", text: "ACF Score® 是一个指示性诊断工具。它不构成监管审计、官方认证或法律建议。结果和建议仅供参考，不构成 AI CONSULTING 的责任。用户对建议的解读和实施承担全部责任。" },
      { title: "知识产权", text: "ACF® 方法论、评分算法、四层框架结构以及所有相关交付成果均受知识产权法保护。未经授权的商业使用严格禁止。" },
      { title: "责任", text: "AI CONSULTING 努力提供准确和最新的信息。但 AI CONSULTING 不保证网站上发布信息的准确性、完整性或时效性。AI CONSULTING 不对因使用网站或无法访问网站而造成的任何直接或间接损害承担责任。" },
      { title: "条款修改", text: "AI CONSULTING 保留随时修改本条款的权利。修改自在网站上发布之日起生效。修改发布后继续使用网站即表示接受新条款。" },
    ]
  },
  {
    id: "confidentialite",
    label: "隐私政策",
    content: [
      { title: "数据控制者", text: "个人数据的控制者为 AI CONSULTING，SASU，地址：38 Bis Boulevard Victor Hugo, 06000 尼斯，法国。联系方式：通过网站联系页面。" },
      { title: "收集的数据", text: "关于 ACF Score® 诊断：问卷回答将实时处理以计算您的分数，未经您的明确同意不会被存储。如果您提供电子邮件地址：仅用于发送您的 PDF 报告，以及在您同意的情况下用于与 ACF® 相关的通信。" },
      { title: "联系表单", text: "在联系表单中输入的信息（姓名、电子邮件、公司、消息）仅用于回复您的请求。不会被转售或与第三方共享。" },
      { title: "Cookie", text: "本网站使用其运营所需的技术性 Cookie。不使用广告或第三方跟踪 Cookie。分析 Cookie（如启用）经匿名化处理，仅用于改善用户体验。" },
      { title: "数据托管", text: "数据由 Vercel Inc.（美国）根据欧盟-美国数据隐私框架托管。Vercel 遵守适用的数据保护标准。" },
      { title: "您的权利（GDPR）", text: "根据《通用数据保护条例》（GDPR），您有权访问、更正、删除、限制处理、数据可携带性以及反对处理您的个人数据。要行使这些权利，请通过联系页面与我们联系并说明您的请求。您还有权向 CNIL（法国国家信息与自由委员会）提出投诉。" },
      { title: "数据保留", text: "个人数据仅在处理目的严格必要的期限内保留。联系表单数据最多保留 12 个月。诊断数据未经明确同意不予保留。" },
    ]
  },
  {
    id: "cookies",
    label: "Cookie 政策",
    content: [
      { title: "什么是 Cookie？", text: "Cookie 是在您访问网站时存储在您的设备（电脑、平板电脑、智能手机）上的小型文本文件。它使网站能够记住有关您访问的信息。" },
      { title: "使用的 Cookie", text: "本网站仅使用网站运行所必需的技术性 Cookie（会话管理、语言偏好、显示）。这些 Cookie 无需您的事先同意，因为它们是提供服务所严格必要的。" },
      { title: "分析 Cookie", text: "如果实施分析工具，将使用匿名化数据，不允许个人身份识别。在激活这些 Cookie 之前，将通知您并获得您的同意。" },
      { title: "第三方 Cookie", text: "本网站不使用任何广告 Cookie 或社交媒体 Cookie。不与广告平台共享任何数据。" },
      { title: "管理 Cookie", text: "您可以随时通过浏览器设置管理您的 Cookie 偏好。禁用某些 Cookie 可能会影响您的浏览体验。" },
    ]
  },
];

const sections_ko: Section[] = [
  {
    id: "mentions",
    label: "법적 고지",
    content: [
      { title: "웹사이트 발행자", text: "웹사이트 acfstandard.vercel.app는 프랑스 니스 06000, 38 Bis Boulevard Victor Hugo에 본사를 둔 가변자본 간이주식회사(SASU)인 AI CONSULTING이 발행합니다. RCS 니스 등록번호: 909116329. EU 내 부가가치세 번호: FR96909116329. 발행 책임자: Vincent DORANGE." },
      { title: "호스팅", text: "본 웹사이트는 Vercel Inc.(340 S Lemon Ave #4133, Walnut, CA 91789, 미국)에 의해 호스팅됩니다. 웹사이트: vercel.com." },
      { title: "지적재산권", text: "본 웹사이트의 모든 콘텐츠(텍스트, 그래픽, 로고, 아이콘, 이미지, 방법론, 프레임워크)는 AI CONSULTING의 독점적 재산이거나 라이선스에 따라 사용됩니다. 'Agentic Commerce Framework®' 및 'ACF®'는 등록상표입니다. 사전 서면 허가 없이 웹사이트 요소의 전부 또는 일부를 복제, 표현, 수정, 게시 또는 개작하는 것은 금지됩니다." },
      { title: "프레임워크 제작자", text: "Agentic Commerce Framework®(ACF®)는 Vincent DORANGE가 설계하고 개발한 독점 방법론입니다. 모든 권리 보유." },
      { title: "연락처", text: "법적 고지에 관한 질문이 있으시면 사이트의 연락처 페이지 또는 등록 사무소 주소로 우편을 보내 문의하실 수 있습니다." },
    ]
  },
  {
    id: "cgu",
    label: "이용 약관",
    content: [
      { title: "목적", text: "본 이용 약관은 웹사이트 acfstandard.vercel.app 및 ACF Score® 진단과 Agentic Commerce Framework® 관련 정보를 포함한 관련 서비스의 접근 및 이용 조건을 정의합니다." },
      { title: "웹사이트 접근", text: "웹사이트 접근은 무료입니다. ACF Score® 진단은 등록 없이 무료로 이용할 수 있습니다. 일부 프리미엄 서비스(ACF Control, 인증, 지원)는 가입 시 안내되는 특정 조건 및 가격이 적용될 수 있습니다." },
      { title: "ACF Score® 사용", text: "ACF Score®는 지표성 진단 도구입니다. 규제 감사, 공식 인증 또는 법적 자문을 구성하지 않습니다. 결과 및 권장 사항은 정보 제공 목적으로만 제공되며 AI CONSULTING의 책임을 구성하지 않습니다. 사용자는 권장 사항의 해석 및 이행에 대해 전적으로 책임을 집니다." },
      { title: "지적재산권", text: "ACF® 방법론, 스코어링 알고리즘, 4계층 프레임워크 구조 및 모든 관련 산출물은 지적재산권법에 의해 보호됩니다. 허가되지 않은 상업적 사용은 엄격히 금지됩니다." },
      { title: "책임", text: "AI CONSULTING은 정확하고 최신의 정보를 제공하기 위해 노력합니다. 그러나 AI CONSULTING은 웹사이트에 게시된 정보의 정확성, 완전성 또는 적시성을 보장하지 않습니다. AI CONSULTING은 웹사이트 사용 또는 접근 불능으로 인한 직접적 또는 간접적 손해에 대해 책임을 지지 않습니다." },
      { title: "약관 변경", text: "AI CONSULTING은 언제든지 본 약관을 변경할 권리를 보유합니다. 변경 사항은 웹사이트에 게시되는 즉시 효력을 발생합니다. 변경 사항 게시 후 웹사이트의 계속적인 사용은 새로운 약관의 수락으로 간주됩니다." },
    ]
  },
  {
    id: "confidentialite",
    label: "개인정보 보호정책",
    content: [
      { title: "데이터 관리자", text: "개인 데이터의 관리자는 AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 니스, 프랑스입니다. 연락처: 사이트의 연락처 페이지를 통해 문의하세요." },
      { title: "수집 데이터", text: "ACF Score® 진단의 경우: 설문 응답은 점수 산출을 위해 실시간으로 처리되며 명시적 동의 없이는 저장되지 않습니다. 이메일 주소를 제공하는 경우: PDF 보고서 발송 및 동의 시 ACF® 관련 커뮤니케이션에만 사용됩니다." },
      { title: "문의 양식", text: "문의 양식에 입력된 정보(이름, 이메일, 회사, 메시지)는 귀하의 요청에 응답하기 위해서만 사용됩니다. 제3자에게 재판매되거나 공유되지 않습니다." },
      { title: "쿠키", text: "본 웹사이트는 운영에 필요한 기술적 쿠키를 사용합니다. 광고 또는 제3자 추적 쿠키는 사용하지 않습니다. 분석 쿠키(활성화된 경우)는 익명 처리되며 사용자 경험 개선에만 사용됩니다." },
      { title: "데이터 호스팅", text: "데이터는 EU-미국 데이터 프라이버시 프레임워크에 따라 Vercel Inc.(미국)에 의해 호스팅됩니다. Vercel은 적용 가능한 데이터 보호 표준을 준수합니다." },
      { title: "귀하의 권리(GDPR)", text: "일반 데이터 보호 규정(GDPR)에 따라 귀하는 개인 데이터에 관한 접근, 정정, 삭제, 처리 제한, 데이터 이동성 및 이의 제기 권리를 가집니다. 이러한 권리를 행사하려면 연락처 페이지를 통해 요청 사항을 명시하여 문의하세요. 또한 CNIL(프랑스 국가정보자유위원회)에 불만을 제기할 권리도 있습니다." },
      { title: "데이터 보존", text: "개인 데이터는 처리 목적에 엄격히 필요한 기간 동안만 보존됩니다. 문의 양식 데이터는 최대 12개월간 보존됩니다. 진단 데이터는 명시적 동의 없이 보존되지 않습니다." },
    ]
  },
  {
    id: "cookies",
    label: "쿠키 정책",
    content: [
      { title: "쿠키란?", text: "쿠키는 웹사이트를 방문할 때 귀하의 기기(컴퓨터, 태블릿, 스마트폰)에 저장되는 작은 텍스트 파일입니다. 이를 통해 웹사이트가 방문에 관한 정보를 기억할 수 있습니다." },
      { title: "사용되는 쿠키", text: "본 웹사이트는 사이트 운영에 필수적인 기술적 쿠키만을 사용합니다(세션 관리, 언어 설정, 표시). 이러한 쿠키는 서비스 제공에 엄격히 필요하므로 사전 동의가 필요하지 않습니다." },
      { title: "분석 쿠키", text: "분석 도구가 구현되는 경우 익명화된 데이터를 사용하며 개인 식별을 허용하지 않습니다. 이러한 쿠키를 활성화하기 전에 통지를 받고 동의를 구합니다." },
      { title: "제3자 쿠키", text: "본 웹사이트는 광고 쿠키나 소셜 미디어 쿠키를 사용하지 않습니다. 광고 플랫폼과 데이터를 공유하지 않습니다." },
      { title: "쿠키 관리", text: "브라우저 설정을 통해 언제든지 쿠키 설정을 관리할 수 있습니다. 특정 쿠키를 비활성화하면 브라우징 경험에 영향을 줄 수 있습니다." },
    ]
  },
];

const sections_it: Section[] = [
  {
    id: "mentions",
    label: "Note legali",
    content: [
      { title: "Editore del sito", text: "Il sito acfstandard.vercel.app è pubblicato da AI CONSULTING, SASU a capitale variabile, con sede legale in 38 Bis Boulevard Victor Hugo, 06000 Nizza, Francia. Registrazione RCS Nizza: 909116329. Numero di partita IVA intracomunitaria: FR96909116329. Direttore della pubblicazione: Vincent DORANGE." },
      { title: "Hosting", text: "Il sito è ospitato da Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Stati Uniti. Sito web: vercel.com." },
      { title: "Proprietà intellettuale", text: "Tutti i contenuti presenti su questo sito (testi, grafica, loghi, icone, immagini, metodologie, framework) sono proprietà esclusiva di AI CONSULTING o sono utilizzati su licenza. 'Agentic Commerce Framework®' e 'ACF®' sono marchi registrati. È vietata qualsiasi riproduzione, rappresentazione, modifica, pubblicazione o adattamento di tutto o parte degli elementi del sito senza previa autorizzazione scritta." },
      { title: "Creatore del Framework", text: "L'Agentic Commerce Framework® (ACF®) è una metodologia proprietaria progettata e sviluppata da Vincent DORANGE. Tutti i diritti riservati." },
      { title: "Contatto", text: "Per qualsiasi domanda relativa alle note legali, potete contattarci tramite la pagina Contatti del sito o per posta all'indirizzo della sede legale." },
    ]
  },
  {
    id: "cgu",
    label: "Condizioni d'uso",
    content: [
      { title: "Oggetto", text: "Le presenti Condizioni Generali d'Uso definiscono le modalità e le condizioni di accesso e utilizzo del sito acfstandard.vercel.app e dei suoi servizi associati, inclusa la diagnosi ACF Score® e le informazioni relative all'Agentic Commerce Framework®." },
      { title: "Accesso al sito", text: "L'accesso al sito è gratuito. La diagnosi ACF Score® è accessibile senza registrazione e senza costi. Alcuni servizi premium (ACF Control, Certificazione, Supporto) potranno essere soggetti a condizioni particolari e tariffe specifiche comunicate al momento della sottoscrizione." },
      { title: "Utilizzo del Score ACF®", text: "Lo Score ACF® è uno strumento diagnostico indicativo. Non costituisce un audit regolamentare, una certificazione ufficiale né una consulenza legale. I risultati e le raccomandazioni sono forniti a titolo informativo e non impegnano la responsabilità di AI CONSULTING. L'utente è l'unico responsabile dell'interpretazione e dell'implementazione delle raccomandazioni." },
      { title: "Proprietà intellettuale", text: "La metodologia ACF®, gli algoritmi di scoring, la struttura del framework a 4 livelli e tutti i deliverable associati sono protetti dalla legge sulla proprietà intellettuale. Qualsiasi uso commerciale non autorizzato è severamente vietato." },
      { title: "Responsabilità", text: "AI CONSULTING si impegna a fornire informazioni accurate e aggiornate. Tuttavia, AI CONSULTING non garantisce l'accuratezza, la completezza o l'attualità delle informazioni pubblicate sul sito. AI CONSULTING non sarà responsabile per eventuali danni diretti o indiretti derivanti dall'uso del sito o dall'impossibilità di accedervi." },
      { title: "Modifica delle condizioni", text: "AI CONSULTING si riserva il diritto di modificare le presenti condizioni in qualsiasi momento. Le modifiche avranno effetto dalla loro pubblicazione sul sito. L'uso continuato del sito dopo la pubblicazione delle modifiche costituisce accettazione delle nuove condizioni." },
    ]
  },
  {
    id: "confidentialite",
    label: "Informativa sulla privacy",
    content: [
      { title: "Titolare del trattamento", text: "Il titolare del trattamento dei dati personali è AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nizza, Francia. Contatto: tramite la pagina Contatti del sito." },
      { title: "Dati raccolti", text: "Per la diagnosi ACF Score®: le risposte al questionario vengono elaborate in tempo reale per calcolare il punteggio e non vengono memorizzate senza il consenso esplicito dell'utente. Se fornite il vostro indirizzo e-mail: viene utilizzato esclusivamente per l'invio del report PDF e, con il vostro consenso, per comunicazioni relative all'ACF®." },
      { title: "Modulo di contatto", text: "Le informazioni inserite nel modulo di contatto (nome, e-mail, azienda, messaggio) vengono utilizzate esclusivamente per rispondere alla vostra richiesta. Non vengono rivendute né condivise con terzi." },
      { title: "Cookie", text: "Il sito utilizza cookie tecnici necessari al suo funzionamento. Non vengono utilizzati cookie pubblicitari o di tracciamento di terze parti. I cookie analitici (se attivati) sono anonimizzati e utilizzati esclusivamente per migliorare l'esperienza utente." },
      { title: "Hosting dei dati", text: "I dati sono ospitati da Vercel Inc. (Stati Uniti) nell'ambito del Quadro di Privacy dei Dati UE-USA. Vercel è conforme agli standard di protezione dei dati applicabili." },
      { title: "I vostri diritti (GDPR)", text: "In conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR), avete il diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione riguardo ai vostri dati personali. Per esercitare questi diritti, contattateci tramite la pagina Contatti specificando la vostra richiesta. Avete inoltre il diritto di presentare un reclamo presso la CNIL (Commissione Nazionale per l'Informatica e le Libertà francese)." },
      { title: "Conservazione dei dati", text: "I dati personali vengono conservati per il periodo strettamente necessario alle finalità per cui vengono trattati. I dati del modulo di contatto vengono conservati per un massimo di 12 mesi. I dati diagnostici non vengono conservati senza consenso esplicito." },
    ]
  },
  {
    id: "cookies",
    label: "Politica dei cookie",
    content: [
      { title: "Cos'è un cookie?", text: "Un cookie è un piccolo file di testo memorizzato sul vostro dispositivo (computer, tablet, smartphone) quando visitate un sito web. Consente al sito di ricordare informazioni sulla vostra visita." },
      { title: "Cookie utilizzati", text: "Il sito utilizza esclusivamente cookie tecnici essenziali per il funzionamento del sito (gestione della sessione, preferenze linguistiche, visualizzazione). Questi cookie non richiedono il vostro consenso preventivo in quanto strettamente necessari per la fornitura del servizio." },
      { title: "Cookie analitici", text: "Se vengono implementati strumenti di analisi, utilizzeranno dati anonimizzati e non consentiranno l'identificazione personale. Sarete informati e il vostro consenso sarà ottenuto prima dell'attivazione di questi cookie." },
      { title: "Cookie di terze parti", text: "Il sito non utilizza cookie pubblicitari né cookie dei social media. Nessun dato viene condiviso con piattaforme pubblicitarie." },
      { title: "Gestione dei cookie", text: "Potete gestire le vostre preferenze sui cookie in qualsiasi momento tramite le impostazioni del vostro browser. La disattivazione di alcuni cookie potrebbe influire sulla vostra esperienza di navigazione." },
    ]
  },
];

const sections_nl: Section[] = [
  {
    id: "mentions",
    label: "Juridische kennisgeving",
    content: [
      { title: "Website-uitgever", text: "De website acfstandard.vercel.app wordt uitgegeven door AI CONSULTING, een vereenvoudigde naamloze vennootschap (SASU) met variabel kapitaal, gevestigd te 38 Bis Boulevard Victor Hugo, 06000 Nice, Frankrijk. KvK Nice: 909116329. Intracommunautair btw-nummer: FR96909116329. Directeur publicatie: Vincent DORANGE." },
      { title: "Hosting", text: "De website wordt gehost door Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Verenigde Staten. Website: vercel.com." },
      { title: "Intellectueel eigendom", text: "Alle inhoud op deze website (teksten, afbeeldingen, logo's, iconen, afbeeldingen, methodologieën, frameworks) is het exclusieve eigendom van AI CONSULTING of wordt onder licentie gebruikt. 'Agentic Commerce Framework®' en 'ACF®' zijn geregistreerde handelsmerken. Elke reproductie, weergave, wijziging, publicatie of aanpassing van alle of een deel van de website-elementen is verboden zonder voorafgaande schriftelijke toestemming." },
      { title: "Framework-maker", text: "Het Agentic Commerce Framework® (ACF®) is een eigen methodologie ontworpen en ontwikkeld door Vincent DORANGE. Alle rechten voorbehouden." },
      { title: "Contact", text: "Voor vragen over deze juridische kennisgeving kunt u contact met ons opnemen via de contactpagina van de website of per post naar het adres van de maatschappelijke zetel." },
    ]
  },
  {
    id: "cgu",
    label: "Gebruiksvoorwaarden",
    content: [
      { title: "Doel", text: "Deze Algemene Gebruiksvoorwaarden definiëren de voorwaarden voor toegang tot en gebruik van de website acfstandard.vercel.app en de bijbehorende diensten, waaronder de ACF Score®-diagnose en informatie over het Agentic Commerce Framework®." },
      { title: "Toegang tot de website", text: "Toegang tot de website is gratis. De ACF Score®-diagnose is toegankelijk zonder registratie en kosteloos. Bepaalde premiumdiensten (ACF Control, Certificering, Ondersteuning) kunnen onderworpen zijn aan specifieke voorwaarden en prijzen die bij inschrijving worden meegedeeld." },
      { title: "Gebruik van ACF Score®", text: "De ACF Score® is een indicatief diagnostisch instrument. Het vormt geen regelgevende audit, officiële certificering of juridisch advies. Resultaten en aanbevelingen worden uitsluitend ter informatie verstrekt en brengen geen aansprakelijkheid van AI CONSULTING met zich mee. Gebruikers zijn als enige verantwoordelijk voor de interpretatie en implementatie van de aanbevelingen." },
      { title: "Intellectueel eigendom", text: "De ACF®-methodologie, scoringsalgoritmen, 4-laags frameworkstructuur en alle bijbehorende deliverables worden beschermd door het intellectuele eigendomsrecht. Elk ongeoorloofd commercieel gebruik is strikt verboden." },
      { title: "Aansprakelijkheid", text: "AI CONSULTING streeft ernaar nauwkeurige en actuele informatie te verstrekken. AI CONSULTING garandeert echter niet de juistheid, volledigheid of actualiteit van de op de website gepubliceerde informatie. AI CONSULTING is niet aansprakelijk voor directe of indirecte schade als gevolg van het gebruik van de website of de onmogelijkheid om er toegang toe te krijgen." },
      { title: "Wijziging van voorwaarden", text: "AI CONSULTING behoudt zich het recht voor deze voorwaarden op elk moment te wijzigen. Wijzigingen worden van kracht bij publicatie op de website. Voortgezet gebruik van de website na publicatie van wijzigingen geldt als aanvaarding van de nieuwe voorwaarden." },
    ]
  },
  {
    id: "confidentialite",
    label: "Privacybeleid",
    content: [
      { title: "Verwerkingsverantwoordelijke", text: "De verwerkingsverantwoordelijke voor persoonsgegevens is AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nice, Frankrijk. Contact: via de contactpagina van de website." },
      { title: "Verzamelde gegevens", text: "Voor de ACF Score®-diagnose: antwoorden op de vragenlijst worden in realtime verwerkt om uw score te berekenen en worden niet opgeslagen zonder uw uitdrukkelijke toestemming. Als u uw e-mailadres opgeeft: dit wordt uitsluitend gebruikt voor het verzenden van uw PDF-rapport en, met uw toestemming, voor communicatie met betrekking tot ACF®." },
      { title: "Contactformulier", text: "Informatie die in het contactformulier wordt ingevoerd (naam, e-mail, bedrijf, bericht) wordt uitsluitend gebruikt om op uw verzoek te reageren. Deze wordt niet doorverkocht of gedeeld met derden." },
      { title: "Cookies", text: "De website gebruikt technische cookies die noodzakelijk zijn voor de werking ervan. Er worden geen reclame- of trackingcookies van derden gebruikt. Analytische cookies (indien ingeschakeld) worden geanonimiseerd en uitsluitend gebruikt om de gebruikerservaring te verbeteren." },
      { title: "Gegevenshosting", text: "Gegevens worden gehost door Vercel Inc. (Verenigde Staten) in het kader van het EU-VS-gegevensbeschermingskader. Vercel voldoet aan de toepasselijke normen voor gegevensbescherming." },
      { title: "Uw rechten (AVG)", text: "Overeenkomstig de Algemene Verordening Gegevensbescherming (AVG) hebt u het recht op inzage, rectificatie, wissing, beperking van verwerking, gegevensoverdraagbaarheid en bezwaar met betrekking tot uw persoonsgegevens. Om deze rechten uit te oefenen, neemt u contact met ons op via de contactpagina met vermelding van uw verzoek. U hebt ook het recht om een klacht in te dienen bij de CNIL (Franse Nationale Commissie voor Informatica en Vrijheden)." },
      { title: "Bewaring van gegevens", text: "Persoonsgegevens worden bewaard gedurende de periode die strikt noodzakelijk is voor de doeleinden waarvoor ze worden verwerkt. Gegevens van het contactformulier worden maximaal 12 maanden bewaard. Diagnostische gegevens worden niet bewaard zonder uitdrukkelijke toestemming." },
    ]
  },
  {
    id: "cookies",
    label: "Cookiebeleid",
    content: [
      { title: "Wat is een cookie?", text: "Een cookie is een klein tekstbestand dat op uw apparaat (computer, tablet, smartphone) wordt opgeslagen wanneer u een website bezoekt. Het stelt de website in staat informatie over uw bezoek te onthouden." },
      { title: "Gebruikte cookies", text: "De website maakt uitsluitend gebruik van essentiële technische cookies voor de werking van de website (sessiebeheer, taalvoorkeuren, weergave). Deze cookies vereisen geen voorafgaande toestemming omdat ze strikt noodzakelijk zijn voor het leveren van de dienst." },
      { title: "Analytische cookies", text: "Als er analysetools worden geïmplementeerd, gebruiken deze geanonimiseerde gegevens en maken ze geen persoonlijke identificatie mogelijk. U wordt geïnformeerd en uw toestemming wordt gevraagd voordat deze cookies worden geactiveerd." },
      { title: "Cookies van derden", text: "De website gebruikt geen reclamecookies of sociale mediacookies. Er worden geen gegevens gedeeld met reclameplatforms." },
      { title: "Cookies beheren", text: "U kunt uw cookievoorkeuren op elk moment beheren via uw browserinstellingen. Het uitschakelen van bepaalde cookies kan uw browse-ervaring beïnvloeden." },
    ]
  },
];

const sections_ru: Section[] = [
  {
    id: "mentions",
    label: "Юридическая информация",
    content: [
      { title: "Издатель сайта", text: "Сайт acfstandard.vercel.app издается компанией AI CONSULTING, упрощенное акционерное общество (SASU) с переменным капиталом, зарегистрированное по адресу: 38 Bis Boulevard Victor Hugo, 06000 Ницца, Франция. Регистрация RCS Ницца: 909116329. Номер НДС внутри ЕС: FR96909116329. Директор публикации: Vincent DORANGE." },
      { title: "Хостинг", text: "Сайт размещен на серверах Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, США. Сайт: vercel.com." },
      { title: "Интеллектуальная собственность", text: "Все содержимое данного сайта (тексты, графика, логотипы, иконки, изображения, методологии, фреймворки) является исключительной собственностью AI CONSULTING или используется по лицензии. «Agentic Commerce Framework®» и «ACF®» являются зарегистрированными товарными знаками. Любое воспроизведение, представление, изменение, публикация или адаптация всех или части элементов сайта запрещены без предварительного письменного разрешения." },
      { title: "Создатель фреймворка", text: "Agentic Commerce Framework® (ACF®) — это проприетарная методология, разработанная Vincent DORANGE. Все права защищены." },
      { title: "Контакты", text: "По любым вопросам, касающимся юридической информации, вы можете связаться с нами через страницу Контактов на сайте или по почте на адрес зарегистрированного офиса." },
    ]
  },
  {
    id: "cgu",
    label: "Условия использования",
    content: [
      { title: "Предмет", text: "Настоящие Условия использования определяют порядок и условия доступа и использования сайта acfstandard.vercel.app и связанных с ним сервисов, включая диагностику ACF Score® и информацию об Agentic Commerce Framework®." },
      { title: "Доступ к сайту", text: "Доступ к сайту бесплатный. Диагностика ACF Score® доступна без регистрации и бесплатно. Отдельные премиум-услуги (ACF Control, Сертификация, Сопровождение) могут предоставляться на особых условиях с тарифами, сообщаемыми при подписке." },
      { title: "Использование ACF Score®", text: "ACF Score® является ориентировочным диагностическим инструментом. Он не является нормативным аудитом, официальной сертификацией или юридической консультацией. Результаты и рекомендации предоставляются исключительно в информационных целях и не влекут ответственности AI CONSULTING. Пользователь несет единоличную ответственность за интерпретацию и реализацию рекомендаций." },
      { title: "Интеллектуальная собственность", text: "Методология ACF®, алгоритмы скоринга, четырехуровневая структура фреймворка и все связанные результаты защищены правом интеллектуальной собственности. Любое несанкционированное коммерческое использование строго запрещено." },
      { title: "Ответственность", text: "AI CONSULTING стремится предоставлять точную и актуальную информацию. Тем не менее AI CONSULTING не гарантирует точность, полноту или актуальность информации, опубликованной на сайте. AI CONSULTING не несет ответственности за прямой или косвенный ущерб, возникший в результате использования сайта или невозможности доступа к нему." },
      { title: "Изменение условий", text: "AI CONSULTING оставляет за собой право изменять настоящие условия в любое время. Изменения вступают в силу с момента их публикации на сайте. Продолжение использования сайта после публикации изменений означает принятие новых условий." },
    ]
  },
  {
    id: "confidentialite",
    label: "Политика конфиденциальности",
    content: [
      { title: "Оператор данных", text: "Оператором персональных данных является AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Ницца, Франция. Контакт: через страницу Контактов на сайте." },
      { title: "Собираемые данные", text: "Для диагностики ACF Score®: ответы на вопросы анкеты обрабатываются в режиме реального времени для расчета вашего балла и не сохраняются без вашего явного согласия. Если вы предоставляете свой адрес электронной почты: он используется исключительно для отправки вашего PDF-отчета и, с вашего согласия, для коммуникаций, связанных с ACF®." },
      { title: "Контактная форма", text: "Информация, введенная в контактную форму (имя, электронная почта, компания, сообщение), используется исключительно для ответа на ваш запрос. Она не перепродается и не передается третьим лицам." },
      { title: "Файлы cookie", text: "Сайт использует технические cookie-файлы, необходимые для его работы. Рекламные или отслеживающие cookie-файлы третьих сторон не используются. Аналитические cookie-файлы (если включены) анонимизированы и используются исключительно для улучшения пользовательского опыта." },
      { title: "Хостинг данных", text: "Данные размещаются на серверах Vercel Inc. (США) в рамках Соглашения о конфиденциальности данных ЕС-США. Vercel соблюдает применимые стандарты защиты данных." },
      { title: "Ваши права (GDPR)", text: "В соответствии с Общим регламентом по защите данных (GDPR) вы имеете право на доступ, исправление, удаление, ограничение обработки, переносимость данных и возражение в отношении ваших персональных данных. Для реализации этих прав свяжитесь с нами через страницу Контактов, указав суть вашего запроса. Вы также имеете право подать жалобу в CNIL (Национальная комиссия по информатике и свободам Франции)." },
      { title: "Хранение данных", text: "Персональные данные хранятся в течение периода, строго необходимого для целей их обработки. Данные контактной формы хранятся не более 12 месяцев. Диагностические данные не хранятся без явного согласия." },
    ]
  },
  {
    id: "cookies",
    label: "Политика cookie",
    content: [
      { title: "Что такое cookie?", text: "Cookie — это небольшой текстовый файл, сохраняемый на вашем устройстве (компьютере, планшете, смартфоне) при посещении веб-сайта. Он позволяет сайту запоминать информацию о вашем посещении." },
      { title: "Используемые cookie", text: "Сайт использует исключительно технические cookie-файлы, необходимые для работы сайта (управление сессией, языковые настройки, отображение). Эти cookie не требуют вашего предварительного согласия, поскольку они строго необходимы для предоставления сервиса." },
      { title: "Аналитические cookie", text: "Если будут внедрены аналитические инструменты, они будут использовать анонимизированные данные и не позволят идентифицировать личность. Вы будете проинформированы, и ваше согласие будет получено до активации этих cookie." },
      { title: "Cookie третьих сторон", text: "Сайт не использует рекламные cookie или cookie социальных сетей. Никакие данные не передаются рекламным платформам." },
      { title: "Управление cookie", text: "Вы можете управлять своими настройками cookie в любое время через настройки вашего браузера. Отключение определенных cookie может повлиять на ваш опыт просмотра." },
    ]
  },
];

const sections_ar: Section[] = [
  {
    id: "mentions",
    label: "إشعار قانوني",
    content: [
      { title: "ناشر الموقع", text: "الموقع acfstandard.vercel.app يُنشر بواسطة AI CONSULTING، شركة مساهمة مبسطة (SASU) برأسمال متغير، مقرها الرئيسي في 38 Bis Boulevard Victor Hugo, 06000 نيس، فرنسا. سجل تجاري نيس: 909116329. رقم ضريبة القيمة المضافة داخل الاتحاد الأوروبي: FR96909116329. مدير النشر: Vincent DORANGE." },
      { title: "الاستضافة", text: "الموقع مستضاف لدى Vercel Inc.، 340 S Lemon Ave #4133, Walnut, CA 91789، الولايات المتحدة الأمريكية. الموقع: vercel.com." },
      { title: "الملكية الفكرية", text: "جميع المحتويات الموجودة على هذا الموقع (النصوص، الرسومات، الشعارات، الأيقونات، الصور، المنهجيات، الأطر) هي ملكية حصرية لـ AI CONSULTING أو مستخدمة بموجب ترخيص. 'Agentic Commerce Framework®' و'ACF®' هي علامات تجارية مسجلة. يُحظر أي نسخ أو تمثيل أو تعديل أو نشر أو تكييف لكل أو جزء من عناصر الموقع دون إذن كتابي مسبق." },
      { title: "مبتكر الإطار", text: "Agentic Commerce Framework® (ACF®) هو منهجية خاصة صممها وطورها Vincent DORANGE. جميع الحقوق محفوظة." },
      { title: "الاتصال", text: "لأي استفسار يتعلق بالإشعار القانوني، يمكنكم التواصل معنا عبر صفحة الاتصال على الموقع أو بالبريد إلى عنوان المقر الرئيسي." },
    ]
  },
  {
    id: "cgu",
    label: "شروط الاستخدام",
    content: [
      { title: "الغرض", text: "تحدد شروط الاستخدام العامة هذه الشروط والأحكام للوصول إلى موقع acfstandard.vercel.app واستخدامه وخدماته المرتبطة، بما في ذلك تشخيص ACF Score® والمعلومات المتعلقة بـ Agentic Commerce Framework®." },
      { title: "الوصول إلى الموقع", text: "الوصول إلى الموقع مجاني. تشخيص ACF Score® متاح دون تسجيل ودون تكلفة. قد تخضع بعض الخدمات المميزة (ACF Control، الشهادة، الدعم) لشروط خاصة وأسعار محددة يتم إبلاغها عند الاشتراك." },
      { title: "استخدام ACF Score®", text: "ACF Score® هو أداة تشخيص إرشادية. لا يشكل تدقيقاً تنظيمياً أو شهادة رسمية أو استشارة قانونية. يتم تقديم النتائج والتوصيات لأغراض إعلامية فقط ولا تُلزم AI CONSULTING بأي مسؤولية. المستخدم هو المسؤول الوحيد عن تفسير وتنفيذ التوصيات." },
      { title: "الملكية الفكرية", text: "منهجية ACF®، وخوارزميات التسجيل، وهيكل الإطار المكون من 4 طبقات، وجميع المخرجات المرتبطة بها محمية بموجب قانون الملكية الفكرية. أي استخدام تجاري غير مصرح به محظور تماماً." },
      { title: "المسؤولية", text: "تسعى AI CONSULTING لتقديم معلومات دقيقة ومحدثة. ومع ذلك، لا تضمن AI CONSULTING دقة أو اكتمال أو حداثة المعلومات المنشورة على الموقع. لا تتحمل AI CONSULTING المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو عدم القدرة على الوصول إليه." },
      { title: "تعديل الشروط", text: "تحتفظ AI CONSULTING بالحق في تعديل هذه الشروط في أي وقت. تسري التعديلات اعتباراً من نشرها على الموقع. يُعتبر الاستمرار في استخدام الموقع بعد نشر التعديلات قبولاً للشروط الجديدة." },
    ]
  },
  {
    id: "confidentialite",
    label: "سياسة الخصوصية",
    content: [
      { title: "مسؤول البيانات", text: "مسؤول معالجة البيانات الشخصية هو AI CONSULTING، SASU، 38 Bis Boulevard Victor Hugo, 06000 نيس، فرنسا. الاتصال: عبر صفحة الاتصال على الموقع." },
      { title: "البيانات المجمعة", text: "لتشخيص ACF Score®: تتم معالجة إجابات الاستبيان في الوقت الفعلي لحساب درجتك ولا يتم تخزينها دون موافقتك الصريحة. إذا قدمت عنوان بريدك الإلكتروني: يُستخدم فقط لإرسال تقرير PDF الخاص بك وبموافقتك للاتصالات المتعلقة بـ ACF®." },
      { title: "نموذج الاتصال", text: "المعلومات المُدخلة في نموذج الاتصال (الاسم، البريد الإلكتروني، الشركة، الرسالة) تُستخدم حصرياً للرد على طلبكم. لا يتم إعادة بيعها أو مشاركتها مع أطراف ثالثة." },
      { title: "ملفات تعريف الارتباط", text: "يستخدم الموقع ملفات تعريف ارتباط تقنية ضرورية لتشغيله. لا تُستخدم ملفات تعريف ارتباط إعلانية أو تتبع من أطراف ثالثة. ملفات تعريف الارتباط التحليلية (إذا كانت مفعلة) مجهولة الهوية وتُستخدم فقط لتحسين تجربة المستخدم." },
      { title: "استضافة البيانات", text: "تتم استضافة البيانات بواسطة Vercel Inc. (الولايات المتحدة) بموجب إطار خصوصية البيانات بين الاتحاد الأوروبي والولايات المتحدة. تلتزم Vercel بمعايير حماية البيانات المعمول بها." },
      { title: "حقوقكم (GDPR)", text: "وفقاً للائحة العامة لحماية البيانات (GDPR)، لديكم الحق في الوصول والتصحيح والمحو وتقييد المعالجة ونقل البيانات والاعتراض فيما يتعلق ببياناتكم الشخصية. لممارسة هذه الحقوق، تواصلوا معنا عبر صفحة الاتصال مع تحديد طلبكم. لديكم أيضاً الحق في تقديم شكوى لدى CNIL (الهيئة الوطنية الفرنسية للمعلوماتية والحريات)." },
      { title: "الاحتفاظ بالبيانات", text: "يتم الاحتفاظ بالبيانات الشخصية خلال الفترة اللازمة تماماً للأغراض التي تتم معالجتها من أجلها. يتم الاحتفاظ ببيانات نموذج الاتصال لمدة أقصاها 12 شهراً. لا يتم الاحتفاظ ببيانات التشخيص دون موافقة صريحة." },
    ]
  },
  {
    id: "cookies",
    label: "سياسة ملفات تعريف الارتباط",
    content: [
      { title: "ما هو ملف تعريف الارتباط؟", text: "ملف تعريف الارتباط هو ملف نصي صغير يُخزن على جهازكم (حاسوب، جهاز لوحي، هاتف ذكي) عند زيارة موقع ويب. يسمح للموقع بتذكر معلومات حول زيارتكم." },
      { title: "ملفات تعريف الارتباط المستخدمة", text: "يستخدم الموقع حصرياً ملفات تعريف ارتباط تقنية أساسية لتشغيل الموقع (إدارة الجلسة، تفضيلات اللغة، العرض). لا تتطلب هذه الملفات موافقتكم المسبقة لأنها ضرورية تماماً لتقديم الخدمة." },
      { title: "ملفات تعريف الارتباط التحليلية", text: "إذا تم تطبيق أدوات تحليلية، فستستخدم بيانات مجهولة الهوية ولن تسمح بالتعرف على الهوية الشخصية. سيتم إبلاغكم وطلب موافقتكم قبل تفعيل هذه الملفات." },
      { title: "ملفات تعريف ارتباط الأطراف الثالثة", text: "لا يستخدم الموقع أي ملفات تعريف ارتباط إعلانية أو ملفات وسائل التواصل الاجتماعي. لا تتم مشاركة أي بيانات مع منصات إعلانية." },
      { title: "إدارة ملفات تعريف الارتباط", text: "يمكنكم إدارة تفضيلات ملفات تعريف الارتباط في أي وقت عبر إعدادات متصفحكم. قد يؤثر تعطيل بعض ملفات تعريف الارتباط على تجربة التصفح لديكم." },
    ]
  },
];

const sections_tr: Section[] = [
  {
    id: "mentions",
    label: "Yasal bildirim",
    content: [
      { title: "Site yayıncısı", text: "acfstandard.vercel.app web sitesi, merkezi 38 Bis Boulevard Victor Hugo, 06000 Nice, Fransa adresinde bulunan değişken sermayeli basitleştirilmiş anonim şirket (SASU) AI CONSULTING tarafından yayınlanmaktadır. RCS Nice kayıt numarası: 909116329. Topluluk içi KDV numarası: FR96909116329. Yayın direktörü: Vincent DORANGE." },
      { title: "Barındırma", text: "Web sitesi Vercel Inc. tarafından barındırılmaktadır. Adres: 340 S Lemon Ave #4133, Walnut, CA 91789, Amerika Birleşik Devletleri. Web sitesi: vercel.com." },
      { title: "Fikri mülkiyet", text: "Bu web sitesindeki tüm içerikler (metinler, grafikler, logolar, simgeler, görseller, metodolojiler, çerçeveler) AI CONSULTING'in münhasır mülkiyetindedir veya lisans altında kullanılmaktadır. 'Agentic Commerce Framework®' ve 'ACF®' tescilli markalardır. Web sitesi öğelerinin tamamının veya bir bölümünün önceden yazılı izin alınmadan çoğaltılması, temsil edilmesi, değiştirilmesi, yayınlanması veya uyarlanması yasaktır." },
      { title: "Çerçeve yaratıcısı", text: "Agentic Commerce Framework® (ACF®), Vincent DORANGE tarafından tasarlanmış ve geliştirilmiş tescilli bir metodolojidir. Tüm hakları saklıdır." },
      { title: "İletişim", text: "Yasal bildirim ile ilgili herhangi bir sorunuz için, sitenin İletişim sayfası aracılığıyla veya kayıtlı ofis adresine posta yoluyla bizimle iletişime geçebilirsiniz." },
    ]
  },
  {
    id: "cgu",
    label: "Kullanım koşulları",
    content: [
      { title: "Amaç", text: "Bu Genel Kullanım Koşulları, acfstandard.vercel.app web sitesine ve ACF Score® teşhisi ile Agentic Commerce Framework® ile ilgili bilgiler dahil olmak üzere ilişkili hizmetlerine erişim ve kullanım koşullarını tanımlar." },
      { title: "Web sitesine erişim", text: "Web sitesine erişim ücretsizdir. ACF Score® teşhisi kayıt gerektirmeden ve ücretsiz olarak erişilebilir. Bazı premium hizmetler (ACF Control, Sertifikasyon, Destek) abonelik sırasında bildirilen özel koşullara ve fiyatlandırmaya tabi olabilir." },
      { title: "ACF Score® kullanımı", text: "ACF Score® gösterge niteliğinde bir teşhis aracıdır. Düzenleyici denetim, resmi sertifikasyon veya hukuki danışmanlık teşkil etmez. Sonuçlar ve öneriler yalnızca bilgilendirme amacıyla sunulur ve AI CONSULTING'in sorumluluğunu doğurmaz. Kullanıcılar önerilerin yorumlanması ve uygulanmasından tek başına sorumludur." },
      { title: "Fikri mülkiyet", text: "ACF® metodolojisi, puanlama algoritmaları, 4 katmanlı çerçeve yapısı ve tüm ilişkili çıktılar fikri mülkiyet hukuku tarafından korunmaktadır. Yetkisiz herhangi bir ticari kullanım kesinlikle yasaktır." },
      { title: "Sorumluluk", text: "AI CONSULTING doğru ve güncel bilgiler sunmak için çaba göstermektedir. Ancak AI CONSULTING, web sitesinde yayınlanan bilgilerin doğruluğunu, eksiksizliğini veya güncelliğini garanti etmemektedir. AI CONSULTING, web sitesinin kullanımından veya erişilememesinden kaynaklanan doğrudan veya dolaylı zararlardan sorumlu tutulamaz." },
      { title: "Koşulların değiştirilmesi", text: "AI CONSULTING bu koşulları herhangi bir zamanda değiştirme hakkını saklı tutar. Değişiklikler web sitesinde yayınlandığı anda yürürlüğe girer. Değişikliklerin yayınlanmasından sonra web sitesinin kullanılmaya devam edilmesi yeni koşulların kabul edildiği anlamına gelir." },
    ]
  },
  {
    id: "confidentialite",
    label: "Gizlilik politikası",
    content: [
      { title: "Veri sorumlusu", text: "Kişisel verilerin sorumlusu AI CONSULTING, SASU, 38 Bis Boulevard Victor Hugo, 06000 Nice, Fransa'dır. İletişim: sitenin İletişim sayfası aracılığıyla." },
      { title: "Toplanan veriler", text: "ACF Score® teşhisi için: anket yanıtları puanınızı hesaplamak için gerçek zamanlı olarak işlenir ve açık onayınız olmadan saklanmaz. E-posta adresinizi sağlarsanız: yalnızca PDF raporunuzun gönderilmesi ve onayınızla ACF® ile ilgili iletişimler için kullanılır." },
      { title: "İletişim formu", text: "İletişim formuna girilen bilgiler (isim, e-posta, şirket, mesaj) yalnızca talebinize yanıt vermek için kullanılır. Üçüncü taraflara satılmaz veya paylaşılmaz." },
      { title: "Çerezler", text: "Web sitesi, çalışması için gerekli teknik çerezleri kullanmaktadır. Reklam veya üçüncü taraf izleme çerezleri kullanılmamaktadır. Analitik çerezler (etkinleştirilmişse) anonimleştirilmiştir ve yalnızca kullanıcı deneyimini iyileştirmek için kullanılır." },
      { title: "Veri barındırma", text: "Veriler, AB-ABD Veri Gizliliği Çerçevesi kapsamında Vercel Inc. (Amerika Birleşik Devletleri) tarafından barındırılmaktadır. Vercel, geçerli veri koruma standartlarına uygundur." },
      { title: "Haklarınız (GDPR)", text: "Genel Veri Koruma Yönetmeliği (GDPR) uyarınca, kişisel verilerinizle ilgili erişim, düzeltme, silme, işleme kısıtlama, veri taşınabilirliği ve itiraz haklarınız bulunmaktadır. Bu hakları kullanmak için talebinizi belirterek İletişim sayfası aracılığıyla bizimle iletişime geçin. Ayrıca CNIL'e (Fransa Ulusal Bilişim ve Özgürlükler Komisyonu) şikayette bulunma hakkınız da bulunmaktadır." },
      { title: "Veri saklama", text: "Kişisel veriler, işlendikleri amaçlar için kesinlikle gerekli olan süre boyunca saklanır. İletişim formu verileri en fazla 12 ay süreyle saklanır. Teşhis verileri açık onay olmadan saklanmaz." },
    ]
  },
  {
    id: "cookies",
    label: "Çerez politikası",
    content: [
      { title: "Çerez nedir?", text: "Çerez, bir web sitesini ziyaret ettiğinizde cihazınızda (bilgisayar, tablet, akıllı telefon) saklanan küçük bir metin dosyasıdır. Web sitesinin ziyaretiniz hakkındaki bilgileri hatırlamasını sağlar." },
      { title: "Kullanılan çerezler", text: "Web sitesi yalnızca site çalışması için gerekli olan temel teknik çerezleri kullanmaktadır (oturum yönetimi, dil tercihleri, görüntüleme). Bu çerezler hizmetin sağlanması için kesinlikle gerekli olduğundan önceden onayınızı gerektirmez." },
      { title: "Analitik çerezler", text: "Analitik araçlar uygulanırsa, anonimleştirilmiş veriler kullanacak ve kişisel tanımlamaya izin vermeyecektir. Bu çerezler etkinleştirilmeden önce bilgilendirilecek ve onayınız alınacaktır." },
      { title: "Üçüncü taraf çerezleri", text: "Web sitesi herhangi bir reklam çerezi veya sosyal medya çerezi kullanmamaktadır. Reklam platformlarıyla hiçbir veri paylaşılmamaktadır." },
      { title: "Çerez yönetimi", text: "Çerez tercihlerinizi tarayıcı ayarlarınız aracılığıyla istediğiniz zaman yönetebilirsiniz. Belirli çerezlerin devre dışı bırakılması tarama deneyiminizi etkileyebilir." },
    ]
  },
];

const ui = {
  fr: {
    heroTitle: "Informations",
    heroHighlight: "légales",
    heroSubtitle: "Mentions légales, conditions d'utilisation, politique de confidentialité et cookies.",
    lastUpdate: "Dernière mise à jour : Mars 2026",
    contactTitle: "Une question sur vos droits ou nos conditions ?",
    contactText: "Contactez-nous via notre",
    contactLink: "formulaire de contact",
    contactAfter: "ou par courrier au siège social : 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
  en: {
    heroTitle: "Legal",
    heroHighlight: "Information",
    heroSubtitle: "Legal notice, terms of use, privacy policy, and cookies.",
    lastUpdate: "Last updated: March 2026",
    contactTitle: "Questions about your rights or our terms?",
    contactText: "Contact us via our",
    contactLink: "contact form",
    contactAfter: "or by mail to our registered office: 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
  es: {
    heroTitle: "Información",
    heroHighlight: "legal",
    heroSubtitle: "Aviso legal, condiciones de uso, política de privacidad y cookies.",
    lastUpdate: "Última actualización: Marzo 2026",
    contactTitle: "¿Preguntas sobre sus derechos o nuestras condiciones?",
    contactText: "Contáctenos a través de nuestro",
    contactLink: "formulario de contacto",
    contactAfter: "o por correo postal a nuestra sede: 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
  de: {
    heroTitle: "Rechtliche",
    heroHighlight: "Informationen",
    heroSubtitle: "Impressum, Nutzungsbedingungen, Datenschutzrichtlinie und Cookies.",
    lastUpdate: "Letzte Aktualisierung: März 2026",
    contactTitle: "Fragen zu Ihren Rechten oder unseren Bedingungen?",
    contactText: "Kontaktieren Sie uns über unser",
    contactLink: "Kontaktformular",
    contactAfter: "oder per Post an unseren Firmensitz: 38 Bis Bd Victor Hugo, 06000 Nizza.",
  },
  pt: {
    heroTitle: "Informações",
    heroHighlight: "legais",
    heroSubtitle: "Aviso legal, condições de utilização, política de privacidade e cookies.",
    lastUpdate: "Última atualização: Março 2026",
    contactTitle: "Questões sobre os seus direitos ou as nossas condições?",
    contactText: "Contacte-nos através do nosso",
    contactLink: "formulário de contacto",
    contactAfter: "ou por correio para a nossa sede: 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
  ja: {
    heroTitle: "法的",
    heroHighlight: "情報",
    heroSubtitle: "法的通知、利用規約、プライバシーポリシー、Cookie。",
    lastUpdate: "最終更新：2026年3月",
    contactTitle: "お客様の権利や当社の規約についてご質問がありますか？",
    contactText: "お問い合わせは",
    contactLink: "お問い合わせフォーム",
    contactAfter: "または本社宛郵送にて：38 Bis Bd Victor Hugo, 06000 Nice。",
  },
  zh: {
    heroTitle: "法律",
    heroHighlight: "信息",
    heroSubtitle: "法律声明、使用条款、隐私政策和Cookie。",
    lastUpdate: "最后更新：2026年3月",
    contactTitle: "对您的权利或我们的条款有疑问？",
    contactText: "通过我们的",
    contactLink: "联系表单",
    contactAfter: "或邮寄至我们的注册办公地址与我们联系：38 Bis Bd Victor Hugo, 06000 Nice。",
  },
  ko: {
    heroTitle: "법적",
    heroHighlight: "정보",
    heroSubtitle: "법적 고지, 이용 약관, 개인정보 보호정책 및 쿠키.",
    lastUpdate: "최종 업데이트: 2026년 3월",
    contactTitle: "귀하의 권리나 당사 약관에 대해 궁금하신 점이 있으신가요?",
    contactText: "당사",
    contactLink: "문의 양식",
    contactAfter: "을 통해 또는 본사 주소로 우편을 보내 문의하세요: 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
  it: {
    heroTitle: "Informazioni",
    heroHighlight: "legali",
    heroSubtitle: "Note legali, condizioni d'uso, informativa sulla privacy e cookie.",
    lastUpdate: "Ultimo aggiornamento: Marzo 2026",
    contactTitle: "Domande sui vostri diritti o sulle nostre condizioni?",
    contactText: "Contattateci tramite il nostro",
    contactLink: "modulo di contatto",
    contactAfter: "o per posta alla nostra sede legale: 38 Bis Bd Victor Hugo, 06000 Nizza.",
  },
  nl: {
    heroTitle: "Juridische",
    heroHighlight: "informatie",
    heroSubtitle: "Juridische kennisgeving, gebruiksvoorwaarden, privacybeleid en cookies.",
    lastUpdate: "Laatst bijgewerkt: Maart 2026",
    contactTitle: "Vragen over uw rechten of onze voorwaarden?",
    contactText: "Neem contact met ons op via ons",
    contactLink: "contactformulier",
    contactAfter: "of per post naar ons kantoor: 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
  ru: {
    heroTitle: "Юридическая",
    heroHighlight: "информация",
    heroSubtitle: "Юридическая информация, условия использования, политика конфиденциальности и cookie.",
    lastUpdate: "Последнее обновление: Март 2026",
    contactTitle: "Вопросы о ваших правах или наших условиях?",
    contactText: "Свяжитесь с нами через нашу",
    contactLink: "контактную форму",
    contactAfter: "или по почте на адрес нашего офиса: 38 Bis Bd Victor Hugo, 06000 Ницца.",
  },
  ar: {
    heroTitle: "معلومات",
    heroHighlight: "قانونية",
    heroSubtitle: "إشعار قانوني، شروط الاستخدام، سياسة الخصوصية وملفات تعريف الارتباط.",
    lastUpdate: "آخر تحديث: مارس 2026",
    contactTitle: "أسئلة حول حقوقكم أو شروطنا؟",
    contactText: "تواصلوا معنا عبر",
    contactLink: "نموذج الاتصال",
    contactAfter: "أو عبر البريد إلى مقرنا الرئيسي: 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
  tr: {
    heroTitle: "Yasal",
    heroHighlight: "Bilgiler",
    heroSubtitle: "Yasal bildirim, kullanım koşulları, gizlilik politikası ve çerezler.",
    lastUpdate: "Son güncelleme: Mart 2026",
    contactTitle: "Haklarınız veya koşullarımız hakkında sorularınız mı var?",
    contactText: "Bizimle",
    contactLink: "iletişim formu",
    contactAfter: "aracılığıyla veya kayıtlı ofis adresimize posta yoluyla iletişime geçin: 38 Bis Bd Victor Hugo, 06000 Nice.",
  },
};

export default function LegalPage() {
  const locale = useLocale();
  const lang = (ui as any)[locale] ? locale : "en";
  const t = (ui as any)[lang];
  const sectionsMap: Record<string, Section[]> = {
    fr: sections_fr, en: sections_en, es: sections_es, de: sections_de,
    pt: sections_pt, ja: sections_ja, zh: sections_zh, ko: sections_ko,
    it: sections_it, nl: sections_nl, ru: sections_ru, ar: sections_ar, tr: sections_tr,
  };
  const sections = sectionsMap[lang] || sections_en;
  const [activeTab, setActiveTab] = useState("mentions");

  const activeSection = sections.find(s => s.id === activeTab)!;

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{opacity:0;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards;animation-delay:.1s}
        .gold-glow:hover{box-shadow:0 0 20px rgba(201,168,76,.2)}
        *{box-sizing:border-box;margin:0;padding:0}a{text-decoration:none;color:inherit}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href={`/${locale}/`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>LEGAL</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{"\u2190 Home"}</a>
            <a href="https://www.acf-score.com/" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>Get Your Score {"\u2192"}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div className="fade-up"><Badge>LEGAL</Badge></div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginTop: 24, marginBottom: 14, letterSpacing: "-1px" }}>
            {t.heroTitle} <span style={{ color: C.gold }}>{t.heroHighlight}</span>
          </h1>
          <p style={{ fontSize: 15, color: C.gray2, lineHeight: 1.7 }}>
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>

          {/* TABS */}
          <div style={{ display: "flex", gap: 0, border: `1px solid ${C.goldBorder}`, borderRadius: 10, overflow: "hidden", marginBottom: 40, background: C.navy2 }}>
            {sections.map((s: any) => (
              <button key={s.id} onClick={() => setActiveTab(s.id)} style={{
                flex: 1, padding: "14px 16px", background: activeTab === s.id ? C.goldDim : "transparent",
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                color: activeTab === s.id ? C.gold : C.gray,
                fontFamily: "'Space Grotesk', sans-serif", letterSpacing: ".02em",
                borderRight: `1px solid rgba(201,168,76,.12)`, transition: "all .2s",
                display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
              }}
                onMouseEnter={e => { if (activeTab !== s.id) { e.currentTarget.style.color = C.gold; e.currentTarget.style.background = "rgba(201,168,76,.05)"; } }}
                onMouseLeave={e => { if (activeTab !== s.id) { e.currentTarget.style.color = C.gray; e.currentTarget.style.background = "transparent"; } }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div style={{ background: C.navy2, border: `1px solid ${C.goldBorder}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "20px 28px 18px", borderBottom: `1px solid rgba(201,168,76,.12)` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: ".1em", textTransform: "uppercase" }}>{activeSection.label}</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{t.lastUpdate}</div>
            </div>
            <div style={{ padding: "28px 28px 36px" }}>
              {activeSection.content.map((block: any, i: number) => (
                <div key={i} style={{ marginBottom: i < activeSection.content.length - 1 ? 28 : 0 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
                    {block.title}
                  </h3>
                  <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.8, paddingLeft: 16 }}>{block.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT NOTE */}
          <div style={{ marginTop: 32, padding: 28, background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>{"\uD83D\uDCEC"}</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{t.contactTitle}</div>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>
                {t.contactText} <a href={`/${locale}/contact`} style={{ color: C.gold, textDecoration: "underline" }}>{t.contactLink}</a> {t.contactAfter}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAgent />
    </div>
  );
}
