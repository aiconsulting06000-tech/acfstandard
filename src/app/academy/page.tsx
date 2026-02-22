import Link from 'next/link'

export default function AcademyPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--acf-bg)', color: 'var(--acf-text)' }}>
      <div className="section">
        <div className="container">
          <header className="mb-12">
            <h1 className="text-4xl font-semibold tracking-tight">ACF Academy</h1>
            <p className="mt-4 muted max-w-3xl">A premium institutional training program for implementers, assessors and auditors focused on building robust, auditable control frameworks with ACF. Ownership and stewardship of the Academy is held by Vincent DORANGE.</p>
          </header>

        <section className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="col-span-2 rounded-xl border border-neutral-800 p-8">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-4 muted">ACF Academy provides structured training, certificated courses, and hands-on labs designed for organizations and individuals implementing or auditing control frameworks. Our mission is to raise the standard of practice for implementers and auditors by combining practical engineering, governance principles, and evidence-based assurance. All programs are curated under the leadership of Vincent DORANGE to ensure rigor and real-world relevance.</p>
          </div>
          <aside className="rounded-xl border border-neutral-800 p-6">
            <h3 className="text-lg font-medium">Audience</h3>
            <ul className="mt-3 space-y-2 muted">
              <li>- Implementers and platform engineers</li>
              <li>- Internal and external auditors</li>
              <li>- Compliance and risk professionals</li>
              <li>- Technical managers seeking certification tracks</li>
            </ul>
          </aside>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold">Curriculum</h2>
          <p className="mt-3 muted max-w-4xl">The curriculum is modular and role-focused. Courses combine lectures, guided labs, and assessment artifacts designed to be reproducible in corporate environments.</p>

          <div className="mt-6 space-y-6">
            <article className="rounded-lg border border-neutral-800 p-6">
              <h3 className="text-xl font-semibold">Governance Foundations</h3>
              <p className="mt-2 text-slate-300">Introduces governance models, policy lifecycle, and roles & responsibilities for control programs. Students learn how to align control objectives with organisational risk appetite and compliance frameworks.</p>
              <p className="mt-2 text-slate-400"><strong>Prerequisites:</strong> Basic understanding of organisational risk and compliance concepts.</p>
            </article>

            <article className="rounded-lg border border-neutral-800 p-6">
              <h3 className="text-xl font-semibold">Control Engineering</h3>
              <p className="mt-2 text-slate-300">Practical engineering for control implementation, including control design patterns, automation techniques, and observability. Emphasis on resilient, testable control primitives suitable for production systems.</p>
              <p className="mt-2 text-slate-400"><strong>Prerequisites:</strong> Experienced with cloud or platform engineering; familiarity with CI/CD.</p>
            </article>

            <article className="rounded-lg border border-neutral-800 p-6">
              <h3 className="text-xl font-semibold">Evidence Pipelines</h3>
              <p className="mt-2 text-slate-300">Designing and operating evidence pipelines that collect, normalise, and retain verifiable artifacts for assurance. Covers tamper-evident storage, chain-of-custody, and pragmatic retention strategies.</p>
              <p className="mt-2 text-slate-400"><strong>Prerequisites:</strong> Knowledge of logging, observability, and storage concepts.</p>
            </article>

            <article className="rounded-lg border border-neutral-800 p-6">
              <h3 className="text-xl font-semibold">Assurance Engineering</h3>
              <p className="mt-2 text-slate-300">Integrates control design with auditability—automated testing, continuous assurance, and evidence review workflows. Students practice building repeatable assurance pipelines that support both internal and external assessments.</p>
              <p className="mt-2 text-slate-400"><strong>Prerequisites:</strong> Familiarity with testing practices and basic assurance concepts.</p>
            </article>

            <article className="rounded-lg border border-slate-800 bg-slate-900/30 p-6">
              <h3 className="text-xl font-semibold">DDA Training (Developer-Driven Assurance)</h3>
              <p className="mt-2 text-slate-300">Hands-on training that empowers developers to embed Assurance controls into the development lifecycle. Covers policy-as-code, control libraries, and developer workflows that preserve velocity while improving compliance.</p>
              <p className="mt-2 text-slate-400"><strong>Prerequisites:</strong> Comfortable writing code and integrating with version control systems.</p>
            </article>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold">Certification Tracks</h2>
          <p className="mt-3 muted max-w-4xl">Our certifications are role-based and skills-validated through practical assessments and review of learner artifacts.</p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-neutral-800 p-5">
              <h3 className="font-semibold">Practitioner</h3>
              <p className="mt-2 text-slate-300">Targeted at engineers and operators who implement day-to-day controls.</p>
              <ul className="mt-3 text-slate-400 space-y-1">
                <li>- Requirements: Completion of core modules and lab artifacts.</li>
                <li>- Competencies: Implement control primitives, produce evidence artifacts, run assurance tests.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-800 p-5">
              <h3 className="font-semibold">Implementer</h3>
              <p className="mt-2 text-slate-300">Designed for lead engineers and architects responsible for system-wide control design.</p>
              <ul className="mt-3 text-slate-400 space-y-1">
                <li>- Requirements: Advanced modules, project delivery, and architecture review.</li>
                <li>- Competencies: Design resilient control frameworks, integrate evidence pipelines, mentor teams.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-800 p-5">
              <h3 className="font-semibold">Assessor</h3>
              <p className="mt-2 text-slate-300">For auditors and assurance professionals conducting independent reviews and certifications.</p>
              <ul className="mt-3 text-slate-400 space-y-1">
                <li>- Requirements: Completion of assurance engineering and evidence pipelines; assessed simulation review.</li>
                <li>- Competencies: Perform evidence review, identify control gaps, write formal assessment reports.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold">Delivery Models</h2>
          <div className="mt-4 space-y-4 text-slate-300">
            <p className="muted">- Self-paced: On-demand video modules, lab guides, and automated grading for flexible learning.</p>
            <p className="muted">- Instructor-led: Live multi-day workshops with expert instructors and cohort discussions.</p>
            <p className="muted">- Corporate cohorts: Tailored syllabi, private cohorts, and bespoke assessments mapped to corporate policies.</p>
            <p className="muted">- Labs & simulations: Cloud-hosted hands-on labs, evidence generation exercises, and battle-tested scenarios.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold">Example Syllabus & 8‑Week Bootcamp</h2>
          <p className="mt-3 text-slate-300">Below is an example pathway for organisations adopting the ACF Academy 8‑week bootcamp. Each week pairs lessons with a hands-on lab and an evidence artifact to submit for review.</p>

          <ol className="mt-6 space-y-3 list-decimal pl-6 text-slate-300">
            <li><strong>Week 1 – Foundations:</strong> Governance models, roles, policy lifecycles. Lab: Draft policy and control map.</li>
            <li><strong>Week 2 – Control Design:</strong> Control primitives, idempotent designs, automation patterns. Lab: Implement a control primitive.</li>
            <li><strong>Week 3 – Evidence Pipelines:</strong> Logging, provenance, secure storage. Lab: Build an evidence ingestion pipeline.</li>
            <li><strong>Week 4 – Assurance Engineering:</strong> Test-driven assurance and CI integration. Lab: Create automated assurance tests.</li>
            <li><strong>Week 5 – Developer-Driven Assurance:</strong> Policy-as-code and developer workflows. Lab: Integrate controls into a CI pipeline.</li>
            <li><strong>Week 6 – Audit Simulations:</strong> Prepare and run an internal audit simulation. Lab: Produce audit packet and chain-of-custody record.</li>
            <li><strong>Week 7 – Scaling Controls:</strong> Operating at scale, incident response integration. Lab: Scale test and incident playbook.</li>
            <li><strong>Week 8 – Final Assessment:</strong> Capstone project, artifact review, and certification exam.</li>
          </ol>

          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/20 p-6">
            <h4 className="text-lg font-semibold">Bootcamp Outcomes</h4>
            <p className="mt-2 text-slate-300">Graduates will be able to design and operate auditable control programs, produce verifiable evidence artifacts, and lead control improvement initiatives across teams.</p>
          </div>
        </section>

        <section className="mt-8 mb-20 rounded-xl border border-neutral-800 p-8">
          <h2 className="text-2xl font-semibold">Enroll or Request Corporate Training</h2>
          <p className="mt-3 muted max-w-3xl">Ready to upskill your team or pursue certification? Choose self-paced learning, schedule an instructor-led course, or request a corporate cohort customised to your policies and infrastructure.</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="btn">Request Corporate Training / Enroll</Link>
            <Link href="/contact" className="btn">Contact Admissions</Link>
          </div>
        </section>

        <footer className="text-sm muted">© {new Date().getFullYear()} ACF Academy — Curated by Vincent DORANGE. For institutional enquiries, use the contact form.</footer>
        </div>
      </div>
    </main>
  )
}
