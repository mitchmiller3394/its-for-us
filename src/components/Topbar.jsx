import { useTheme } from '../context/ThemeContext'

export function Topbar({ pageTitle }) {
  const { theme, setTheme, themes } = useTheme()

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow eyebrow--light">Couple dashboard</p>
        <h1>{pageTitle}</h1>
      </div>

      <div className="topbar__controls">
        <div className="theme-picker" aria-label="Choose interface theme">
          {themes.map((option) => (
            <button
              key={option}
              type="button"
              className={`theme-option ${theme === option ? 'is-active' : ''}`}
              onClick={() => setTheme(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
