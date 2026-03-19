"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";

const C = {
  navy1: "#050c1a", navy2: "#071122", navy3: "#0d1f3c",
  gold: "#c9a84c", gold2: "#e8c96a", goldDim: "rgba(201,168,76,.14)",
  goldBorder: "rgba(201,168,76,.2)", white: "#ffffff",
  gray: "#6b7fa0", gray2: "#9db0c8",
  bd1: "rgba(255,255,255,.07)",
};

const ui = {
  en: {
    btnLabel: "ACF Agent",
    btnStatus: "Online",
    beta: "",
    title: "ACF Agent",
    subtitle: "Your AI governance expert. Ask anything about the Agentic Commerce Framework®.",
    placeholder: "Ask about ACF governance...",
    close: "\u2715",
    trending: "Trending questions",
    questions: [
      "What is the Agentic Commerce Framework?",
      "How does ACF Score® work?",
      "What is a DDA?",
      "Explain the 4 principles",
      "What is ACF Control?",
    ],
    disclaimer: "AI-generated answers. Always verify with official documentation.",
    seeMore: "See legal notice",
  },
  fr: {
    btnLabel: "ACF Agent",
    btnStatus: "En ligne",
    beta: "",
    title: "ACF Agent",
    subtitle: "Votre expert en gouvernance IA. Posez vos questions sur l'Agentic Commerce Framework®.",
    placeholder: "Posez une question sur la gouvernance ACF...",
    close: "\u2715",
    trending: "Questions fréquentes",
    questions: [
      "Qu'est-ce que l'Agentic Commerce Framework ?",
      "Comment fonctionne ACF Score® ?",
      "Qu'est-ce qu'un DDA ?",
      "Expliquez les 4 principes",
      "Qu'est-ce qu'ACF Control ?",
    ],
    disclaimer: "Réponses générées par IA. Vérifiez toujours avec la documentation officielle.",
    seeMore: "Voir les mentions légales",
  },
  es: {
    btnLabel: "ACF Agent", btnStatus: "En línea", beta: "", title: "ACF Agent",
    subtitle: "Su experto en gobernanza de IA. Pregunte sobre el Agentic Commerce Framework®.",
    placeholder: "Pregunte sobre la gobernanza ACF...", close: "\u2715", trending: "Preguntas frecuentes",
    questions: ["¿Qué es el Agentic Commerce Framework?", "¿Cómo funciona ACF Score®?", "¿Qué es un DDA?", "Los 4 principios", "¿Qué es ACF Control?"],
    disclaimer: "Respuestas generadas por IA. Siempre verifique con la documentación oficial.", seeMore: "Ver aviso legal",
  },
  de: {
    btnLabel: "ACF Agent", btnStatus: "Online", beta: "", title: "ACF Agent",
    subtitle: "Ihr KI-Governance-Experte. Stellen Sie Fragen zum Agentic Commerce Framework®.",
    placeholder: "Fragen zur ACF-Governance...", close: "\u2715", trending: "Häufige Fragen",
    questions: ["Was ist das Agentic Commerce Framework?", "Wie funktioniert ACF Score®?", "Was ist ein DDA?", "Die 4 Prinzipien", "Was ist ACF Control?"],
    disclaimer: "KI-generierte Antworten. Überprüfen Sie immer die offizielle Dokumentation.", seeMore: "Rechtliche Hinweise",
  },
  pt: {
    btnLabel: "ACF Agent", btnStatus: "Online", beta: "", title: "ACF Agent",
    subtitle: "Seu especialista em governança de IA. Pergunte sobre o Agentic Commerce Framework®.",
    placeholder: "Pergunte sobre governança ACF...", close: "\u2715", trending: "Perguntas frequentes",
    questions: ["O que é o Agentic Commerce Framework?", "Como funciona o ACF Score®?", "O que é um DDA?", "Os 4 princípios", "O que é o ACF Control?"],
    disclaimer: "Respostas geradas por IA. Sempre verifique com a documentação oficial.", seeMore: "Ver aviso legal",
  },
  ja: {
    btnLabel: "ACF Agent", btnStatus: "オンライン", beta: "", title: "ACF Agent",
    subtitle: "AIガバナンスの専門家。Agentic Commerce Framework®について質問してください。",
    placeholder: "ACFガバナンスについて質問...", close: "\u2715", trending: "よくある質問",
    questions: ["Agentic Commerce Frameworkとは？", "ACF Score®の仕組みは？", "DDAとは？", "4つの原則", "ACF Controlとは？"],
    disclaimer: "AI生成の回答です。公式ドキュメントで必ず確認してください。", seeMore: "法的通知を見る",
  },
  zh: {
    btnLabel: "ACF Agent", btnStatus: "在线", beta: "", title: "ACF Agent",
    subtitle: "您的AI治理专家。了解Agentic Commerce Framework®相关信息。",
    placeholder: "询问ACF治理...", close: "\u2715", trending: "热门问题",
    questions: ["什么是Agentic Commerce Framework？", "ACF Score®如何运作？", "什么是DDA？", "4项原则", "什么是ACF Control？"],
    disclaimer: "AI生成的回答。请始终以官方文档为准。", seeMore: "查看法律声明",
  },
  ko: {
    btnLabel: "ACF Agent", btnStatus: "온라인", beta: "", title: "ACF Agent",
    subtitle: "AI 거버넌스 전문가입니다. Agentic Commerce Framework®에 대해 문의하세요.",
    placeholder: "ACF 거버넌스에 대해 질문...", close: "\u2715", trending: "자주 묻는 질문",
    questions: ["Agentic Commerce Framework란?", "ACF Score®는 어떻게 작동하나요?", "DDA란 무엇인가요?", "4가지 원칙", "ACF Control이란?"],
    disclaimer: "AI가 생성한 답변입니다. 항상 공식 문서를 확인하세요.", seeMore: "법적 고지 보기",
  },
  it: {
    btnLabel: "ACF Agent", btnStatus: "Online", beta: "", title: "ACF Agent",
    subtitle: "Il vostro esperto di governance IA. Fate domande sull'Agentic Commerce Framework®.",
    placeholder: "Chiedi sulla governance ACF...", close: "\u2715", trending: "Domande frequenti",
    questions: ["Cos'è l'Agentic Commerce Framework?", "Come funziona ACF Score®?", "Cos'è un DDA?", "I 4 principi", "Cos'è ACF Control?"],
    disclaimer: "Risposte generate dall'IA. Verificare sempre con la documentazione ufficiale.", seeMore: "Vedi note legali",
  },
  nl: {
    btnLabel: "ACF Agent", btnStatus: "Online", beta: "", title: "ACF Agent",
    subtitle: "Uw AI-governance expert. Stel vragen over het Agentic Commerce Framework®.",
    placeholder: "Vraag over ACF-governance...", close: "\u2715", trending: "Veelgestelde vragen",
    questions: ["Wat is het Agentic Commerce Framework?", "Hoe werkt ACF Score®?", "Wat is een DDA?", "De 4 principes", "Wat is ACF Control?"],
    disclaimer: "Door AI gegenereerde antwoorden. Verifieer altijd met de officiële documentatie.", seeMore: "Juridische kennisgeving",
  },
  ru: {
    btnLabel: "ACF Agent", btnStatus: "Онлайн", beta: "", title: "ACF Agent",
    subtitle: "Ваш эксперт по управлению ИИ. Задавайте вопросы об Agentic Commerce Framework®.",
    placeholder: "Спросите об управлении ACF...", close: "\u2715", trending: "Популярные вопросы",
    questions: ["Что такое Agentic Commerce Framework?", "Как работает ACF Score®?", "Что такое DDA?", "4 принципа", "Что такое ACF Control?"],
    disclaimer: "Ответы сгенерированы ИИ. Всегда сверяйтесь с официальной документацией.", seeMore: "Юридическая информация",
  },
  ar: {
    btnLabel: "ACF Agent", btnStatus: "متصل", beta: "", title: "ACF Agent",
    subtitle: "خبير حوكمة الذكاء الاصطناعي. اسأل عن Agentic Commerce Framework®.",
    placeholder: "اسأل عن حوكمة ACF...", close: "\u2715", trending: "الأسئلة الشائعة",
    questions: ["ما هو Agentic Commerce Framework؟", "كيف يعمل ACF Score®؟", "ما هو DDA؟", "المبادئ الأربعة", "ما هو ACF Control؟"],
    disclaimer: "إجابات مولدة بالذكاء الاصطناعي. تحقق دائمًا من الوثائق الرسمية.", seeMore: "الإشعار القانوني",
  },
  tr: {
    btnLabel: "ACF Agent", btnStatus: "Çevrimiçi", beta: "", title: "ACF Agent",
    subtitle: "Yapay zeka yönetişim uzmanınız. Agentic Commerce Framework® hakkında sorun.",
    placeholder: "ACF yönetişimi hakkında sorun...", close: "\u2715", trending: "Sık sorulan sorular",
    questions: ["Agentic Commerce Framework nedir?", "ACF Score® nasıl çalışır?", "DDA nedir?", "4 temel ilke", "ACF Control nedir?"],
    disclaimer: "Yapay zeka tarafından üretilen yanıtlar. Her zaman resmi dokümantasyonu kontrol edin.", seeMore: "Yasal uyarı",
  },
} as Record<string, any>;

