export default function ControlPage(){
  return (
    <div className="container pt-12" style={{color: 'var(--acf-text)'}}>
      <header className="pt-6 pb-8">
        <h1 className="text-4xl font-semibold">ACF Control Suite</h1>
        <p className="mt-3 muted max-w-3xl">A prescriptive SaaS offering for runtime enforcement, observability, interruption and audit for ACF policies.</p>
      </header>

      <section className="grid gap-6" style={{display: 'grid'}}>
        <div className="p-6" style={{background: 'linear-gradient(180deg, var(--acf-surface), rgba(7,16,38,0.6))', borderRadius: 12}}>
          <h2 className="text-2xl font-semibold">What is the Control Suite?</h2>
          <p className="mt-3 muted">The ACF Control Suite bundles policy enforcement, selective capabilities gating, real-time interruption APIs, an immutable audit ledger, and an observability hub into a SaaS product designed for prescriptive safety at scale.</p>
        </div>

        <div className="p-6" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
          <div style={{padding: 12}}>
            <h3 className="text-xl font-semibold">Core Components</h3>
            <ul className="mt-3">
              <li className="mt-2"><strong>Policy Engine:</strong> Centralized evaluation service for ACF policies (declarative rules + risk scoring). Fast, versioned, with canary rollouts.</li>
              <li className="mt-2"><strong>Capability Gate:</strong> Fine-grained access toggles that map to runtime capabilities (e.g., code execution, external connector access, PCI data access), evaluated per request.</li>
              <li className="mt-2"><strong>Interrupt API:</strong> Low-latency webhook/SDK that supports human-in-the-loop interrupts, inline holds, and automated quarantines.</li>
              <li className="mt-2"><strong>Audit Ledger:</strong> Append-only, tamper-evident store of decisions, signals and artifacts for compliance and forensics.</li>
              <li className="mt-2"><strong>Observability Hub:</strong> Central metrics, traces, and alerting integrated with common backends (Prometheus, Datadog, Grafana).</li>
            </ul>
          </div>

          <div style={{padding: 12}}>
            <h3 className="text-xl font-semibold">Typical Integrations</h3>
            <ul className="mt-3">
              <li className="mt-2"><strong>Model Serving:</strong> Inline policy checks and soft/hard enforcement before model outputs are returned.</li>
              <li className="mt-2"><strong>Orchestration:</strong> CI/CD and pipeline hooks to gate deployments based on policy score thresholds.</li>
              <li className="mt-2"><strong>Apps & Chat:</strong> SDKs for intercepting user messages, performing inline transformations, or raising interrupts to operators.</li>
              <li className="mt-2"><strong>SIEM/GRC:</strong> Forwarding audit records to Splunk, Elastic, or governance consoles for long-term retention.</li>
            </ul>
          </div>
        </div>

        <div className="p-6" style={{background:'transparent'}}>
          <h2 className="text-2xl font-semibold">Deployment Models</h2>
          <div className="mt-3 muted">We offer three deployment patterns tailored to security and latency needs:</div>
          <ol className="mt-3 muted">
            <li className="mt-2"><strong>SaaS-hosted (default):</strong> Multi-tenant cloud offering with managed scaling, automatic updates and integrated observability. Best for rapid adoption.</li>
            <li className="mt-2"><strong>VPC/Private Cloud:</strong> Single-tenant instance deployed into customer VPC with private networking and optional data egress controls.</li>
            <li className="mt-2"><strong>Edge Gateways:</strong> Lightweight proxies that run close to model serving to minimize latency while still reporting audit records back to the ledger.</li>
          </ol>
        </div>

        <div className="p-6" style={{background: 'linear-gradient(90deg, rgba(12,20,38,0.6), rgba(7,12,24,0.4))', borderRadius: 12}}>
          <h2 className="text-2xl font-semibold">Feature Deep Dive & API samples</h2>

          <h4 className="mt-4 font-semibold">Policy Engine — features</h4>
          <ul className="muted mt-2">
            <li>Rule templates, risk scoring, hierarchical policy inheritance, test harness and dry-run mode.</li>
            <li>Real-time evaluation with <em>fast-path</em> caching and TTLs to keep p99 latency low.</li>
          </ul>

          <h4 className="mt-3 font-semibold">Policy Engine — pseudo API</h4>
          <pre style={{background:'#041025', padding:12, borderRadius:8, overflow:'auto'}}>
            <code className="muted">{`// Evaluate input against a named policy
POST /api/v1/policy/evaluate
Payload: { policyId: 'safety-v2', input: { user: {...}, prompt: '...' } }
Response: { decision: 'allow'|'block'|'review', score: 0.0-100.0, reasons: [...] }
`}</code>
          </pre>

          <h4 className="mt-4 font-semibold">Capability Gate — usage</h4>
          <p className="muted">Use gates to enable or disable sensitive capabilities at runtime based on policy decision and context.</p>
          <pre style={{background:'#041025', padding:12, borderRadius:8, overflow:'auto'}}>
            <code className="muted">{`// Check gate before enabling connector
const result = await acf.gate.check({ gate: 'external-db-write', actor, context });
if (!result.allowed) throw new Error('Capability gated');
`}</code>
          </pre>

          <h4 className="mt-4 font-semibold">Interrupt API — examples</h4>
          <pre style={{background:'#041025', padding:12, borderRadius:8, overflow:'auto'}}>
            <code className="muted">{`// Request human review
POST /api/v1/interrupts
{ type: 'human_review', reason: 'possible pii', metadata: { score: 82 } }
// Webhook to operator -> accept/reject -> POST /api/v1/interrupts/{id}/resolve
`}</code>
          </pre>

          <h4 className="mt-4 font-semibold">Audit Ledger — characteristics</h4>
          <ul className="muted mt-2">
            <li>Append-only records with cryptographic signing and retention policies.</li>
            <li>Queryable by correlation id, policy id, score ranges and time windows.</li>
          </ul>
        </div>

        <div className="p-6" style={{borderRadius:12}}>
          <h2 className="text-2xl font-semibold">Operational Runbooks</h2>

          <h4 className="mt-3 font-semibold">Enforcement Runbook (Low-medium impact)</h4>
          <ol className="muted mt-2">
            <li>Alert triggered when policy violations exceed threshold over 5m window.</li>
            <li>Auto-mitigate: switch policy to dry-run for affected model version while preserving audit logs.</li>
            <li>Notify on-call via PagerDuty with context link to the Audit Ledger and sample artifacts.</li>
            <li>Operator runs an RCA, adjusts rules and schedules a canary release.</li>
          </ol>

          <h4 className="mt-3 font-semibold">Escalation Runbook (High impact / PII exfiltration)</h4>
          <ol className="muted mt-2">
            <li>Immediate: invoke Interrupt API to hold affected sessions and enable capability gates to block data egress.</li>
            <li>Notify security & legal teams, freeze related model deployments, and export ledger slices for forensic analysis.</li>
            <li>Post-incident: rotate keys, update policies, and publish summary to compliance reports.</li>
          </ol>
        </div>

        <div className="p-6" style={{background: 'linear-gradient(90deg, rgba(7,16,38,0.4), rgba(4,8,18,0.4))', borderRadius:12}}>
          <h2 className="text-2xl font-semibold">Mapping Controls to ACF Score</h2>
          <p className="mt-2 muted">Each control produces signals that contribute to the ACF Score — a composite measurement used to determine system risk and enforcement actions.</p>

          <ul className="mt-3 muted">
            <li><strong>Policy Engine:</strong> primary contributor — rule matches and weighted risk factors map into the score (e.g., sensitive-entity-match = +30).</li>
            <li><strong>Capability Gate:</strong> binary modifiers that can elevate or mute the effective score by gating high-risk capabilities (e.g., enabling remote code execution sets a floor on minimum scrutiny).</li>
            <li><strong>Interrupt API:</strong> human-review outcomes feed retrospective score adjustments and model retraining signals.</li>
            <li><strong>Audit Ledger:</strong> historical violation density and trend metrics feed long-term score baselining and threshold tuning.</li>
            <li><strong>Observability Hub:</strong> runtime telemetry (latency, anomaly counts) becomes part of the environmental risk vector used by score calculators.</li>
          </ul>

          <h4 className="mt-3 font-semibold">Score → Action examples</h4>
          <pre style={{background:'#041025', padding:12, borderRadius:8, overflow:'auto'}}>
            <code className="muted">{`if (acfScore >= 90) -> action: BLOCK + notify SOC
else if (acfScore >= 70) -> action: HOLD + human_review
else if (acfScore >= 40) -> action: SOFT_WARN (redact/transform)
else -> action: ALLOW
`}</code>
          </pre>
        </div>

        <footer className="mt-6 p-4 muted" style={{borderTop: '1px solid rgba(255,255,255,0.04)'}}>
          <div className="text-sm">Need this integrated with your stack? The Control Suite exposes SDKs (Node, Python, Go), a REST surface and webhook-based integrations. Contact your ACF representative to enable VPC or edge gateway modes.</div>
        </footer>
      </section>
    </div>
  );
}
