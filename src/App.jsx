import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

function App() {
  const [instruments, setInstruments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchInstruments = async () => {
      if (!supabase) {
        setError('Missing Supabase environment variables. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.')
        setLoading(false)
        return
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from('instruments')
          .select('*')

        if (supabaseError) {
          throw supabaseError
        }

        setInstruments(data ?? [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInstruments()
  }, [])

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
                <span>Live backend</span>
              </li>
            </ul>
          </div>

          <div className="hero-panel" aria-label="App preview">
            <div className="panel-card panel-card-large">
              <span className="label">Project status</span>
              <h2>Supabase connected</h2>
              <div className="mini-bar">
                <span className="fill" />
              </div>

              <div className="supabase-panel">
                {loading && <p>Loading instruments...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && !error && instruments.length === 0 && (
                  <p>No instruments found yet.</p>
                )}
                {!loading && !error && instruments.length > 0 && (
                  <ul>
                    {instruments.map((instrument) => (
                      <li key={instrument.id}>
                        <strong>{instrument.name ?? 'Untitled instrument'}</strong>
                        {instrument.category ? <span>{instrument.category}</span> : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="panel-card panel-card-small">
              <span className="label">Next steps</span>
              <p>Authenticate users and query your own data model.</p>
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
