export function CalendarPage() {
  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Shared calendar</p>
            <h2>Upcoming plans</h2>
          </div>
          <button type="button" className="primary-button">Add event</button>
        </div>

        <div className="calendar-placeholder">
          <div className="calendar-grid placeholder-grid">
            {Array.from({ length: 35 }).map((_, index) => (
              <span key={index} className="day-cell">{(index % 7) + 1}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
