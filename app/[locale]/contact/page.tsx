"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import Footer from "../components/Footer";
import AIAgent from "../components/AIAgent";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACF CONTACT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)", green: "#22c55e",
};

function GoldBar() { return <div style={{ width: 44, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)`, borderRadius: 2, margin: "0 auto 16px" }} />; }
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12 }}>// {children}</div>;
}
function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", background: C.goldDim, border: `1px solid ${C.goldBorder}`, padding: "5px 14px", borderRadius: 100, display: "inline-block" }}>{children}</span>;
}

const ui = {
  en: {
    navSubtext: "CONTACT",
    navHome: "← Home",
    navCta: "Get Your Score →",
    heroBadge: "GET IN TOUCH",
    heroTitle1: "Let's talk ",
    heroTitle2: "governance",
    heroDesc: "Whether you need an assessment, want to become a partner, or have questions about the framework — we're here.",
    formTitle: "Send us a message",
    formSubtitle: "We typically respond within 24 business hours.",
    labelFirstName: "First Name",
    labelLastName: "Last Name",
    labelEmail: "Email",
    labelCompany: "Company",
    labelSubject: "Subject",
    labelMessage: "Message",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "you@company.com",
    placeholderCompany: "Your organization",
    placeholderSubject: "Select a topic...",
    placeholderMessage: "Tell us how we can help...",
    subjectOptions: [
      { value: "demo", label: "Request a Demo" },
      { value: "assessment", label: "Request an Assessment" },
      { value: "partnership", label: "Partnership Inquiry" },
      { value: "certification", label: "Certification Question" },
      { value: "enterprise", label: "Enterprise / ACF Control" },
      { value: "media", label: "Press / Media" },
      { value: "other", label: "Other" },
    ],
    sendBtn: "Send Message →",
    sentTitle: "Message Sent!",
    sentDesc1: "Thank you for reaching out. Our team will get back to you within ",
    sentDesc2: "24 business hours",
    orgLabel: "Organization",
    orgDesc: "Strategic partner of the Agentic Commerce Framework®",
    quickActionsLabel: "Quick Actions",
    quickAction1: "Get your free ACF Score®",
    quickAction2: "View certification programs",
    quickAction3: "Become a partner",
    quickAction4: "Read the standard",
  },
  fr: {
    navSubtext: "CONTACT",
    navHome: "← Accueil",
    navCta: "Votre Score →",
    heroBadge: "NOUS CONTACTER",
    heroTitle1: "Parlons ",
    heroTitle2: "gouvernance",
    heroDesc: "Que vous ayez besoin d'une évaluation, souhaitiez devenir partenaire ou ayez des questions sur le framework — nous sommes là.",
    formTitle: "Envoyez-nous un message",
    formSubtitle: "Nous répondons généralement sous 24 heures ouvrées.",
    labelFirstName: "Prénom",
    labelLastName: "Nom",
    labelEmail: "Email",
    labelCompany: "Entreprise",
    labelSubject: "Sujet",
    labelMessage: "Message",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "vous@entreprise.com",
    placeholderCompany: "Votre organisation",
    placeholderSubject: "Sélectionnez un sujet...",
    placeholderMessage: "Dites-nous comment nous pouvons vous aider...",
    subjectOptions: [
      { value: "demo", label: "Demander une démo" },
      { value: "assessment", label: "Demander une évaluation" },
      { value: "partnership", label: "Demande de partenariat" },
      { value: "certification", label: "Question sur la certification" },
      { value: "enterprise", label: "Entreprise / ACF Control" },
      { value: "media", label: "Presse / Médias" },
      { value: "other", label: "Autre" },
    ],
    sendBtn: "Envoyer le message →",
    sentTitle: "Message envoyé !",
    sentDesc1: "Merci de nous avoir contactés. Notre équipe vous répondra sous ",
    sentDesc2: "24 heures ouvrées",
    orgLabel: "Organisation",
    orgDesc: "Partenaire stratégique de l'Agentic Commerce Framework®",
    quickActionsLabel: "Actions rapides",
    quickAction1: "Obtenez votre ACF Score® gratuit",
    quickAction2: "Voir les programmes de certification",
    quickAction3: "Devenir partenaire",
    quickAction4: "Lire le standard",
  },
  es: {
    navSubtext: "CONTACTO",
    navHome: "← Inicio",
    navCta: "Su Puntuación →",
    heroBadge: "CONTÁCTENOS",
    heroTitle1: "Hablemos de ",
    heroTitle2: "gobernanza",
    heroDesc: "Ya sea que necesite una evaluación, desee convertirse en socio o tenga preguntas sobre el framework — estamos aquí.",
    formTitle: "Envíenos un mensaje",
    formSubtitle: "Normalmente respondemos en 24 horas hábiles.",
    labelFirstName: "Nombre",
    labelLastName: "Apellido",
    labelEmail: "Correo electrónico",
    labelCompany: "Empresa",
    labelSubject: "Asunto",
    labelMessage: "Mensaje",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "usted@empresa.com",
    placeholderCompany: "Su organización",
    placeholderSubject: "Seleccione un tema...",
    placeholderMessage: "Cuéntenos cómo podemos ayudarle...",
    subjectOptions: [
      { value: "demo", label: "Solicitar una demostración" },
      { value: "assessment", label: "Solicitar una evaluación" },
      { value: "partnership", label: "Consulta de asociación" },
      { value: "certification", label: "Pregunta sobre certificación" },
      { value: "enterprise", label: "Empresa / ACF Control" },
      { value: "media", label: "Prensa / Medios" },
      { value: "other", label: "Otro" },
    ],
    sendBtn: "Enviar mensaje →",
    sentTitle: "¡Mensaje enviado!",
    sentDesc1: "Gracias por contactarnos. Nuestro equipo le responderá en ",
    sentDesc2: "24 horas hábiles",
    orgLabel: "Organización",
    orgDesc: "Socio estratégico del Agentic Commerce Framework®",
    quickActionsLabel: "Acciones rápidas",
    quickAction1: "Obtenga su ACF Score® gratuito",
    quickAction2: "Ver programas de certificación",
    quickAction3: "Convertirse en socio",
    quickAction4: "Leer el estándar",
  },
  de: {
    navSubtext: "KONTAKT",
    navHome: "← Startseite",
    navCta: "Ihr Score →",
    heroBadge: "KONTAKTIEREN SIE UNS",
    heroTitle1: "Sprechen wir über ",
    heroTitle2: "Governance",
    heroDesc: "Ob Sie eine Bewertung benötigen, Partner werden möchten oder Fragen zum Framework haben — wir sind für Sie da.",
    formTitle: "Senden Sie uns eine Nachricht",
    formSubtitle: "Wir antworten in der Regel innerhalb von 24 Geschäftsstunden.",
    labelFirstName: "Vorname",
    labelLastName: "Nachname",
    labelEmail: "E-Mail",
    labelCompany: "Unternehmen",
    labelSubject: "Betreff",
    labelMessage: "Nachricht",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "sie@unternehmen.com",
    placeholderCompany: "Ihre Organisation",
    placeholderSubject: "Thema auswählen...",
    placeholderMessage: "Teilen Sie uns mit, wie wir helfen können...",
    subjectOptions: [
      { value: "demo", label: "Demo anfordern" },
      { value: "assessment", label: "Bewertung anfordern" },
      { value: "partnership", label: "Partnerschaftsanfrage" },
      { value: "certification", label: "Frage zur Zertifizierung" },
      { value: "enterprise", label: "Unternehmen / ACF Control" },
      { value: "media", label: "Presse / Medien" },
      { value: "other", label: "Sonstiges" },
    ],
    sendBtn: "Nachricht senden →",
    sentTitle: "Nachricht gesendet!",
    sentDesc1: "Vielen Dank für Ihre Kontaktaufnahme. Unser Team wird sich innerhalb von ",
    sentDesc2: "24 Geschäftsstunden",
    orgLabel: "Organisation",
    orgDesc: "Strategischer Partner des Agentic Commerce Framework®",
    quickActionsLabel: "Schnellaktionen",
    quickAction1: "Holen Sie sich Ihren kostenlosen ACF Score®",
    quickAction2: "Zertifizierungsprogramme ansehen",
    quickAction3: "Partner werden",
    quickAction4: "Den Standard lesen",
  },
  pt: {
    navSubtext: "CONTATO",
    navHome: "← Início",
    navCta: "Sua Pontuação →",
    heroBadge: "ENTRE EM CONTATO",
    heroTitle1: "Vamos falar sobre ",
    heroTitle2: "governança",
    heroDesc: "Se você precisa de uma avaliação, deseja se tornar parceiro ou tem perguntas sobre o framework — estamos aqui.",
    formTitle: "Envie-nos uma mensagem",
    formSubtitle: "Normalmente respondemos em 24 horas úteis.",
    labelFirstName: "Nome",
    labelLastName: "Sobrenome",
    labelEmail: "E-mail",
    labelCompany: "Empresa",
    labelSubject: "Assunto",
    labelMessage: "Mensagem",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "voce@empresa.com",
    placeholderCompany: "Sua organização",
    placeholderSubject: "Selecione um tópico...",
    placeholderMessage: "Conte-nos como podemos ajudar...",
    subjectOptions: [
      { value: "demo", label: "Solicitar uma demonstração" },
      { value: "assessment", label: "Solicitar uma avaliação" },
      { value: "partnership", label: "Consulta de parceria" },
      { value: "certification", label: "Pergunta sobre certificação" },
      { value: "enterprise", label: "Empresa / ACF Control" },
      { value: "media", label: "Imprensa / Mídia" },
      { value: "other", label: "Outro" },
    ],
    sendBtn: "Enviar mensagem →",
    sentTitle: "Mensagem enviada!",
    sentDesc1: "Obrigado por entrar em contato. Nossa equipe responderá em ",
    sentDesc2: "24 horas úteis",
    orgLabel: "Organização",
    orgDesc: "Parceiro estratégico do Agentic Commerce Framework®",
    quickActionsLabel: "Ações rápidas",
    quickAction1: "Obtenha seu ACF Score® gratuito",
    quickAction2: "Ver programas de certificação",
    quickAction3: "Tornar-se parceiro",
    quickAction4: "Ler o padrão",
  },
  ja: {
    navSubtext: "お問い合わせ",
    navHome: "← ホーム",
    navCta: "スコアを取得 →",
    heroBadge: "お問い合わせ",
    heroTitle1: "ガバナンスについて",
    heroTitle2: "話しましょう",
    heroDesc: "評価が必要な場合、パートナーになりたい場合、またはフレームワークについてご質問がある場合 — お気軽にどうぞ。",
    formTitle: "メッセージを送信",
    formSubtitle: "通常、24営業時間以内にご返信いたします。",
    labelFirstName: "名",
    labelLastName: "姓",
    labelEmail: "メールアドレス",
    labelCompany: "会社名",
    labelSubject: "件名",
    labelMessage: "メッセージ",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "you@company.com",
    placeholderCompany: "所属組織",
    placeholderSubject: "トピックを選択...",
    placeholderMessage: "ご用件をお聞かせください...",
    subjectOptions: [
      { value: "demo", label: "デモのリクエスト" },
      { value: "assessment", label: "評価のリクエスト" },
      { value: "partnership", label: "パートナーシップのお問い合わせ" },
      { value: "certification", label: "認証に関するご質問" },
      { value: "enterprise", label: "エンタープライズ / ACF Control" },
      { value: "media", label: "プレス / メディア" },
      { value: "other", label: "その他" },
    ],
    sendBtn: "メッセージを送信 →",
    sentTitle: "メッセージが送信されました！",
    sentDesc1: "お問い合わせいただきありがとうございます。チームが",
    sentDesc2: "24営業時間以内",
    orgLabel: "組織",
    orgDesc: "Agentic Commerce Framework®の戦略的パートナー",
    quickActionsLabel: "クイックアクション",
    quickAction1: "無料のACF Score®を取得",
    quickAction2: "認証プログラムを見る",
    quickAction3: "パートナーになる",
    quickAction4: "スタンダードを読む",
  },
  zh: {
    navSubtext: "联系我们",
    navHome: "← 首页",
    navCta: "获取评分 →",
    heroBadge: "联系我们",
    heroTitle1: "让我们谈谈",
    heroTitle2: "治理",
    heroDesc: "无论您需要评估、希望成为合作伙伴，还是对框架有疑问 — 我们随时为您服务。",
    formTitle: "给我们留言",
    formSubtitle: "我们通常在24个工作小时内回复。",
    labelFirstName: "名",
    labelLastName: "姓",
    labelEmail: "电子邮件",
    labelCompany: "公司",
    labelSubject: "主题",
    labelMessage: "留言",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "you@company.com",
    placeholderCompany: "您的组织",
    placeholderSubject: "选择主题...",
    placeholderMessage: "告诉我们如何为您提供帮助...",
    subjectOptions: [
      { value: "demo", label: "请求演示" },
      { value: "assessment", label: "请求评估" },
      { value: "partnership", label: "合作伙伴咨询" },
      { value: "certification", label: "认证问题" },
      { value: "enterprise", label: "企业 / ACF Control" },
      { value: "media", label: "新闻 / 媒体" },
      { value: "other", label: "其他" },
    ],
    sendBtn: "发送消息 →",
    sentTitle: "消息已发送！",
    sentDesc1: "感谢您的联系。我们的团队将在",
    sentDesc2: "24个工作小时内",
    orgLabel: "组织",
    orgDesc: "Agentic Commerce Framework®的战略合作伙伴",
    quickActionsLabel: "快捷操作",
    quickAction1: "获取免费的ACF Score®",
    quickAction2: "查看认证项目",
    quickAction3: "成为合作伙伴",
    quickAction4: "阅读标准",
  },
  ko: {
    navSubtext: "문의하기",
    navHome: "← 홈",
    navCta: "점수 확인 →",
    heroBadge: "문의하기",
    heroTitle1: "거버넌스에 대해 ",
    heroTitle2: "이야기합시다",
    heroDesc: "평가가 필요하시거나, 파트너가 되고 싶으시거나, 프레임워크에 대한 질문이 있으시면 — 저희가 도와드리겠습니다.",
    formTitle: "메시지를 보내주세요",
    formSubtitle: "일반적으로 24 영업시간 이내에 응답합니다.",
    labelFirstName: "이름",
    labelLastName: "성",
    labelEmail: "이메일",
    labelCompany: "회사",
    labelSubject: "제목",
    labelMessage: "메시지",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "you@company.com",
    placeholderCompany: "소속 조직",
    placeholderSubject: "주제를 선택하세요...",
    placeholderMessage: "어떻게 도와드릴 수 있는지 알려주세요...",
    subjectOptions: [
      { value: "demo", label: "데모 요청" },
      { value: "assessment", label: "평가 요청" },
      { value: "partnership", label: "파트너십 문의" },
      { value: "certification", label: "인증 관련 질문" },
      { value: "enterprise", label: "엔터프라이즈 / ACF Control" },
      { value: "media", label: "언론 / 미디어" },
      { value: "other", label: "기타" },
    ],
    sendBtn: "메시지 보내기 →",
    sentTitle: "메시지가 전송되었습니다!",
    sentDesc1: "연락해 주셔서 감사합니다. 저희 팀이 ",
    sentDesc2: "24 영업시간 이내",
    orgLabel: "조직",
    orgDesc: "Agentic Commerce Framework®의 전략적 파트너",
    quickActionsLabel: "빠른 작업",
    quickAction1: "무료 ACF Score® 받기",
    quickAction2: "인증 프로그램 보기",
    quickAction3: "파트너 되기",
    quickAction4: "표준 읽기",
  },
  it: {
    navSubtext: "CONTATTO",
    navHome: "← Home",
    navCta: "Il Tuo Punteggio →",
    heroBadge: "CONTATTACI",
    heroTitle1: "Parliamo di ",
    heroTitle2: "governance",
    heroDesc: "Che abbiate bisogno di una valutazione, vogliate diventare partner o abbiate domande sul framework — siamo qui.",
    formTitle: "Inviateci un messaggio",
    formSubtitle: "Rispondiamo generalmente entro 24 ore lavorative.",
    labelFirstName: "Nome",
    labelLastName: "Cognome",
    labelEmail: "Email",
    labelCompany: "Azienda",
    labelSubject: "Oggetto",
    labelMessage: "Messaggio",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "tu@azienda.com",
    placeholderCompany: "La vostra organizzazione",
    placeholderSubject: "Selezionate un argomento...",
    placeholderMessage: "Diteci come possiamo aiutarvi...",
    subjectOptions: [
      { value: "demo", label: "Richiedi una demo" },
      { value: "assessment", label: "Richiedi una valutazione" },
      { value: "partnership", label: "Richiesta di partnership" },
      { value: "certification", label: "Domanda sulla certificazione" },
      { value: "enterprise", label: "Azienda / ACF Control" },
      { value: "media", label: "Stampa / Media" },
      { value: "other", label: "Altro" },
    ],
    sendBtn: "Invia messaggio →",
    sentTitle: "Messaggio inviato!",
    sentDesc1: "Grazie per averci contattato. Il nostro team vi risponderà entro ",
    sentDesc2: "24 ore lavorative",
    orgLabel: "Organizzazione",
    orgDesc: "Partner strategico dell'Agentic Commerce Framework®",
    quickActionsLabel: "Azioni rapide",
    quickAction1: "Ottieni il tuo ACF Score® gratuito",
    quickAction2: "Visualizza i programmi di certificazione",
    quickAction3: "Diventa partner",
    quickAction4: "Leggi lo standard",
  },
  nl: {
    navSubtext: "CONTACT",
    navHome: "← Home",
    navCta: "Uw Score →",
    heroBadge: "NEEM CONTACT OP",
    heroTitle1: "Laten we praten over ",
    heroTitle2: "governance",
    heroDesc: "Of u nu een beoordeling nodig heeft, partner wilt worden of vragen heeft over het framework — wij staan voor u klaar.",
    formTitle: "Stuur ons een bericht",
    formSubtitle: "We reageren doorgaans binnen 24 werkuren.",
    labelFirstName: "Voornaam",
    labelLastName: "Achternaam",
    labelEmail: "E-mail",
    labelCompany: "Bedrijf",
    labelSubject: "Onderwerp",
    labelMessage: "Bericht",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "u@bedrijf.com",
    placeholderCompany: "Uw organisatie",
    placeholderSubject: "Selecteer een onderwerp...",
    placeholderMessage: "Vertel ons hoe we u kunnen helpen...",
    subjectOptions: [
      { value: "demo", label: "Demo aanvragen" },
      { value: "assessment", label: "Beoordeling aanvragen" },
      { value: "partnership", label: "Partnerschapsverzoek" },
      { value: "certification", label: "Vraag over certificering" },
      { value: "enterprise", label: "Enterprise / ACF Control" },
      { value: "media", label: "Pers / Media" },
      { value: "other", label: "Overig" },
    ],
    sendBtn: "Bericht versturen →",
    sentTitle: "Bericht verzonden!",
    sentDesc1: "Bedankt voor uw bericht. Ons team neemt binnen ",
    sentDesc2: "24 werkuren",
    orgLabel: "Organisatie",
    orgDesc: "Strategisch partner van het Agentic Commerce Framework®",
    quickActionsLabel: "Snelle acties",
    quickAction1: "Ontvang uw gratis ACF Score®",
    quickAction2: "Bekijk certificeringsprogramma's",
    quickAction3: "Word partner",
    quickAction4: "Lees de standaard",
  },
  ru: {
    navSubtext: "КОНТАКТЫ",
    navHome: "← Главная",
    navCta: "Ваш балл →",
    heroBadge: "СВЯЗАТЬСЯ С НАМИ",
    heroTitle1: "Давайте обсудим ",
    heroTitle2: "управление",
    heroDesc: "Если вам нужна оценка, вы хотите стать партнёром или у вас есть вопросы о фреймворке — мы здесь, чтобы помочь.",
    formTitle: "Отправьте нам сообщение",
    formSubtitle: "Обычно мы отвечаем в течение 24 рабочих часов.",
    labelFirstName: "Имя",
    labelLastName: "Фамилия",
    labelEmail: "Электронная почта",
    labelCompany: "Компания",
    labelSubject: "Тема",
    labelMessage: "Сообщение",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "you@company.com",
    placeholderCompany: "Ваша организация",
    placeholderSubject: "Выберите тему...",
    placeholderMessage: "Расскажите, чем мы можем помочь...",
    subjectOptions: [
      { value: "demo", label: "Запрос демонстрации" },
      { value: "assessment", label: "Запрос оценки" },
      { value: "partnership", label: "Запрос о партнёрстве" },
      { value: "certification", label: "Вопрос о сертификации" },
      { value: "enterprise", label: "Корпоративный / ACF Control" },
      { value: "media", label: "Пресса / СМИ" },
      { value: "other", label: "Другое" },
    ],
    sendBtn: "Отправить сообщение →",
    sentTitle: "Сообщение отправлено!",
    sentDesc1: "Спасибо за обращение. Наша команда ответит вам в течение ",
    sentDesc2: "24 рабочих часов",
    orgLabel: "Организация",
    orgDesc: "Стратегический партнёр Agentic Commerce Framework®",
    quickActionsLabel: "Быстрые действия",
    quickAction1: "Получите бесплатный ACF Score®",
    quickAction2: "Просмотреть программы сертификации",
    quickAction3: "Стать партнёром",
    quickAction4: "Читать стандарт",
  },
  ar: {
    navSubtext: "اتصل بنا",
    navHome: "← الرئيسية",
    navCta: "احصل على تقييمك →",
    heroBadge: "تواصل معنا",
    heroTitle1: "لنتحدث عن ",
    heroTitle2: "الحوكمة",
    heroDesc: "سواء كنت بحاجة إلى تقييم، أو ترغب في أن تصبح شريكًا، أو لديك أسئلة حول الإطار — نحن هنا لمساعدتك.",
    formTitle: "أرسل لنا رسالة",
    formSubtitle: "نرد عادةً خلال 24 ساعة عمل.",
    labelFirstName: "الاسم الأول",
    labelLastName: "اسم العائلة",
    labelEmail: "البريد الإلكتروني",
    labelCompany: "الشركة",
    labelSubject: "الموضوع",
    labelMessage: "الرسالة",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "you@company.com",
    placeholderCompany: "مؤسستك",
    placeholderSubject: "اختر موضوعًا...",
    placeholderMessage: "أخبرنا كيف يمكننا مساعدتك...",
    subjectOptions: [
      { value: "demo", label: "طلب عرض توضيحي" },
      { value: "assessment", label: "طلب تقييم" },
      { value: "partnership", label: "استفسار عن الشراكة" },
      { value: "certification", label: "سؤال عن الشهادة" },
      { value: "enterprise", label: "المؤسسات / ACF Control" },
      { value: "media", label: "الصحافة / الإعلام" },
      { value: "other", label: "أخرى" },
    ],
    sendBtn: "إرسال الرسالة →",
    sentTitle: "تم إرسال الرسالة!",
    sentDesc1: "شكرًا لتواصلك معنا. سيرد فريقنا خلال ",
    sentDesc2: "24 ساعة عمل",
    orgLabel: "المؤسسة",
    orgDesc: "شريك استراتيجي لـ Agentic Commerce Framework®",
    quickActionsLabel: "إجراءات سريعة",
    quickAction1: "احصل على ACF Score® المجاني",
    quickAction2: "عرض برامج الشهادات",
    quickAction3: "كن شريكًا",
    quickAction4: "اقرأ المعيار",
  },
  tr: {
    navSubtext: "İLETİŞİM",
    navHome: "← Ana Sayfa",
    navCta: "Puanınızı Alın →",
    heroBadge: "BİZE ULAŞIN",
    heroTitle1: "Yönetişim hakkında ",
    heroTitle2: "konuşalım",
    heroDesc: "Bir değerlendirmeye ihtiyacınız olsun, ortak olmak isteyin veya çerçeve hakkında sorularınız olsun — buradayız.",
    formTitle: "Bize bir mesaj gönderin",
    formSubtitle: "Genellikle 24 iş saati içinde yanıt veririz.",
    labelFirstName: "Ad",
    labelLastName: "Soyad",
    labelEmail: "E-posta",
    labelCompany: "Şirket",
    labelSubject: "Konu",
    labelMessage: "Mesaj",
    placeholderFirstName: "Vincent",
    placeholderLastName: "DORANGE",
    placeholderEmail: "siz@sirket.com",
    placeholderCompany: "Kuruluşunuz",
    placeholderSubject: "Bir konu seçin...",
    placeholderMessage: "Size nasıl yardımcı olabileceğimizi anlatın...",
    subjectOptions: [
      { value: "demo", label: "Demo talep et" },
      { value: "assessment", label: "Değerlendirme talep et" },
      { value: "partnership", label: "Ortaklık sorgusu" },
      { value: "certification", label: "Sertifikasyon sorusu" },
      { value: "enterprise", label: "Kurumsal / ACF Control" },
      { value: "media", label: "Basın / Medya" },
      { value: "other", label: "Diğer" },
    ],
    sendBtn: "Mesaj gönder →",
    sentTitle: "Mesaj gönderildi!",
    sentDesc1: "Bizimle iletişime geçtiğiniz için teşekkürler. Ekibimiz ",
    sentDesc2: "24 iş saati içinde",
    orgLabel: "Kuruluş",
    orgDesc: "Agentic Commerce Framework®'ün stratejik ortağı",
    quickActionsLabel: "Hızlı İşlemler",
    quickAction1: "Ücretsiz ACF Score® alın",
    quickAction2: "Sertifikasyon programlarını görüntüle",
    quickAction3: "Ortak olun",
    quickAction4: "Standardı okuyun",
  },
};

export default function ACFContactPage() {
  const locale = useLocale();
  const lang = (ui as any)[locale] ? locale : "en";
  const t = (ui as any)[lang];
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif",
    background: C.navy3, border: `1px solid ${C.bd1}`, color: "#fff", outline: "none", transition: "border-color .3s",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.navy1, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.1s; }
        .fade-up-d2 { opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; animation-delay:.25s; }
        .gold-glow:hover { box-shadow:0 0 20px rgba(201,168,76,.2); }
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        ::placeholder { color: ${C.gray}; opacity: 0.6; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, background: "rgba(5,12,26,.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href={`/${locale}/`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, fontWeight: 900, fontSize: 12, color: C.navy1, letterSpacing: 1 }}>ACF</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>ACF STANDARD</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.gray, letterSpacing: ".1em" }}>{t.navSubtext}</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href={`/${locale}/`} style={{ fontSize: 13, color: C.gray2, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.gold} onMouseLeave={e => (e.target as HTMLElement).style.color = C.gray2}>{t.navHome}</a>
            <a href="https://www.acf-score.com/" className="gold-glow" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, transition: "all .3s", display: "inline-block" }}>{t.navCta}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 40px" }}>
          <div className="fade-up"><Badge>{t.heroBadge}</Badge></div>
          <h1 className="fade-up-d2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, lineHeight: 1.1, marginTop: 24, marginBottom: 16, letterSpacing: "-1px" }}>
            {t.heroTitle1}<span style={{ color: C.gold }}>{t.heroTitle2}</span>
          </h1>
          <p style={{ fontSize: 16, color: C.gray2, lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "start" }}>

          {/* LEFT — FORM */}
          {!sent ? (
            <div style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 20, padding: 40 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{t.formTitle}</h2>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 28 }}>{t.formSubtitle}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>{t.labelFirstName} <span style={{ color: "#ef4444" }}>*</span></label>
                  <input type="text" placeholder={t.placeholderFirstName} style={inputStyle} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>{t.labelLastName} <span style={{ color: "#ef4444" }}>*</span></label>
                  <input type="text" placeholder={t.placeholderLastName} style={inputStyle} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>{t.labelEmail} <span style={{ color: "#ef4444" }}>*</span></label>
                <input type="email" placeholder={t.placeholderEmail} style={inputStyle} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>{t.labelCompany}</label>
                <input type="text" placeholder={t.placeholderCompany} style={inputStyle} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>{t.labelSubject} <span style={{ color: "#ef4444" }}>*</span></label>
                <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1}>
                  <option value="" style={{ background: C.navy1 }}>{t.placeholderSubject}</option>
                  {t.subjectOptions.map((opt: any) => (
                    <option key={opt.value} value={opt.value} style={{ background: C.navy1 }}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>{t.labelMessage} <span style={{ color: "#ef4444" }}>*</span></label>
                <textarea rows={5} placeholder={t.placeholderMessage} style={{ ...inputStyle, resize: "vertical" }} onFocus={e => e.target.style.borderColor = C.goldBorder} onBlur={e => e.target.style.borderColor = C.bd1} />
              </div>

              <button onClick={() => setSent(true)} className="gold-glow" style={{
                width: "100%", padding: 15, borderRadius: 10, border: "none", fontSize: 15, fontWeight: 700,
                cursor: "pointer", background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: C.navy1, transition: "all .3s",
              }}>{t.sendBtn}</button>
            </div>
          ) : (
            <div style={{ background: C.navy3, border: `1px solid ${C.green}40`, borderRadius: 20, padding: 60, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t.sentTitle}</h3>
              <p style={{ fontSize: 15, color: C.gray2, maxWidth: 360, margin: "0 auto", lineHeight: 1.7 }}>
                {t.sentDesc1}<strong style={{ color: "#fff" }}>{t.sentDesc2}</strong>.
              </p>
            </div>
          )}

          {/* RIGHT — INFO */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Company card */}
            <div style={{ background: C.navy3, border: `1px solid ${C.goldBorder}`, borderRadius: 16, padding: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>{t.orgLabel}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>AI CONSULTING</h3>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 20 }}>{t.orgDesc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ color: C.gold, fontSize: 16, marginTop: 1, flexShrink: 0 }}>📍</span>
                  <div>
                    <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>38 Bis Boulevard Victor Hugo</div>
                    <div style={{ fontSize: 13, color: C.gray }}>06000 Nice, France</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.gold, fontSize: 16, flexShrink: 0 }}>🏛️</span>
                  <div style={{ fontSize: 13, color: C.gray }}>RCS Nice : 909116329</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: C.gold, fontSize: 16, flexShrink: 0 }}>📋</span>
                  <div style={{ fontSize: 13, color: C.gray }}>TVA : FR96909116329</div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div style={{ background: C.navy3, border: `1px solid ${C.bd1}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>{t.quickActionsLabel}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "📊", label: t.quickAction1, href: "https://www.acf-score.com/" },
                  { icon: "🛡️", label: t.quickAction2, href: `/${locale}/acf-certification` },
                  { icon: "🤝", label: t.quickAction3, href: `/${locale}/acf-partners` },
                  { icon: "📖", label: t.quickAction4, href: `/${locale}/standard` },
                  { icon: "📄", label: lang === "fr" ? "Télécharger le Livre Blanc ACF®" : "Download the ACF® White Paper", href: `/acf-whitepaper-${locale}.pdf` },
                ].map((a: any) => (
                  <a key={a.label} href={a.href} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                    background: C.navy1, border: `1px solid ${C.bd1}`, borderRadius: 10,
                    fontSize: 14, color: C.gray2, transition: "all .2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.bd1; e.currentTarget.style.color = C.gray2; }}>
                    <span style={{ fontSize: 18 }}>{a.icon}</span>
                    {a.label}
                    <span style={{ marginLeft: "auto", color: C.gray, fontSize: 14 }}>→</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <AIAgent />
    </div>
  );
}
