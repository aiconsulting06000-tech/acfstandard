import Link from 'next/link'
import React from 'react'

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 via-black to-neutral-950 text-gray-100 antialiased">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            ACF Partner Program
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl">
            Strategic alliances that enable secure, certified deployments and
            enterprise-grade adoption of the ACF standard. Curated and managed by
            Vincent DORANGE to ensure operational excellence and compliance.
          </p>
        </header>

        <section aria-labelledby="overview" className="mb-10">
          <h2 id="overview" className="text-2xl font-semibold text-white mb-3">
            Overview
          </h2>
          <div className="prose prose-invert max-w-3xl text-gray-200">
            <p>
              Partners are central to the ACF ecosystem: they extend the
              platform, deliver verified assessments, implement integrations,
              and operate certified services for end customers. The program is
              curated by Vincent DORANGE and designed to protect integrity,
              ensure interoperability, and provide customers with predictable
              outcomes and auditable assurances.
            </p>
          </div>
        </section>

        <section aria-labelledby="partner-types" className="mb-10">
          <h2 id="partner-types" className="text-2xl font-semibold text-white mb-3">
            Partner Types & Responsibilities
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="p-6 bg-neutral-850 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold text-white">Platform Providers</h3>
              <p className="mt-2 text-gray-300">
                Host, operate, or embed the ACF platform. Responsibilities:
                platform uptime, secure multi-tenant isolation, and certified
                data handling. API access: full platform management APIs,
                tenant lifecycle, billing hooks, and telemetry endpoints.
              </p>
            </article>

            <article className="p-6 bg-neutral-850 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold text-white">Assessors & Auditors</h3>
              <p className="mt-2 text-gray-300">
                Provide independent assurance: run formal assessments,
                evidence collection, and conformance audits against ACF
                controls. API access: read-only evidence ingestion, audit
                report submission endpoints, and signed report distribution.
              </p>
            </article>

            <article className="p-6 bg-neutral-850 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold text-white">Integrators & System
                Integrators</h3>
              <p className="mt-2 text-gray-300">
                Deliver end-to-end integrations, connectors, and custom
                implementations. Responsibilities include testing
                interoperability, maintaining examples and SDKs. API access:
                integration keys, webhook delivery, and sandbox tenant
                provisioning.
              </p>
            </article>

            <article className="p-6 bg-neutral-850 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold text-white">Managed Service
                Partners</h3>
              <p className="mt-2 text-gray-300">
                Operate certified ACF deployments on behalf of customers. Must
                meet SLAs, incident response obligations and participate in
                security reviews. API access: operational dashboards, incident
                telemetry streams, and escalation hooks.
              </p>
            </article>
          </div>
        </section>

        <section aria-labelledby="benefits" className="mb-10">
          <h2 id="benefits" className="text-2xl font-semibold text-white mb-3">
            Partnership Benefits & Obligations
          </h2>
          <div className="prose prose-invert text-gray-200 max-w-3xl">
            <ul>
              <li>
                <strong>Benefits:</strong> co-marketing, priority product
                roadmapping, technical support tiers, access to accreditation
                badges and a certified integrations catalog.
              </li>
              <li>
                <strong>Obligations:</strong> adhere to ACF integration
                guidelines, maintain required SLAs, remediate security
                findings within agreed windows, and submit to periodic audits.
              </li>
              <li>
                <strong>Compliance & Audit Rights:</strong> ACF reserves the
                right to review operational controls, perform remote or on-site
                audits, and require corrective action plans where necessary.
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="onboarding" className="mb-10">
          <h2 id="onboarding" className="text-2xl font-semibold text-white mb-3">
            Onboarding & Accreditation Process
          </h2>
          <div className="prose prose-invert text-gray-200 max-w-3xl">
            <ol>
              <li>
                <strong>Apply:</strong> submit company profile, use cases, and
                references via the contact form.
              </li>
              <li>
                <strong>Technical Review:</strong> API compatibility checks,
                sandbox integration verification, and performance baselining.
              </li>
              <li>
                <strong>Security Review:</strong> code review or architecture
                review, penetration test results, and evidence of secure
                development lifecycle.
              </li>
              <li>
                <strong>Commercial & Legal:</strong> negotiation of terms,
                SLAs, support entitlements, and data processing agreements.
              </li>
              <li>
                <strong>Accreditation:</strong> certified partner status,
                access to production API credentials, marketing assets, and
                the right to display ACF accreditation badges.
              </li>
            </ol>
            <p>
              Typical technical checks include OAuth client validation,
              signed webhook verification, telemetry schema conformance, and
              load testing on a representative tenant.
            </p>
          </div>
        </section>

        <section aria-labelledby="case-study" className="mb-10">
          <h2 id="case-study" className="text-2xl font-semibold text-white mb-3">
            Partner Case Study (Concise)
          </h2>
          <div className="p-6 bg-neutral-850 rounded-lg border border-neutral-800 max-w-3xl">
            <h3 className="text-lg font-semibold text-white">SecureDeploy Inc.</h3>
            <p className="mt-2 text-gray-300">
              SecureDeploy, an integrator, implemented the ACF deployment
              connector and completed accreditation in 8 weeks. They passed
              interoperability tests, completed a two-week performance
              baseline, and were granted managed-service credentials. The
              result: a bank customer achieved certified deployment in a
              regulated environment with a documented 99.95% SLA and annual
              compliance attestations.
            </p>
          </div>
        </section>

        <section aria-labelledby="cta" className="mt-12">
          <h2 id="cta" className="text-2xl font-semibold text-white mb-3">
            Ready to Join?
          </h2>
          <p className="text-gray-300 max-w-3xl">
            If your organization builds, assesses, integrates, or operates
            enterprise systems and you want to deliver certified ACF
            capabilities, apply to the partner program. Our onboarding is
            rigorous, but it ensures customers can trust certified partners in
            mission-critical environments.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-md shadow-md"
            >
              Apply to the Partner Program
            </Link>
          </div>
        </section>

        <footer className="mt-16 text-sm text-gray-500 max-w-3xl">
          <p>
            ACF partner terms and program details are governed by the latest
            program handbook and executed agreements. For urgent enquiries,
            reach out via the contact page.
          </p>
        </footer>
      </div>
    </main>
  )
}
 
