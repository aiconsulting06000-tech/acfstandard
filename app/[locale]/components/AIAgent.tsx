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
    beta: "POWERED BY CLAUDE AI",
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
    beta: "PROPULSÉ PAR CLAUDE AI",
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
};

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
  const lang = locale === "fr" ? "fr" : "en";
  const t = ui[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
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

  /* ── Find best male voice ── */
  function findMaleVoice(): SpeechSynthesisVoice | null {
    if (cachedVoiceRef.current) return cachedVoiceRef.current;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    const targetLang = lang === "fr" ? "fr" : "en";
    const langVoices = voices.filter(v => v.lang.startsWith(targetLang));
    // Female names to exclude
    const femaleNames = ["samantha","karen","victoria","amelie","fiona","moira","tessa","zira","susan","hazel","jenny","aria","sara","elsa","alice","ellen","nora","paulina","kathy","ava","allison","joana","luciana","monica","francisca","female","woman"];
    // Male names to prefer
    const maleNames = ["daniel","thomas","james","david","mark","guy","liam","eric","henri","jacques","mathieu","philippe","remy","pierre","alex","fred","bruce","lee","aaron","gordon","oliver","william","ryan","sean","roger","male"];
    // Premium quality keywords
    const premiumKw = ["natural","enhanced","premium","neural","online"];

    const notFemale = (v: SpeechSynthesisVoice) => !femaleNames.some(f => v.name.toLowerCase().includes(f));
    const isMale = (v: SpeechSynthesisVoice) => maleNames.some(m => v.name.toLowerCase().includes(m));
    const isPremium = (v: SpeechSynthesisVoice) => premiumKw.some(k => v.name.toLowerCase().includes(k));

    const pick =
      // 1. Premium male voice (best quality)
      langVoices.find(v => isMale(v) && isPremium(v)) ||
      // 2. Any male voice
      langVoices.find(v => isMale(v)) ||
      // 3. Premium non-female voice
      langVoices.find(v => notFemale(v) && isPremium(v)) ||
      // 4. Google non-female voice
      langVoices.find(v => v.name.includes("Google") && notFemale(v)) ||
      // 5. Microsoft non-female voice
      langVoices.find(v => v.name.includes("Microsoft") && notFemale(v)) ||
      // 6. Any non-female
      langVoices.find(v => notFemale(v)) ||
      // 7. Fallback
      langVoices[0] || voices[0];

    if (pick) cachedVoiceRef.current = pick;
    return pick;
  }

  /* ── Text-to-Speech for bot responses ── */
  function speakText(text: string) {
    if (!window.speechSynthesis || !ttsEnabled) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "fr" ? "fr-FR" : "en-US";

    const voice = findMaleVoice();
    if (voice) utterance.voice = voice;
    // Lower pitch + slightly slower for warm male tone
    utterance.pitch = 0.85;
    utterance.rate = 0.92;

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
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text.trim(), locale }),
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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 8 }}>{t.beta}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{t.title} <span style={{ color: C.gold }}>&#9733;</span></div>
              <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.5 }}>{t.subtitle}</p>
            </div>

            {/* Messages */}
            <div className="acf-agent-msgs" ref={msgsRef}>
              {messages.map((m, i) => (
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
                  {t.questions.map(q => (
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
