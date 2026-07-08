import PublicLayout from "@/components/PublicLayout";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();

  return (
    <PublicLayout>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="eyebrow">Enterprise Commerce Architects</div>
            <h1 className="huge-heading">
              Zero Tech Debt.
              <br />
              Absolute
              <br />
              Uptime.
            </h1>
            <p className="hero-subtitle">
              ENOCA engineers mission-critical enterprise commerce platforms. We
              specialize in high-scale SAP CX Hybris delivery, model-driven
              architecture, and proactive system monitoring.
            </p>
            <div className="btn-group">
              <a href="#solutions" className="btn btn-primary">
                Explore Architecture
              </a>
              <a href="#telemetry" className="btn btn-secondary">
                View Telemetry
              </a>
            </div>
          </div>
          <div className="hero-visual-container">
            <div className="blueprint-lines"></div>
            <div className="relative z-10 text-[var(--accent)] opacity-80 flex flex-col items-center">
              {/* Animated Blueprint Element Placeholder */}
              <div className="w-64 h-64 border border-[var(--accent)] rounded-full animate-[spin_20s_linear_infinite] border-dashed"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs tracking-widest uppercase">System Core</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="py-8 bg-[#030303] border-b border-[var(--border)]">
        <div className="container trust-container !mt-0 !pt-0 !border-t-0">
          <div className="trust-stat">
            <div className="trust-num">
              99.99<span className="accent-plus">%</span>
            </div>
            <div className="trust-label">Guaranteed SLA Uptime</div>
          </div>
          <div className="trust-stat">
            <div className="trust-num">
              50<span className="accent-plus">M+</span>
            </div>
            <div className="trust-label">Daily Transactions</div>
          </div>
          <div className="trust-stat">
            <div className="trust-num">
              15<span className="accent-plus">yrs</span>
            </div>
            <div className="trust-label">SAP Hybris Expertise</div>
          </div>
          <div className="trust-stat">
            <div className="trust-num">
              Zero
            </div>
            <div className="trust-label">Critical Failures</div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY BAR */}
      <section className="credibility-bar">
        <div className="container">
          <div className="logo-carousel-track">
            <div className="tech-logo-item">SAP COMMERCE CLOUD</div>
            <div className="tech-logo-item">NEXT.JS</div>
            <div className="tech-logo-item">SPRING BOOT</div>
            <div className="tech-logo-item">KUBERNETES</div>
            <div className="tech-logo-item">NAGIOS TELEMETRY</div>
          </div>
        </div>
      </section>

      {/* SHOWROOM LIGHT: COMPOSABLE COMMERCE */}
      <section id="solutions" className="section-showroom-light">
        <div className="container">
          <div className="eyebrow mb-8">Model-Driven Architecture</div>
          
          <div className="storytelling-block">
            <div className="story-content">
              <h2 className="section-heading">Decoupled by Design</h2>
              <p className="text-lg">
                We engineer scalable composable commerce platforms separating the
                frontend presentation layer from the backend commerce engine. This
                allows for lightning-fast user experiences while maintaining robust
                enterprise transactional integrity.
              </p>
              <div className="story-tech-specs">
                <span className="tech-badge">Headless Commerce</span>
                <span className="tech-badge">API-First</span>
                <span className="tech-badge">Microservices</span>
              </div>
              <div className="mt-6">
                <a href="/architecture" className="btn-text text-[var(--accent)]">
                  <span>View Specifications</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="story-visual-panel">
              <div className="story-blueprint-label">Fig. 1 — Headless Architecture</div>
              <div className="flex gap-8 items-center text-black/50">
                <div className="p-4 border border-[var(--border-light)]">Next.js UI</div>
                <div>→</div>
                <div className="p-4 border border-[var(--border-light)]">GraphQL API</div>
                <div>→</div>
                <div className="p-4 border border-[var(--border-light)]">SAP Commerce</div>
              </div>
            </div>
          </div>
          
          <div className="storytelling-block">
            <div className="story-visual-panel order-2 lg:order-1">
              <div className="story-blueprint-label">Fig. 2 — Global Monitoring</div>
              <div className="w-full h-full bg-[#050505] p-6 text-[var(--fg)] font-mono text-xs flex flex-col justify-end gap-2">
                <div className="text-green-500">[OK] Database Node 1 Latency: 12ms</div>
                <div className="text-green-500">[OK] Session Cache Hit Rate: 98.4%</div>
                <div className="text-yellow-500">[WARN] Payment Gateway API Spike detected</div>
                <div className="text-green-500">[OK] Auto-scaling Group Expanded</div>
              </div>
            </div>
            <div className="story-content order-1 lg:order-2">
              <h2 className="section-heading">Proactive Telemetry</h2>
              <p className="text-lg">
                Hope is not a strategy. We integrate Nagios and Hyperic HQ to monitor
                the entire technology stack in real-time. We detect anomalies before
                they impact your customers.
              </p>
              <div className="story-tech-specs">
                <span className="tech-badge">Nagios</span>
                <span className="tech-badge">Hyperic HQ</span>
                <span className="tech-badge">Predictive Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTH DASHBOARD */}
      <section id="telemetry" className="health-section py-[128px]">
        <div className="container">
          <div className="health-grid">
            <div>
              <div className="eyebrow mb-4">Live System Status</div>
              <h2 className="section-heading text-white">All Systems Operational</h2>
              <p className="text-[var(--muted)] text-lg max-w-[45ch] mb-8">
                View real-time heartbeat data from our central command. We maintain
                absolute transparency with our enterprise clients regarding system health.
              </p>
              <a href="/status" className="btn btn-secondary">
                View Full Status Page
              </a>
            </div>
            <div className="terminal-container shadow-glow-sm">
              <div className="terminal-header">
                <div>
                  <span className="terminal-status-dot animate-pulse"></span>
                  ENOCA COMMAND LINE
                </div>
                <div>SECURE CONNECTION</div>
              </div>
              <div className="terminal-log-flow">
                <div className="log-line">
                  <span className="log-time">10:45:01.02</span>
                  <span className="log-msg text-white">System initialization check passed.</span>
                </div>
                <div className="log-line">
                  <span className="log-time">10:45:01.15</span>
                  <span className="log-msg text-white">Load balancers optimized across eu-central-1.</span>
                </div>
                <div className="log-line">
                  <span className="log-time">10:45:02.44</span>
                  <span className="log-msg text-green-400">INFO: Zero technical debt detected in latest build.</span>
                </div>
                <div className="log-line">
                  <span className="log-time">10:45:03.12</span>
                  <span className="log-msg text-white">SAP Hybris cronjobs executed successfully.</span>
                </div>
                <div className="log-line">
                  <span className="log-time">10:45:04.88</span>
                  <span className="log-msg text-blue-400">AWAITING INPUT_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}