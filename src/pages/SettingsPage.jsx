import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export function SettingsPage() {
  const { theme, setTheme, themes } = useTheme()
  const { session, signOut } = useAuth()

  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Preferences</p>
            <h2>Couple settings</h2>
          </div>
        </div>

        <div className="settings-list">
          <div className="setting-row">
            <span>Couple name</span>
            <strong>Mitch & Syd</strong>
          </div>
          <div className="setting-row">
            <span>Anniversary</span>
            <strong>September 14</strong>
          </div>
          <div className="setting-row">
            <span>Private mode</span>
            <strong>Enabled</strong>
          </div>
          <div className="setting-row">
            <span>Signed in as</span>
            <strong>{session?.user?.email ?? '—'}</strong>
          </div>
          <div className="setting-row">
            <span>Account</span>
            <button type="button" className="small-button danger-button" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>

        <div className="panel__header" style={{ marginTop: '24px' }}>
          <div>
            <p className="eyebrow">Appearance</p>
            <h2>Theme</h2>
          </div>
        </div>

        <div className="theme-grid">
          {themes.map((option) => (
            <button
              key={option}
              type="button"
              className={`theme-button ${theme === option ? 'is-active' : ''}`}
              onClick={() => setTheme(option)}
            >
              <strong>{option}</strong>
              <div className="theme-preview">{option}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
