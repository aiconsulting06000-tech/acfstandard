"use client";
import { useState } from "react";

export default function ClaudeDemoPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResponse(data.text ?? data.error ?? JSON.stringify(data));
    } catch (err: any) {
      setResponse(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Claude demo</h1>
      <form onSubmit={submit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          style={{ width: "100%" }}
          placeholder="Enter a prompt for Claude"
        />
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? "Calling Claude…" : "Send"}
          </button>
        </div>
      </form>
      {response && (
        <section style={{ marginTop: 16 }}>
          <h2>Response</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{response}</pre>
        </section>
      )}
    </main>
  );
}
