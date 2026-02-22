
export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--acf-bg)', color: 'var(--acf-text)' }} className="min-h-screen">
      <div className="section">
        <header className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-sm" style={{ color: 'var(--acf-accent)' }}>OFFICIAL STANDARD</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">ACF — Agentic Commerce Framework</h1>

            <p className="mt-6 text-lg max-w-3xl" style={{ color: 'var(--acf-text)' }}>
              ACF — Agentic Commerce Framework by Vincent DORANGE. ACF prescribes policies, measurable controls and assurance practices to safely deploy autonomous agentic systems in commercial settings.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contact" role="button" tabIndex={0} className="btn">Request a Governance Assessment</a>
              <a href="/standard" className="btn">Read the Standard</a>
            </div>
          </div>

          <aside className="rounded-xl p-6 border border-neutral-800" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15), transparent)' }}>
            <EcosystemSVG />
            <div className="mt-4 text-sm text-neutral-400">
              <p className="mb-2">ACF places the standard at the centre of a practical implementation ecosystem. Score, Control and Certification are distinct but interdependent: the Score measures posture, Control enforces and produces evidence, and Certification validates evidence to issue an independent attestation.</p>
              <p>Operationally, Score continuously consumes telemetry and test results to create a repeatable readiness metric; Control applies policy gates and preserves tamper-evident logs used by both Score and Certification; Certification ingests Score reports and Control evidence to perform objective audits and publish time-bound certificates with remediation requirements.</p>
            </div>
          </aside>
        </header>

        <section className="section">
          <h2 className="text-2xl font-semibold">Principes fondateurs</h2>
          <p className="mt-3 muted max-w-3xl">Les principes ACF structurent les exigences normatives et la conception opérationnelle.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Principle title="Séparation Décision/Exécution">Séparer la décision (politique, gouvernance) de l'exécution (agents, runtime) pour éviter la délégation aveugle.</Principle>
            <Principle title="Zones non délégables">Définir des zones d'autorité et de décision qui ne peuvent être déléguées aux agents.</Principle>
            <Principle title="Traçabilité + Interruptibilité">Garantir la traçabilité des décisions et fournir des mécanismes d'interruption et d'arrêt contrôlés.</Principle>
            <Principle title="Gouvernance vivante">Maintenir une gouvernance adaptative et itérative intégrée au cycle opérationnel.</Principle>
          </div>
        </section>

        <section className="section">
          <h2 className="text-2xl font-semibold">Couches opérationnelles</h2>
          <p className="mt-3 muted max-w-3xl">Quatre couches pour structurer la gouvernance et l'implémentation des agents.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-lg border border-neutral-800 p-6 bg-transparent">
              <h4 className="text-amber-300 font-semibold">Gouvernance &amp; Souveraineté</h4>
            </div>
            <div className="rounded-lg border border-neutral-800 p-6 bg-transparent">
              <h4 className="text-amber-300 font-semibold">Politique de Décision</h4>
            </div>
            <div className="rounded-lg border border-neutral-800 p-6 bg-transparent">
              <h4 className="text-amber-300 font-semibold">Système d'Agents</h4>
            </div>
            <div className="rounded-lg border border-neutral-800 p-6 bg-transparent">
              <h4 className="text-amber-300 font-semibold">Exécution &amp; Supervision</h4>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="text-2xl font-semibold">Niveaux de maturité (0–3)</h2>
          <p className="mt-3 muted max-w-3xl">Les niveaux de maturité ACF décrivent une trajectoire mesurable vers la certification.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MaturityCard level={0} title="Automatisation classique" criteria={[ 'Systèmes automatisés traditionnels sans agents décisionnels autonomes.' ]} examples={[ 'Scripts et automations pilotés par règles.' ]} />
            <MaturityCard level={1} title="Agents assistés" criteria={[ 'Agents qui assistent des opérateurs avec interventions humaines fréquentes.' ]} examples={[ 'Agents proposant actions, opérateur décide.' ]} />
            <MaturityCard level={2} title="Agents gouvernés" criteria={[ 'Agents exécutifs avec contrôles runtime et surveillance continue.' ]} examples={[ 'Politiques automatiques, gates et journaux vérifiables.' ]} />
            <MaturityCard level={3} title="Agents autonomes supervisés" criteria={[ 'Agents autonomes opérant sous gouvernance, supervision et re-certification périodique.' ]} examples={[ 'Déploiements en production avec attestations et plans de remédiation.' ]} />
          </div>
        </section>

        <section className="section">
          <h2 className="text-2xl font-semibold">Modules &amp; Score</h2>
          <p className="mt-3 muted max-w-3xl">ACF is organised into 8 modules and supported by a proprietary sovereignty score used for readiness assessment.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-neutral-800 p-6 bg-transparent">
              <h4 className="text-amber-300 font-semibold">8 Modules</h4>
              <ul className="mt-3 list-disc list-inside muted">
                <li>Diagnostic</li>
                <li>Cartographie</li>
                <li>Constitution</li>
                <li>Design</li>
                <li>Sécurité</li>
                <li>Pilotage</li>
                <li>Roadmap</li>
                <li>Gestion de crise</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-800 p-6 bg-transparent">
              <h4 className="text-amber-300 font-semibold">ACF Sovereignty Score</h4>
              <p className="mt-3 muted">A proprietary composite metric assessing sovereignty and governance posture. The methodology is proprietary; the formula is not published.</p>
            </div>
          </div>
        </section>

        <section className="section rounded-lg border border-neutral-800 p-6 flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Partners &amp; Integrators</h3>
            <p className="mt-2 text-neutral-400 max-w-xl">We work with platform providers, managed service partners and accredited auditors to operationalise ACF across industries. Partnership enables consistent implementation, broad availability of certification, and reduced friction for regulated deployments.</p>
          </div>

          <div className="flex gap-3">
            <a href="/partners" className="btn">Explore Partner Network</a>
            <a href="/contact" role="button" tabIndex={0} className="btn">Get in Touch</a>
          </div>
        </section>
      </div>
    </main>
  );
}

