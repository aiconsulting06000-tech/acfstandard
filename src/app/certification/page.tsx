import Link from 'next/link'
import React from 'react'

export default function CertificationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-100 antialiased">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold leading-tight text-white">ACF Certification Program</h1>
          <p className="mt-4 text-gray-300 text-lg">An authoritative, proprietary assurance framework owned and operated by Vincent DORANGE and ACF. The ACF Certification verifies technical, operational and governance maturity for complex institutional digital systems.</p>
          <p className="mt-2 text-sm text-gray-400">ACF is proprietary intellectual property; all program materials, templates and scoring rubrics are maintained and controlled by ACF under Vincent DORANGE’s stewardship.</p>
        </header>

        <section className="mb-10" aria-labelledby="lifecycle-heading">
          <h2 id="lifecycle-heading" className="text-2xl font-semibold text-white">Certification lifecycle</h2>
          <p className="mt-3 text-gray-300">The ACF lifecycle is a structured sequence ensuring objective, repeatable evaluation and post-issuance assurance. Each phase establishes explicit deliverables and acceptance criteria.</p>
          <ol className="mt-4 list-decimal list-inside text-gray-200 space-y-3">
            <li><strong className="text-white">Scope definition:</strong> Define systems, data flows, boundaries, and regulatory context. Output: formal scope statement and test plan.</li>
            <li><strong className="text-white">Pre-assessment:</strong> Documentation review and readiness checks to identify gaps and plan evidence collection.</li>
            <li><strong className="text-white">Evidence collection:</strong> Gather artifacts, logs, configurations, and test records per ACF evidence matrices.</li>
            <li><strong className="text-white">Onsite/remote testing:</strong> Active verification using test harnesses, instrumentation, and controlled exercises.</li>
            <li><strong className="text-white">Remediation:</strong> Findings triage, remediation plans, and re-testing where required.</li>
            <li><strong className="text-white">Issuance:</strong> Certificate issuance with explicit scope statement, effective date, and validity period.</li>
            <li><strong className="text-white">Surveillance:</strong> Scheduled reassessments, continuous monitoring obligations, and change-of-scope triggers.</li>
          </ol>
        </section>

        <section className="mb-10" aria-labelledby="evidence-heading">
          <h2 id="evidence-heading" className="text-2xl font-semibold text-white">Evidence requirements</h2>
          <p className="mt-3 text-gray-300">Evidence is the foundation of every ACF decision. Evidence must be authentic, complete, and auditable.</p>
          <ul className="mt-4 list-disc list-inside text-gray-200 space-y-2">
            <li><strong className="text-white">Evidence types:</strong> Configuration exports, architecture diagrams, access control lists, change logs, deployment manifests, test logs, signed statements from responsible owners, and vulnerability scan/penetration test results.</li>
            <li><strong className="text-white">Minimum retention:</strong> Maintain primary evidence for a minimum of three years from issuance; critical incident artifacts must be retained for five years or longer if regulatory obligations demand it.</li>
            <li><strong className="text-white">Signing and chain-of-custody:</strong> All formal evidence must be signed by an authorized custodian. Electronic signatures must be verifiable; chain-of-custody metadata (who collected, when, how) must accompany every artifact.</li>
            <li><strong className="text-white">Data handling:</strong> Sensitive evidence shall be transmitted and stored using approved encryption and access controls. ACF will redact sensitive elements from published summaries while preserving full records for auditors under NDA.</li>
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="assessment-heading">
          <h2 id="assessment-heading" className="text-2xl font-semibold text-white">Assessment process</h2>
          <p className="mt-3 text-gray-300">ACF assessments combine objective measurements, engineered tests, and adversarial validation. Assessors follow documented sampling and test methodologies to produce reproducible results.</p>
          <ul className="mt-4 list-disc list-inside text-gray-200 space-y-2">
            <li><strong className="text-white">Sampling:</strong> Statistically grounded sampling for large estates, with targeted full-scope coverage for critical assets.</li>
            <li><strong className="text-white">Test harnesses:</strong> Automated harnesses execute functional checks, configuration drift detection, and integration tests against production-like environments.</li>
            <li><strong className="text-white">Stress and resilience tests:</strong> Controlled load, failover, and recovery tests to validate SLA and resilience claims; tests are scoped to avoid production disruption unless explicitly agreed.</li>
            <li><strong className="text-white">Red-team engagements:</strong> Where required, adversarial simulations evaluate detection, response, and containment. Red-team scope and rules of engagement are pre-authorized by the organization.</li>
            <li><strong className="text-white">Acceptance criteria:</strong> Objective pass/fail criteria are published in each test plan; partial passes require documented compensating controls and remediation timelines.</li>
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="cert-types-heading">
          <h2 id="cert-types-heading" className="text-2xl font-semibold text-white">Certificate types and scope statements</h2>
          <p className="mt-3 text-gray-300">ACF issues three primary certificate levels. Each includes a scope statement that precisely declares what is and is not covered.</p>
          <dl className="mt-4 space-y-4 text-gray-200">
            <div>
              <dt className="font-semibold text-white">Level 1 — Operational Compliance</dt>
              <dd className="mt-1">Asserts that documented operational controls are implemented and demonstrable against a baseline checklist. Limitations: does not assert resilience under targeted adversary activity or scalability under peak stress.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Level 2 — Technical Assurance</dt>
              <dd className="mt-1">Asserts that technical controls, secure configurations, and automated test suites meet ACF-defined thresholds. Includes vulnerability scanning and functional exploitation tests. Limitations: does not include continuous red-team operations or long-term code quality judgments beyond the evidenced window.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Level 3 — Adversarial Resilience</dt>
              <dd className="mt-1">Asserts resistance to realistic adversary techniques demonstrated via red-team exercises and resilience testing under stress. Scope statements explicitly list the environment, interfaces, and threat model. Limitations: assertions are limited to the tested scope and timeframe; environmental changes may void specific claims.</dd>
            </div>
          </dl>
        </section>

        <section className="mb-10" aria-labelledby="prepare-heading">
          <h2 id="prepare-heading" className="text-2xl font-semibold text-white">How organizations prepare</h2>
          <p className="mt-3 text-gray-300">Preparation is deterministic: organizations that follow ACF guidance shorten assessment time and reduce remediation churn.</p>
          <h3 className="mt-4 font-semibold text-white">Recommended checklist</h3>
          <ul className="mt-3 list-disc list-inside text-gray-200 space-y-2">
            <li>Establish a single evidence owner and point-of-contact for the engagement.</li>
            <li>Produce a formal scope statement and inventory of in-scope assets and interfaces.</li>
            <li>Compile architecture diagrams, IAM matrices, network maps, and deployment manifests.</li>
            <li>Export recent logs, change histories, and backup/restore runbooks.</li>
            <li>Run internal pre-assessments against ACF checklists to remediate low-hanging issues.</li>
            <li>Schedule stakeholder availability for interviews, demonstrations, and remediation windows.</li>
          </ul>

          <h3 className="mt-6 font-semibold text-white">Recommended timelines</h3>
          <ul className="mt-3 list-disc list-inside text-gray-200 space-y-2">
            <li><strong className="text-white">Small deployment (1–3 systems):</strong> 4–6 weeks from scoping to issuance.</li>
            <li><strong className="text-white">Medium deployment (4–20 systems):</strong> 8–12 weeks, including sampling and remediation cycles.</li>
            <li><strong className="text-white">Large or regulated estates:</strong> 3–6 months, with phased assessments and surveillance planning.</li>
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-2xl font-semibold text-white">Contact and next steps</h2>
          <p className="mt-3 text-gray-300">To request a statement of work, schedule a scoping call, or obtain program materials, contact the ACF team. Vincent DORANGE is the program owner; ACF engagements are executed under formal contract and NDA.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="inline-block bg-[color:var(--accent,theme(colors.indigo.600))] hover:opacity-95 text-white font-medium px-5 py-3 rounded-md text-center">Contact ACF</Link>
            <Link href="/partners" className="inline-block border border-gray-700 text-gray-100 px-5 py-3 rounded-md text-center">Partner with ACF</Link>
          </div>
        </section>

        <footer className="pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ACF — Proprietary program owned by Vincent DORANGE. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
