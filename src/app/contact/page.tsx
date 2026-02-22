"use client"

import React, { useState } from "react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--acf-bg)', color: 'var(--acf-text)' }}>
      <div className="section">
        <div className="container">
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight">Contact</h1>
          <p className="mt-3 text-neutral-300 max-w-3xl leading-relaxed">
            Reach out for assessments, partnerships, academy enquiries, press requests, or licensing information. Use the form below for
            submissions — or find our corporate contact details and partner/certification CTAs further down.
          </p>
        </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="border border-neutral-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
              <ContactForm />
            </section>

            <aside className="space-y-6">
              <section className="border border-neutral-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Corporate Contact</h3>
                <p className="muted">Email: <a style={{ color: 'var(--acf-accent)' }} href="mailto:contact@acfstandard.com">contact@acfstandard.com</a></p>
                <p className="muted mt-2">Phone: <a style={{ color: 'var(--acf-accent)' }} href="tel:+18005551234">+1 (800) 555-1234</a></p>
                <p className="muted mt-2">Mailing address:</p>
                <address className="not-italic muted mt-1">
                  ACF Standard Institute
                  <br /> 1201 Meridian Avenue
                  <br /> Suite 400
                  <br /> San Francisco, CA 94105
                </address>
                <p className="muted mt-3">Business hours: Mon–Fri, 09:00–17:00 PT</p>
              </section>

              <section className="border border-neutral-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Privacy & retention</h3>
                <p className="muted leading-relaxed">
                  We use contact information solely to respond to your inquiry and to manage any subsequent relationship. Submitted
                  messages are retained for up to 36 months for record-keeping and compliance, unless you request earlier deletion.
                </p>
              </section>

              <section className="border border-neutral-800 rounded-lg p-6 flex flex-col gap-3">
                <h3 className="text-xl font-semibold">Become a partner or get certified</h3>
                <p className="muted">Interested in partnership or certification? Learn more and apply:</p>
                <div className="flex gap-3">
                  <Link href="/partners" className="btn">Partners</Link>
                  <Link href="/certification" className="btn">Certification</Link>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    type: "assessment",
    message: "",
    consent: false,
  })
  const [errors, setErrors] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    if (!form.name.trim()) return "Please provide your full name."
    if (!form.email.trim()) return "Please provide an email address."
    // basic email check
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    if (!emailRe.test(form.email)) return "Please provide a valid email address."
    if (!form.message.trim()) return "Please enter a message describing your inquiry."
    if (!form.consent) return "Please confirm you consent to be contacted."
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors(null)
    setStatus(null)
    const err = validate()
    if (err) {
      setErrors(err)
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Server returned ${res.status}`)
      setStatus("Thanks — your message has been sent. We will respond within 2 business days.")
      setForm({ name: "", organization: "", email: "", type: "assessment", message: "", consent: false })
    } catch (err) {
      setErrors("There was an error sending your message. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Full name</label>
        <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="mt-1 w-full rounded border border-neutral-700 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2"
            />
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-neutral-300">Organization</label>
        <input
          id="organization"
          value={form.organization}
          onChange={(e) => setForm({ ...form, organization: e.target.value })}
          className="mt-1 w-full rounded border border-neutral-700 px-3 py-2 text-neutral-100"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email address</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="mt-1 w-full rounded border border-neutral-700 px-3 py-2 text-neutral-100"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-neutral-300">Inquiry type</label>
        <select
          id="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="mt-1 w-full rounded border border-neutral-700 px-3 py-2 text-neutral-100"
        >
          <option value="assessment">Assessment</option>
          <option value="partnership">Partnership</option>
          <option value="academy">Academy</option>
          <option value="press">Press</option>
          <option value="licensing">Licensing</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-300">Message</label>
        <textarea
          id="message"
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className="mt-1 w-full rounded bg-[#041018] border border-neutral-700 px-3 py-2 text-neutral-100"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 h-4 w-4 text-amber-500 border-neutral-700 rounded"
        />
        <label htmlFor="consent" className="text-sm text-neutral-300">
          I consent to ACF Standard storing my contact details to respond to this inquiry.
        </label>
      </div>

      {errors && <div role="alert" className="text-sm text-rose-400">{errors}</div>}
      {status && <div role="status" className="text-sm text-emerald-400">{status}</div>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="btn"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
        <button
          type="button"
          onClick={() => setForm({ name: "", organization: "", email: "", type: "assessment", message: "", consent: false })}
          className="btn"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
