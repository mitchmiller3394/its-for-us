export function StatCard({ label, value, hint, tone = 'default' }) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value}</strong>
      {hint ? <small className="stat-card__hint">{hint}</small> : null}
    </div>
  )
}
