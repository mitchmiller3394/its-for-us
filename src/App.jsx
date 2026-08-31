import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">IF</div>
          <span className="brand-name">ItsForUs</span>
        </div>

        <nav className="topnav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Community-driven platform</p>
            <h1>Helping people connect around what matters most.</h1>
            <p className="lead">
              This React + Vite shell is ready for a fast-moving product idea, with a
              clean starting point for future Supabase data, auth, and GitHub Pages
              deployment.
            </p>

            <div className="cta-row">
              <a className="primary-btn" href="#features">
                Explore the app
              </a>
              <a className="secondary-btn" href="#contact">
                Get updates
              </a>
            </div>

            <ul className="stats" aria-label="Project stats">
              <li>
                <strong>Vite</strong>
                <span>Fast setup</span>
              </li>
              <li>
                <strong>React</strong>
                <span>UI foundation</span>
              </li>
              <li>
                <strong>Supabase</strong>
                <span>Future backend</span>
              </li>
            </ul>
          </div>

          <div className="hero-panel" aria-label="App preview">
            <div className="panel-card panel-card-large">
              <span className="label">Project status</span>
              <h2>Ready for build</h2>
              <div className="mini-bar">
                <span className="fill" />
              </div>
              <ul>
                <li>React app scaffolded</li>
                <li>Vite dev/build ready</li>
                <li>GitHub Pages friendly</li>
              </ul>
            </div>
            <div className="panel-card panel-card-small">
              <span className="label">Next steps</span>
              <p>Wire in auth and data</p>
            </div>
          </div>
        </section>

        <section className="feature-grid" id="features">
          <div className="section-heading">
            <p className="eyebrow">Why this setup</p>
            <h2>Built for speed and iteration.</h2>
          </div>

          <div className="feature-cards">
            <article className="feature-card">
              <span className="feature-tag">01</span>
              <h3>Simple foundation</h3>
              <p>
                A clean React app structure lets the team move quickly without fighting
                build tooling.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-tag">02</span>
              <h3>Deployment ready</h3>
              <p>
                The starter is aligned with a static site rollout strategy that can later
                connect to GitHub Pages.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-tag">03</span>
              <h3>Supabase-ready</h3>
              <p>
                The app architecture is prepared for a future backend layer without
                blocking early UI design.
              </p>
            </article>
          </div>
        </section>

        <section className="info-panel" id="about">
          <div>
            <p className="eyebrow">About the project</p>
            <h2>Built to evolve from a landing page into a full product experience.</h2>
          </div>
          <p>
            Start here with a static shell, then layer in Supabase for real data, user
            authentication, and smarter workflows as the product grows.
          </p>
        </section>
      </main>

      <footer className="footer" id="contact">
        <p>ItsForUs</p>
        <a href="mailto:hello@itsforus.app">hello@itsforus.app</a>
      </footer>
    </div>
  )
}

export default App
