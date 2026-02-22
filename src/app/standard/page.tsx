export default function StandardPage() {
  return (
    <div className="container pt-12 pb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold">ACF Standard — Agentic Commerce Framework</h1>
        <p className="mt-2 text-sm text-neutral-400">ACF — Agentic Commerce Framework — Proprietary program owned by Vincent DORANGE.</p>
        <p className="mt-3 text-neutral-400 max-w-3xl">This document sets the normative specification for the design, governance and certification of agentic systems under the ACF. It establishes definition, objectives, scope and the normative relationship with other regulatory regimes; it also provides measurable control objectives and example evidence types for assessment and certification.</p>
      </header>

      <main className="space-y-10">
        <section className="rounded-lg border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">1. Official Definition</h2>
          <p className="mt-4 text-neutral-300 max-w-4xl">For the purposes of conformity assessment and certification, the ACF defines:</p>
          <div className="mt-4 text-neutral-400 max-w-4xl space-y-2">
            <p><strong>Agentic System:</strong> an engineered system that is designed, configured or emergently functions to autonomously perceive, reason, plan, or act on behalf of stakeholders across one or more task domains, where those actions can materially affect persons, property or institutional processes.</p>
            <p><strong>ACF Standard (normative):</strong> a set of mandatory and informative provisions that specify control objectives, measurement criteria and evidence requirements to govern the safe, reliable and auditable behaviour of agentic systems through their lifecycle, including design, deployment, operation, monitoring and decommissioning.</p>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">2. Objectives</h2>
          <p className="mt-3 text-neutral-400 max-w-4xl">The ACF Standard pursues the following objectives:</p>
          <ul className="mt-4 grid gap-2 list-inside list-disc grid-cols-1 md:grid-cols-2 text-neutral-300">
            <li>Ensure predictable, interpretable and controllable agent behaviour across operational contexts.</li>
            <li>Preserve human oversight and authority for critical decisions and escalation paths.</li>
            <li>Require measurable risk mitigation for safety, privacy, and security impacts from agent actions.</li>
            <li>Establish auditable evidence collection and retention practices for agent decisions and learning.</li>
            <li>Enable interoperable assessment criteria for independent conformity assessment and certification.</li>
            <li>Support continuous monitoring, feedback-driven improvement and incident response readiness.</li>
            <li>Promote transparency of capability boundaries and limitation statements to stakeholders.</li>
            <li>Facilitate alignment between technical controls and governance frameworks for deployment environments.</li>
          </ul>
        </section>

        <section className="rounded-lg border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">3. Normative Scope</h2>
          <p className="mt-3 text-neutral-400 max-w-4xl">The ACF Standard applies to agentic systems when any of the following are true:</p>
          <ul className="mt-4 text-neutral-300 list-disc list-inside">
            <li>The system exercises decision-making or action-taking capability without continuous human intervention.</li>
            <li>The system's actions have potential to materially affect safety, financial outcomes, privacy, or legal/compliance obligations.</li>
            <li>The system adapts behaviour through online learning or policy updates in production environments.</li>
          </ul>
          <p className="mt-4 text-neutral-400 max-w-4xl">The Standard covers requirements across lifecycle phases: requirements engineering, model development, simulation & testing, deployment configuration, runtime monitoring, logging & evidence capture, incident response, and decommissioning. It does not itself create statutory penalties; rather it provides auditable criteria that integrate with regulatory obligations and certification schemes.</p>
        </section>

        <section className="rounded-lg border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">4. Differences and Complementarity: ACF vs GDPR and AI Act</h2>
          <p className="mt-3 text-neutral-400 max-w-4xl">This section explains how the ACF Standard differs from and complements the GDPR and the EU AI Act, focusing on agent behaviour governance, evidence collection and certification practice. This is explanatory, not legal advice.</p>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Agent behaviour governance</h3>
              <ul className="mt-3 text-neutral-300 list-disc list-inside">
                <li>ACF: Prescriptive control objectives for runtime constraints, failure modes, and human-in-the-loop boundaries for agentic decision-making.</li>
                <li>GDPR: Primarily protects personal data and individual rights (e.g., data minimisation, access), not agent behaviour per se.</li>
                <li>AI Act: Regulates AI systems by risk category and imposes obligations (transparency, documentation) — ACF provides technical control-level mappings that implement many AI Act obligations for agentic behaviour.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Evidence collection & traceability</h3>
              <ul className="mt-3 text-neutral-300 list-disc list-inside">
                <li>ACF: Specifies auditable evidence types (decision logs, inputs/outputs, reward signals, model versions, configuration snapshots) and retention metrics needed for conformity assessment.</li>
                <li>GDPR: Evidence collection in GDPR focuses on lawful basis, consent records, DPIAs; data minimisation and deletion requirements can constrain evidence retention that contains personal data.</li>
                <li>AI Act: Requires technical documentation and recording for high-risk systems; ACF operationalises these requirements into measurable evidence artefacts for agentic functions.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Certification and scope</h3>
            <p className="mt-3 text-neutral-300">ACF defines conformity criteria and evidence sufficient for assessor judgement and certificate issuance against agentic controls. GDPR compliance is necessary when personal data are processed — ACF evidence practices should be aligned to GDPR retention and minimisation. The AI Act's risk-based obligations map to ACF risk classes; ACF complements the AI Act by providing technical measurement and test criteria that support notified body assessments or third-party certification.</p>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">5. Normative Positioning and Compliance Mapping</h2>
          <p className="mt-3 text-neutral-400 max-w-4xl">The ACF Standard is intended to be used by implementers, assessors and certifiers. It maps to existing standards and compliance regimes as follows:</p>
          <ul className="mt-4 text-neutral-300 list-disc list-inside">
            <li><strong>Standards alignment:</strong> Maps to ISO/IEC security and quality frameworks by reusing common control objectives (access control, change management, logging) while adding agent-specific objectives (behavioural constraints, decision provenance).</li>
            <li><strong>Compliance regimes:</strong> Supports evidence needs for the AI Act's high-risk assessments and can be integrated into privacy impact assessment processes required by GDPR.</li>
            <li><strong>Certification practice:</strong> Enables conformity assessment bodies to define scope statements, test harnesses, and audit trails. The Standard prescribes measurable acceptance criteria, sampling methods, and minimum evidence retention windows to support repeatable certification outcomes.</li>
          </ul>

          <div className="mt-4">
            <h3 className="font-semibold">Measurable control objectives & evidence types</h3>
            <p className="mt-2 text-neutral-300">Each control objective in ACF is expressed with: a clear purpose statement, a measurable metric (or pass/fail test), required evidence artefacts, and an assigned responsible party. Common evidence types include configuration manifests, model provenance records, immutable decision logs, test harness results, incident tickets and deployment snapshots.</p>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">6. Example Control Matrix</h2>
          <p className="mt-3 text-neutral-400 max-w-4xl">The table below provides six representative controls showing the control objective, measurement, evidence and typical responsible party.</p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="py-2 pr-6">Control</th>
                  <th className="py-2 pr-6">Control Objective</th>
                  <th className="py-2 pr-6">Measurement</th>
                  <th className="py-2 pr-6">Evidence</th>
                  <th className="py-2">Responsible</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-neutral-800">
                  <td className="py-3">C1 — Decision Provenance</td>
                  <td className="py-3">Capture immutable provenance for each agent decision.</td>
                  <td className="py-3">Proportion of decisions with complete provenance &gt;= 99% over sampling window.</td>
                  <td className="py-3">Append-only decision logs, model version IDs, input hashes, timestamped signatures.</td>
                  <td className="py-3">Platform Engineering</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="py-3">C2 — Human Oversight</td>
                  <td className="py-3">Ensure effective human intervention points for critical actions.</td>
                  <td className="py-3">Latency and success rate of manual override tests; override coverage for critical paths.</td>
                  <td className="py-3">Override procedure documentation, test reports, incident logs showing override usage.</td>
                  <td className="py-3">Product Owner / Ops</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="py-3">C3 — Input Sanitisation</td>
                  <td className="py-3">Prevent harmful or out-of-scope inputs from triggering unsafe actions.</td>
                  <td className="py-3">Percentage of rejected or safely-handled out-of-scope input events in fuzz tests.</td>
                  <td className="py-3">Sanitisation ruleset, test harness outputs, runtime filtering logs.</td>
                  <td className="py-3">Security / ML Ops</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="py-3">C4 — Behavioural Constraints</td>
                  <td className="py-3">Enforce policy constraints on agent actions (e.g., no unauthorised transfers).</td>
                  <td className="py-3">Policy-check pass rate in sampled simulated runs; failed policy incidents = 0 target.</td>
                  <td className="py-3">Policy engine logs, policy definitions, simulation reports.</td>
                  <td className="py-3">Governance / Compliance</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="py-3">C5 — Model Change Control</td>
                  <td className="py-3">Control, test and approve model updates before production deployment.</td>
                  <td className="py-3">Percentage of model updates with completed pre-deployment test matrix and rollback plan.</td>
                  <td className="py-3">Change requests, test matrices, canary deployment logs, rollback runbooks.</td>
                  <td className="py-3">ML Engineering / Release Management</td>
                </tr>

                <tr>
                  <td className="py-3">C6 — Incident Detection & Response</td>
                  <td className="py-3">Detect anomalous agent behaviour and respond within defined SLAs.</td>
                  <td className="py-3">MTTD/MTTR against SLA; number of missed alerts in retrospective analyses.</td>
                  <td className="py-3">Monitoring alerts, incident tickets, post-incident reports, corrective action plans.</td>
                  <td className="py-3">SRE / Security</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">7. Implementation Notes</h2>
          <ul className="mt-3 text-neutral-300 list-disc list-inside">
            <li>Assessors should use representative sampling and synthetic simulations in combination with production evidence to evaluate controls.</li>
            <li>When personal data is involved, evidence collection must be bal‑anced with data protection obligations; anonymisation or policy-based access to evidence repositories is recommended.</li>
            <li>Certification scopes must state the agentic capabilities covered, the test harness versions used, the evidence retention windows and the responsible legal entity.</li>
          </ul>
        </section>

        <footer className="text-sm text-neutral-500">© ACF Standards — Normative guidance for agentic systems. This document explains technical and compliance mappings and is not legal advice.</footer>
      </main>
    </div>
  );
}
