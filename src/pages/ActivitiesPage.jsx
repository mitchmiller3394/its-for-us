export function ActivitiesPage() {
  const ideas = [
    { title: 'Cozy movie night', status: 'Planned' },
    { title: 'Sunset picnic', status: 'Wanted' },
    { title: 'Weekend getaway', status: 'Saved' },
  ]

  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Fun together</p>
            <h2>Activities & date ideas</h2>
          </div>
          <button type="button" className="primary-button">Add idea</button>
        </div>

        <div className="activity-list">
          {ideas.map((idea) => (
            <div key={idea.title} className="activity-item">
              <strong>{idea.title}</strong>
              <span>{idea.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