interface Message {
  text: string;
  type: "user" | "bot";
}

/* ── Speech Recognition type (Web Speech API) ── */
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((ev: any) => void) | null;
  onerror: ((ev: any) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

export default function AIAgent() {
  const locale = useLocale();
  const lang = ui[locale] ? locale : "en";
  const t = ui[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const msgsRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const cachedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  /* ── Check voice support + preload voices on mount ── */
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(!!SR && !!window.speechSynthesis);
    // Preload voices (they load async on most browsers)
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        cachedVoiceRef.current = null; // reset cache so it re-selects
      };
    }
  }, []);

  /* ── Start/Stop speech recognition ── */
  function toggleListening() {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang === "fr" ? "fr-FR" : "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
      // Don't auto-send — let user review and press Enter or Send button
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }

  /* ── Text-to-Speech for bot responses ── */
  function speakText(text: string) {
    if (!window.speechSynthesis || !ttsEnabled) return;
    window.speechSynthesis.cancel();

    const LANG_MAP: Record<string, string> = {
      fr: "fr-FR", en: "en-US", es: "es-ES", de: "de-DE", pt: "pt-BR",
      ja: "ja-JP", zh: "zh-CN", ko: "ko-KR", it: "it-IT", nl: "nl-NL",
      ru: "ru-RU", ar: "ar-SA", tr: "tr-TR",
    };

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_MAP[lang] || "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick first matching Google voice, or first available for the language
    const voices = window.speechSynthesis.getVoices();
    const targetLang = LANG_MAP[lang]?.split("-")[0] || "en";
    const preferred = voices.find(v => v.lang.startsWith(targetLang) && v.name.includes("Google")) ||
                      voices.find(v => v.lang.startsWith(targetLang));
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, loading]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { text: text.trim(), type: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Build conversation history for context
      const history = messages.map((m: any) => ({
        role: m.type === "user" ? "user" : "assistant",
        content: m.text,
      }));
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text.trim(), locale, history }),
      });
      const data = await res.json();
      const botText = data.text || data.error || "Error";
      setMessages(prev => [...prev, { text: botText, type: "bot" }]);
      // Auto-speak the response if TTS enabled
      if (ttsEnabled) speakText(botText);
    } catch {
      setMessages(prev => [...prev, { text: lang === "fr" ? "Erreur de connexion. Réessayez." : "Connection error. Please try again.", type: "bot" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes aiPulse { 0%,100% { box-shadow: 0 4px 20px rgba(201,168,76,.3); } 50% { box-shadow: 0 4px 32px rgba(201,168,76,.5); } }
        @keyframes dotBounce { 0%,80%,100% { transform: scale(0); } 40% { transform: scale(1); } }
        @keyframes micPulse { 0%,100% { opacity: 1; } 50% { opacity: .5; } }
        .acf-agent-btn { position: fixed; bottom: 28px; right: 28px; z-index: 700; display: flex; align-items: center; gap: 10px; background: linear-gradient(135deg, ${C.gold}, ${C.gold2}); border: none; border-radius: 100px; padding: 14px 22px; cursor: pointer; animation: aiPulse 3s ease-in-out infinite; transition: .3s; font-family: 'Inter', sans-serif; }
        .acf-agent-btn:hover { transform: translateY(-2px); }
        .acf-agent-overlay { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .acf-agent-bg { position: absolute; inset: 0; background: rgba(0,0,0,.75); backdrop-filter: blur(6px); }
        .acf-agent-box { position: relative; z-index: 1; background: ${C.navy2}; border: 1px solid ${C.goldBorder}; border-radius: 20px; width: 700px; max-width: 95vw; max-height: 85vh; display: flex; flex-direction: column; overflow: hidden; }
        .acf-agent-msgs { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; min-height: 200px; max-height: 400px; }
        .acf-agent-msg { max-width: 85%; padding: 12px 16px; border-radius: 14px; font-size: 14px; line-height: 1.6; word-break: break-word; }
        .acf-agent-msg-user { align-self: flex-end; background: linear-gradient(135deg, ${C.gold}, ${C.gold2}); color: ${C.navy1}; border-bottom-right-radius: 4px; font-weight: 500; }
        .acf-agent-msg-bot { align-self: flex-start; background: ${C.navy3}; color: ${C.gray2}; border: 1px solid ${C.bd1}; border-bottom-left-radius: 4px; }
        .acf-agent-dots { display: flex; gap: 4px; padding: 12px 16px; align-self: flex-start; }
        .acf-agent-dots span { width: 8px; height: 8px; border-radius: 50%; background: ${C.gold}; animation: dotBounce 1.4s ease-in-out infinite; }
        .acf-agent-dots span:nth-child(2) { animation-delay: .2s; }
        .acf-agent-dots span:nth-child(3) { animation-delay: .4s; }
        .acf-agent-q { background: ${C.navy3}; border: 1px solid ${C.bd1}; color: ${C.gray2}; border-radius: 8px; padding: 8px 14px; font-size: 13px; cursor: pointer; transition: .2s; font-family: 'Inter', sans-serif; text-align: left; }
        .acf-agent-q:hover { border-color: ${C.goldBorder}; color: #fff; }
        @media (max-width: 768px) { .acf-agent-btn { right: 16px; bottom: 16px; padding: 12px 16px; } .acf-agent-box { width: 95vw; max-height: 90vh; } }
      `}</style>

      {/* Floating Button */}
      {!open && (
        <button className="acf-agent-btn" onClick={() => setOpen(true)}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.navy1 }}>{t.btnLabel}</div>
            <div style={{ fontSize: 10, color: "rgba(5,12,26,.6)" }}>{t.btnStatus}</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={C.navy1}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </button>
      )}

      {/* Chat Modal */}
      {open && (
        <div className="acf-agent-overlay">
          <div className="acf-agent-bg" onClick={() => setOpen(false)} />
          <div className="acf-agent-box">
            {/* Header */}
            <div style={{ padding: "24px 28px 16px", borderBottom: `1px solid ${C.bd1}`, position: "relative" }}>
              <button onClick={() => setOpen(false)} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: C.gray, fontSize: 20, cursor: "pointer" }}>{t.close}</button>
              {t.beta && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 8 }}>{t.beta}</div>}
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{t.title} <span style={{ color: C.gold }}>&#9733;</span></div>
              <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.5 }}>{t.subtitle}</p>
            </div>

            {/* Messages */}
            <div className="acf-agent-msgs" ref={msgsRef}>
              {messages.map((m: any, i: number) => (
                <div key={i} className={`acf-agent-msg acf-agent-msg-${m.type}`}>{m.text}</div>
              ))}
              {loading && <div className="acf-agent-dots"><span /><span /><span /></div>}
            </div>

            {/* Input */}
            <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.bd1}`, display: "flex", gap: 8, alignItems: "center" }}>
              {/* Mic button */}
              {voiceSupported && (
                <button
                  onClick={toggleListening}
                  title={isListening ? "Stop" : (lang === "fr" ? "Parler" : "Speak")}
                  style={{
                    background: isListening ? "rgba(239,68,68,.2)" : C.navy3,
                    border: `1px solid ${isListening ? "rgba(239,68,68,.5)" : C.bd1}`,
                    borderRadius: 10,
                    width: 44,
                    height: 44,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all .2s",
                    animation: isListening ? "micPulse 1.5s ease-in-out infinite" : "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isListening ? "#ef4444" : C.gray2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>
              )}
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") sendMessage(input); }}
                placeholder={isListening ? (lang === "fr" ? "Parlez maintenant..." : "Speak now...") : t.placeholder}
                style={{ flex: 1, background: C.navy3, border: `1px solid ${isListening ? "rgba(239,68,68,.3)" : C.bd1}`, borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif", transition: "border-color .2s" }}
              />
              <button
                onClick={() => sendMessage(input)}
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, border: "none", borderRadius: 10, width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={C.navy1}><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
              </button>
            </div>

            {/* Voice controls bar */}
            {voiceSupported && (
              <div style={{ padding: "6px 20px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: C.gold, fontSize: 11, fontFamily: "'Inter', sans-serif" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill={C.gold}><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                      {lang === "fr" ? "Arrêter la lecture" : "Stop speaking"}
                    </button>
                  )}
                  {isListening && (
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#ef4444", fontSize: 11 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "micPulse 1s ease-in-out infinite" }} />
                      {lang === "fr" ? "Écoute en cours..." : "Listening..."}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { setTtsEnabled(!ttsEnabled); if (isSpeaking) stopSpeaking(); }}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: ttsEnabled ? C.gold : C.gray, fontSize: 11, fontFamily: "'Inter', sans-serif", transition: "color .2s" }}
                  title={ttsEnabled ? (lang === "fr" ? "Désactiver la voix" : "Mute voice") : (lang === "fr" ? "Activer la voix" : "Enable voice")}
                >
                  {ttsEnabled ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                  )}
                  {ttsEnabled ? (lang === "fr" ? "Voix activée" : "Voice on") : (lang === "fr" ? "Voix désactivée" : "Voice off")}
                </button>
              </div>
            )}

            {/* Trending Questions */}
            {messages.length === 0 && (
              <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${C.bd1}` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gray, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>{t.trending}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {t.questions.map((q: any) => (
                    <button key={q} className="acf-agent-q" onClick={() => sendMessage(q)}>{q}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ padding: "10px 20px", borderTop: `1px solid ${C.bd1}`, textAlign: "center" }}>
              <span style={{ fontSize: 11, color: C.gray }}>{t.disclaimer} <a href={`/${locale}/legal`} style={{ color: C.gold, textDecoration: "none" }}>{t.seeMore}</a></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
