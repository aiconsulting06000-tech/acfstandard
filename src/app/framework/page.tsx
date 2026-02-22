import React from "react";

export default function FrameworkPage() {
  return (
    <main className="container py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold" style={{ color: "var(--acf-text)" }}>ACF Framework</h1>
        <p className="mt-2 text-sm text-neutral-400">ACF — Agentic Commerce Framework — Proprietary program owned by Vincent DORANGE.</p>
        <p className="mt-3 muted max-w-3xl">ACF stands for the Agentic Commerce Framework — a proprietary methodology created by Vincent DORANGE for governing autonomous agentic systems in commercial environments. The ACF Framework provides prescriptive operational guidance to organizations designing, operating, or assuring advanced automated systems. It addresses governance bodies, platform operators, security and compliance teams, certifying authorities, and engineering leads responsible for system-critical decision automation.</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--acf-accent)" }}>Lead Summary</h2>
        <p className="mt-3 muted">The ACF Framework sets four foundational principles and four operational layers that together define a minimum set of policies, runtime controls, observability, and assurance activities required to deploy accountable automated decisioning. It is normative: implementations MUST demonstrate alignment to the stated principles and mapping of controls to the layers and maturity levels described below.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">The Four Principles</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article>
            <h3 className="font-semibold">Accountability</h3>
            <p className="muted">Operational implication: clear assignment of decision authority, documented policies, and traceable action ownership. Controls include role-bound approvals, immutable change records, and escalation procedures. Responsibility: governance and DDA.</p>
          </article>

          <article>
            <h3 className="font-semibold">Traceability</h3>
            <p className="muted">Operational implication: every decision and model input must be logged with context sufficient for reconstruction. Controls include canonical event logs, input/output snapshots, and cryptographic integrity where required. Responsibility: platform engineering and observability teams.</p>
          </article>

          <article>
            <h3 className="font-semibold">Controllability</h3>
            <p className="muted">Operational implication: operators must have safe, tested levers to intervene (pause, rollback, throttle) and clearly defined runbooks. Controls include feature flags, circuit breakers, and runtime policy enforcement. Responsibility: SRE/ops and security teams.</p>
          </article>

          <article>
            <h3 className="font-semibold">Proven Assurance</h3>
            <p className="muted">Operational implication: demonstrable evidence that requirements are met through testing, measurement, and independent evaluation. Controls include repeatable test suites, audit artifacts, and certification packages. Responsibility: assurance, QA, and external auditors.</p>
          </article>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">Operational Layers</h2>
        <div className="mt-4 grid gap-6">
          <article className="p-5" style={{ background: "var(--acf-surface)", borderRadius: 8 }}>
            <h3 className="font-semibold">Policy</h3>
            <p className="muted">Objectives: define acceptable use, risk appetite, decision boundaries, and escalation rules. Typical controls: written policies, decision taxonomies, approval gates, and regulatory mappings. Responsibilities: governance board, legal, and policy owners.</p>
          </article>

          <article className="p-5" style={{ background: "var(--acf-surface)", borderRadius: 8 }}>
            <h3 className="font-semibold">Runtime Controls</h3>
            <p className="muted">Objectives: enforce policy at execution time and provide operator levers. Typical controls: access controls, throttles, feature flags, model input sanitization, and human-in-loop gates. Responsibilities: platform engineers, operators, and security teams.</p>
          </article>

          <article className="p-5" style={{ background: "var(--acf-surface)", borderRadius: 8 }}>
            <h3 className="font-semibold">Evidence & Observability</h3>
            <p className="muted">Objectives: collect, retain, and make queryable the data needed for reconstruction and measurement. Typical controls: immutable event logs, telemetry, provenance records, and data retention policies. Responsibilities: observability team, storage/services owners.</p>
          </article>

          <article className="p-5" style={{ background: "var(--acf-surface)", borderRadius: 8 }}>
            <h3 className="font-semibold">Assurance & Certification</h3>
            <p className="muted">Objectives: validate that the system meets policy and regulatory requirements; produce artifacts for internal and external review. Typical controls: test harnesses, formal attestations, red-team reports, and certification artifacts. Responsibilities: assurance teams, external auditors, and compliance officers.</p>
          </article>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">Maturity Levels (0–3)</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4" style={{ background: "#061026", borderRadius: 6 }}>
            <strong>Level 0 — Ad hoc</strong>
            <p className="muted">No formal controls. Policies are informal; evidence collection is partial.</p>
          </div>

          <div className="p-4" style={{ background: "#061026", borderRadius: 6 }}>
            <strong>Level 1 — Defined</strong>
            <p className="muted">Formal policies exist and basic runtime controls are implemented. Logging is available but not comprehensive.</p>
          </div>

          <div className="p-4" style={{ background: "#061026", borderRadius: 6 }}>
            <strong>Level 2 — Measured</strong>
            <p className="muted">End-to-end traceability and structured observability. Controls are tested; assurance activities are periodic.</p>
          </div>

          <div className="p-4" style={{ background: "#061026", borderRadius: 6 }}>
            <strong>Level 3 — Assured</strong>
            <p className="muted">Regular independent certification, automated evidence pipelines, and enforced runtime policy with live rollback capabilities.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">Non-delegable Zones</h2>
        <p className="mt-3 muted">Non-delegable zones are functions and decisions that must remain under explicit human or designated authority and cannot be delegated to opaque automated processes. Examples include:</p>
        <ul className="mt-3 list-disc pl-6 muted">
          <li>Final authorization for actions that materially affect safety, liberty, or regulatory status.</li>
          <li>Signing of compliance attestations and external certification submissions.</li>
          <li>Activation or deactivation of system-wide decision authorities (global kill-switch).</li>
        </ul>
        <p className="mt-3 muted">Required controls: documented assignment of authority, multi-person approval for critical actions, tamper-evident audit trails, and periodic review by independent assurance.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">DDA — Designated Deconfliction / Decision Authority</h2>
        <p className="mt-3 muted">The DDA is the named individual or small council responsible for final decisions when automated systems produce ambiguous or high-risk outputs. The DDA's core responsibilities include:</p>
        <ul className="mt-3 list-disc pl-6 muted">
          <li>Maintaining up-to-date decision authority documents and escalation matrices.</li>
          <li>Approving deployments to production where residual risk exceeds accepted thresholds.</li>
          <li>Ensuring that handoff procedures to human operators are tested and effective.</li>
          <li>Signing off on critical incident resolutions and post-incident assurance packages.</li>
        </ul>
        <p className="mt-3 muted">Appointment: the DDA must be appointed in writing by governance, have documented delegations, and possess appropriate organizational independence relative to implementers. Obligations: timely decision-making, maintain audit-ready logs of decisions, and participate in periodic assurance reviews.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">Architecture Diagram</h2>
        <div className="mt-4" aria-hidden>
          <svg width="100%" height="260" viewBox="0 0 1000 260" xmlns="http://www.w3.org/2000/svg" role="img">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#102230" />
                <stop offset="100%" stopColor="#071026" />
              </linearGradient>
            </defs>
            <rect x="20" y="20" width="660" height="220" rx="8" fill="url(#g)" stroke="#12263a" />

            {/* Layers */}
            <g fontFamily="Inter, sans-serif" fill="#dbe6ef">
              <rect x="40" y="34" width="620" height="46" rx="6" fill="#051126" />
              <text x="60" y="62" fontSize="14" fill="var(--acf-accent)">Policy</text>
              <text x="140" y="62" fontSize="12" fill="#9CA3AF">Define rules, taxonomies, risk appetite</text>

              <rect x="40" y="86" width="620" height="46" rx="6" fill="#08162a" />
              <text x="60" y="114" fontSize="14" fill="var(--acf-accent)">Runtime Controls</text>
              <text x="220" y="114" fontSize="12" fill="#9CA3AF">Enforcement, throttles, human gates</text>

              <rect x="40" y="138" width="620" height="46" rx="6" fill="#071026" />
              <text x="60" y="166" fontSize="14" fill="var(--acf-accent)">Evidence & Observability</text>
              <text x="300" y="166" fontSize="12" fill="#9CA3AF">Immutable logs, telemetry, provenance</text>

              <rect x="40" y="190" width="620" height="46" rx="6" fill="#061020" />
              <text x="60" y="218" fontSize="14" fill="var(--acf-accent)">Assurance & Certification</text>
              <text x="340" y="218" fontSize="12" fill="#9CA3AF">Tests, attestations, external review</text>
            </g>

            {/* Actors */}
            <g>
              <rect x="700" y="40" width="260" height="54" rx="6" fill="#051022" stroke="#0b2a3e" />
              <text x="720" y="62" fontSize="13" fill="var(--acf-accent)">Governance Board</text>
              <text x="720" y="80" fontSize="11" fill="#9CA3AF">Policy owners & sponsors</text>

              <rect x="700" y="106" width="260" height="54" rx="6" fill="#051022" stroke="#0b2a3e" />
              <text x="720" y="128" fontSize="13" fill="var(--acf-accent)">Operators / SRE</text>
              <text x="720" y="146" fontSize="11" fill="#9CA3AF">Runtime enforcement & response</text>

              <rect x="700" y="172" width="260" height="68" rx="6" fill="#051022" stroke="#0b2a3e" />
              <text x="720" y="196" fontSize="13" fill="var(--acf-accent)">Assurance / Auditors / DDA</text>
              <text x="720" y="214" fontSize="11" fill="#9CA3AF">Evidence review & final decision</text>
            </g>
          </svg>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">Practical First-Step Checklist</h2>
        <ol className="mt-3 list-decimal pl-6 muted">
          <li>Appoint a DDA and publish the delegation and escalation matrix.</li>
          <li>Inventory decisioning systems and classify them against risk criteria.</li>
          <li>Establish minimal policy: acceptable use, non-delegable zones, and retention periods.</li>
          <li>Deploy immutable logging for inputs/outputs, and ensure logs are tamper-evident and queryable.</li>
          <li>Implement at least one runtime control (feature flag or kill switch) with tested runbooks.</li>
          <li>Define and run an assurance playbook producing a simple certification artifact.</li>
          <li>Map controls to a maturity level and create a prioritized remediation plan.</li>
        </ol>
      </section>

      <footer className="mt-12 muted">
        <p>For adoption guidance, align each control to a named owner and verify evidence retention for audit. This document is normative: compliance assessments should map artifacts to the sections above.</p>
      </footer>
    </main>
  );
}
