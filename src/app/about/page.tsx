import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-neutral-900 to-black text-slate-200">
      <section className="max-w-4xl mx-auto py-20 px-6">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">About ACF</h1>
          <p className="mt-2 text-sm text-slate-400">ACF — Agentic Commerce Framework — Proprietary program owned by Vincent DORANGE.</p>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl">Agentic Commerce Framework (ACF) is a formal, production‑grade framework for designing, governing, and auditing autonomous agentic systems in commercial settings.</p>
        </header>

        <article className="space-y-10">
          <section>
            <h2 className="text-2xl font-medium">Mission & Provenance</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">ACF was conceived to bridge the gap between emergent agentic technologies and established commercial governance. The framework originated from applied research and operational lessons developed by Vincent DORANGE, who produced the initial specification to standardize best practices for agent deployment, risk mitigation, and compliance.</p>
            <p className="mt-3 text-slate-300 leading-relaxed">Development of ACF has been guided by a consortium of industry partners, independent auditors, and academic advisors. That consortium collaborates on normative updates, certification criteria, and independent conformance testing to ensure ACF remains robust, auditable, and aligned with public interest objectives.</p>
            <p className="mt-3 text-slate-300 leading-relaxed">ACF’s governance model combines consortium stewardship with independent third‑party auditing and a transparent change control process so organizations can adopt the framework with predictable legal and operational expectations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Team & Contributors</h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-semibold">Vincent DORANGE — Founder & Chief Architect</h3>
                <p className="text-slate-300 mt-1">Architect of the ACF specification. Vincent has led multiple initiatives at the intersection of autonomous systems, compliance engineering, and responsibly governed deployment models. He oversees strategic direction and stakeholder engagement for the framework.</p>
              </div>

              <div>
                <h3 className="font-semibold">Dr. Amelia Hart — Lead Auditor</h3>
                <p className="text-slate-300 mt-1">Dr. Hart leads independent auditing and assurance processes for ACF conformance. Her background in systems safety and regulatory compliance informs the framework’s assurance artifacts and audit playbooks.</p>
              </div>

              <div>
                <h3 className="font-semibold">Mateo Rivas — Lead Engineer</h3>
                <p className="text-slate-300 mt-1">Head of engineering and reference implementations. Mateo coordinates the technical working groups responsible for APIs, tooling, and reference architecture that help organizations operationalize ACF controls.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Governance & Intellectual Property</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">Ownership of the ACF specification is held by the ACF Consortium on behalf of its contributors. The specification is distributed under a permissive commercial licensing model that allows implementation, certification, and commercial integration while protecting contributor rights and ensuring consistent conformance claims.</p>
            <p className="mt-3 text-slate-300 leading-relaxed">Organizations seeking a commercial license, certification, or enterprise support should contact our licensing team at <a className="text-sky-400 underline" href="mailto:licensing@acfstandard.com">licensing@acfstandard.com</a>. For inquiries about contributor agreements or consortium membership, please reference the consortium governance documentation available to members and applicants.</p>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Ethics & Public Interest</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">ACF is explicitly designed to promote safe, non‑discriminatory, and transparent deployment of autonomous agents. The framework requires risk assessments, fairness checks, human oversight controls, and documented incident response processes as part of any certified implementation.</p>
            <p className="mt-3 text-slate-300 leading-relaxed">We commit to continuous improvement of safeguards, open public reporting on significant incidents, and a refusal to support uses that facilitate systemic harm or discriminatory outcomes. ACF emphasises accountability mechanisms so that technical capability does not outpace ethical governance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Contact & Press</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">For general inquiries, partnership requests, or support, please use our contact page: <Link className="text-sky-400 underline" href="/contact">Contact</Link>.</p>
            <p className="mt-2 text-slate-300">Press enquiries: <a className="text-sky-400 underline" href="mailto:press@acfstandard.com">press@acfstandard.com</a></p>
          </section>
        </article>
      </section>
    </main>
  )
}