function Principle({ title, children }: { title: string; children: React.ReactNode }){
  return (
    <div className="rounded-lg border border-neutral-800 p-6 bg-transparent">
      <h4 className="text-amber-300 font-semibold">{title}</h4>
      <p className="mt-3 text-neutral-400">{children}</p>
    </div>
  )
}

function MaturityCard({ level, title, criteria, examples }: { level: number; title: string; criteria: string[]; examples: string[] }){
  return (
    <article className="rounded-lg border border-neutral-800 p-6 bg-transparent" aria-labelledby={`maturity-${level}`}>
      <div className="text-amber-300 font-semibold">Level {level}</div>
      <h4 id={`maturity-${level}`} className="mt-2 font-semibold">{title}</h4>
      <div className="mt-3 text-neutral-400">
        <strong>Acceptance criteria</strong>
        <ul className="mt-2 list-disc list-inside">
          {criteria.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <div className="mt-3">
          <strong>Examples</strong>
          <ul className="mt-2 list-disc list-inside">
            {examples.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      </div>
    </article>
  )
}

function ProductCard({ name, summary, capabilities, outputs, readinessMapping }: { name: string; summary: string; capabilities: string[]; outputs: string[]; readinessMapping: string }){
  return (
    <section className="rounded-lg border border-neutral-800 p-6 bg-transparent" aria-labelledby={`product-${name}`}>
      <div className="flex items-start justify-between">
        <div>
          <h4 id={`product-${name}`} className="text-amber-300 font-semibold">{name}</h4>
          <div className="text-sm text-neutral-400">{summary}</div>
        </div>
      </div>

      <div className="mt-4 text-neutral-400">
        <strong>Core capabilities</strong>
        <ul className="mt-2 list-disc list-inside">
          {capabilities.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <div className="mt-3">
          <strong>Primary outputs</strong>
          <ul className="mt-2 list-disc list-inside">
            {outputs.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>

        <div className="mt-3 text-sm text-neutral-300">
          <strong>Certification mapping</strong>
          <p className="mt-1">{readinessMapping}</p>
        </div>
      </div>

      <div className="mt-4">
        <a href="/contact" className="text-amber-300 font-medium">Request demo →</a>
      </div>
    </section>
  )
}

function EcosystemSVG(){
  return (
    <figure role="img" aria-label="ACF ecosystem diagram showing ACF Standard with Score, Control, Certification and Partners" className="w-full">
      <svg viewBox="0 0 620 380" className="w-full h-64" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="gold" x1="0" x2="1">
            <stop offset="0" stopColor="var(--acf-accent)" />
            <stop offset="1" stopColor="#f6e9b6" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" rx="8" fill="transparent" />

        {/* center */}
        <g>
          <circle cx="310" cy="190" r="64" fill="#071026" stroke="url(#gold)" strokeWidth="2" />
          <text x="310" y="196" fill="var(--acf-accent)" fontSize="14" fontWeight="700" textAnchor="middle">ACF Standard</text>
        </g>

        {/* satellites */}
        <g fontSize="12" textAnchor="middle" fill="#cbd5e1">
          <g>
            <circle cx="120" cy="80" r="38" fill="#06111a" stroke="url(#gold)" strokeWidth="1.5" />
            <text x="120" y="86">Score</text>
          </g>

          <g>
            <circle cx="500" cy="80" r="38" fill="#06111a" stroke="url(#gold)" strokeWidth="1.5" />
            <text x="500" y="86">Control</text>
          </g>

          <g>
            <circle cx="120" cy="300" r="38" fill="#06111a" stroke="url(#gold)" strokeWidth="1.5" />
            <text x="120" y="306">Certification</text>
          </g>

          <g>
            <circle cx="500" cy="300" r="38" fill="#06111a" stroke="url(#gold)" strokeWidth="1.5" />
            <text x="500" y="306">Partners</text>
          </g>
        </g>

        {/* connective lines */}
        <g stroke="#2b4b5a" strokeWidth="1.6" fill="none">
          <path d="M155 115 L250 160" />
          <path d="M465 115 L370 160" />
          <path d="M155 265 L250 220" />
          <path d="M465 265 L370 220" />
        </g>
      </svg>
    </figure>
  )
}



