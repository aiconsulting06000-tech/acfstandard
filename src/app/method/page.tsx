export default function MethodPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="max-w-4xl">
        <h1 className="text-4xl font-bold">ACF Method</h1>
        <p className="mt-4 text-neutral-400 max-w-3xl">A prescriptive, auditable methodology for governing agentic systems. This page describes the modules, roadmap, deliverables, testing strategy, and a cryptographically verifiable kill-switch design used during certification and operations.</p>
      </header>

      <main className="mt-10 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold">Core Modules</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="p-5 border rounded-lg">
              <h3 className="font-semibold">Governance Strategy</h3>
              <p className="mt-2 text-sm text-neutral-400">Define objectives, scope, roles, and accountability for the system. Deliverables: governance charter, stakeholder map, policy baseline and escalation paths to support auditability and oversight.</p>
            </article>

            <article className="p-5 border rounded-lg">
              <h3 className="font-semibold">Risk Classification</h3>
              <p className="mt-2 text-sm text-neutral-400">Identify and classify risks across safety, privacy, compliance, and operational continuity. Deliverables: risk register, risk scoring model, and prioritized mitigation backlog.</p>
            </article>

            <article className="p-5 border rounded-lg">
              <h3 className="font-semibold">Control Design</h3>
              <p className="mt-2 text-sm text-neutral-400">Design technical and process controls mapped to risks and requirements. Deliverables: control library, control mapping matrices, threat models and control implementation specifications.</p>
            </article>

            <article className="p-5 border rounded-lg">
              <h3 className="font-semibold">Implementation</h3>
              <p className="mt-2 text-sm text-neutral-400">Construct, integrate and configure controls in the system pipeline. Deliverables: implementation plan, integration guides, code/config artifacts and deployment manifests.</p>
            </article>

            <article className="p-5 border rounded-lg">
              <h3 className="font-semibold">Evidence Pipeline</h3>
              <p className="mt-2 text-sm text-neutral-400">Automate collection, normalization and tamper-evident storage of evidence. Deliverables: evidence collectors, signing/transmission workflows, storage indexes and chain-of-custody logs.</p>
            </article>

            <article className="p-5 border rounded-lg">
              <h3 className="font-semibold">Testing & Stress</h3>
              <p className="mt-2 text-sm text-neutral-400">Define test plans spanning functional, security, adversarial and load scenarios. Deliverables: test plans, test harnesses, results, and remediation tickets with pass/fail criteria.</p>
            </article>

            <article className="p-5 border rounded-lg">
              <h3 className="font-semibold">Operational Readiness</h3>
              <p className="mt-2 text-sm text-neutral-400">Prepare runbooks, monitoring, and staff training for safe operations. Deliverables: runbooks, monitoring dashboards, on-call procedures, and incident playbooks.</p>
            </article>

            <article className="p-5 border rounded-lg">
              <h3 className="font-semibold">Certification Handover</h3>
              <p className="mt-2 text-sm text-neutral-400">Consolidate evidence and artefacts for certification and governance review. Deliverables: evidence bundles, certification dossier, executive summary and recommended periodic re-assessment schedule.</p>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6–18 Month Roadmap</h2>
          <p className="mt-3 text-sm text-neutral-400">Recommended phased timeline with quarterly milestones and expected outputs. Adjust pacing by project size and regulatory constraints.</p>

          <div className="mt-6 space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Months 0–3 (Quarter 1)</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Establish Governance Strategy and stakeholder alignment.</li>
                <li>Initial risk classification and control prioritization.</li>
                <li>Deliverables: governance charter, risk register v1, control backlog.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Months 4–6 (Quarter 2)</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Design and prototype critical controls and evidence pipeline.</li>
                <li>Begin integration of monitoring and test harnesses.</li>
                <li>Deliverables: control designs, evidence collectors, test plan drafts.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Months 7–9 (Quarter 3)</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Implement controls into staging and run comprehensive tests.</li>
                <li>Operational readiness: runbooks, monitoring thresholds, on-call training.</li>
                <li>Deliverables: test reports, runbooks v1, deployment manifests.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Months 10–12 (Quarter 4)</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Stress and adversarial testing; iterate controls based on results.</li>
                <li>Prepare certification dossier and evidence bundles for review.</li>
                <li>Deliverables: final test reports, evidence bundle v1, certification packet.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Months 13–18 (Optional Extended Phase)</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Production rollout, continuous monitoring, and scheduled re-assessments.</li>
                <li>Third-party audits and incremental hardening based on operational telemetry.</li>
                <li>Deliverables: certification issuance, operational SLAs, periodic audit plan.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Deliverables</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Artefacts</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Governance charter, policy documents and control specifications.</li>
                <li>Threat models, architecture diagrams and deployment manifests.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Evidence Bundles</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Timestamps and signed logs, chain-of-custody records, test artefacts.</li>
                <li>Indexed evidence packages suitable for auditors and certification reviewers.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Runbooks & Playbooks</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Operational runbooks, escalation playbooks and rollback procedures.</li>
                <li>On-call checklists, communication templates and recovery steps.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Test Reports</h4>
              <ul className="mt-2 list-disc ml-5 text-sm text-neutral-400">
                <li>Functional, load, adversarial and scenario test reports with pass/fail criteria.</li>
                <li>Remediation logs and regression test matrices for follow-up validation.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Stress Tests & Kill Switch Design</h2>

          <div className="mt-4 space-y-4 text-sm text-neutral-400">
            <div>
              <h4 className="font-semibold">Test Types</h4>
              <ul className="mt-2 list-disc ml-5">
                <li><strong>Scenario-based:</strong> Realistic operational scenarios including failure cascades and dependency outages to validate resilience.</li>
                <li><strong>Adversarial:</strong> Red-team style tests and prompt/attack vectors that attempt to elicit unsafe behavior.</li>
                <li><strong>Load / Stress:</strong> High-throughput and resource-exhaustion tests that expose performance degradation and limits.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Success Criteria</h4>
              <ul className="mt-2 list-disc ml-5">
                <li>Defined SLOs for availability and response time remain within thresholds during load tests.</li>
                <li>No safety or privacy breaches in adversarial scenarios beyond documented tolerances.</li>
                <li>All critical controls pass functional verification and evidence is cryptographically signed and indexed.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Cryptographically Verifiable Kill-Switch</h4>
              <p className="mt-2">Design a kill-switch that is auditable, tamper-evident and cryptographically verifiable. The design combines a signed policy envelope, multi-party authorization, and an on-chain or append-only ledger entry to record the trigger and proof-of-invocation.</p>
              <ul className="mt-2 list-disc ml-5">
                <li><strong>Signed Policy Envelope:</strong> The kill-switch policy (conditions, scope) is digitally signed by governance principals.</li>
                <li><strong>Multi-Party Authorization:</strong> Require M-of-N signatures (e.g., 3-of-5) before activation to avoid unilateral shutdowns.</li>
                <li><strong>Tamper-Evident Ledger:</strong> Log activation requests and confirmations to an append-only ledger (blockchain or WORM storage) with signatures for post-incident audit.</li>
                <li><strong>Automated Enforcer:</strong> A short, auditable sequence of actions executed by an isolated enforcer service (e.g., revoke keys, disable endpoints, isolate models) that publishes signed receipts.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Incident Response Outline</h4>
              <ol className="mt-2 list-decimal ml-5">
                <li>Detect: Monitoring triggers an alert with signed evidence pushed to the Evidence Pipeline.</li>
                <li>Assess: On-call team performs rapid triage using runbooks and threat decision matrix.</li>
                <li>Contain: If containment is required, initiate the kill-switch request flow with multi-party approvals.</li>
                <li>Remediate: Execute mitigation steps, collect post-incident evidence and run validation tests.</li>
                <li>Recover & Review: Restore services per runbook, run regression tests, and produce an incident report with signed evidence and lessons learned.</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <h2 className="text-2xl font-semibold">How to Use This Page</h2>
          <p className="mt-3 text-sm text-neutral-400">Use these modules as a checklist during program planning and certification. Copy artefacts into your evidence pipeline, enforce cryptographic signing for all critical evidence, and operate stress tests regularly as part of the continuous assurance cycle.</p>
        </section>
      </main>
    </div>
  );
}
