export function TasksPage() {
  const tasks = [
    { title: 'Do the dishes', done: true, tag: 'Home' },
    { title: 'Take out the trash', done: false, tag: 'Home' },
    { title: 'Plan anniversary dinner', done: false, tag: 'Relationship' },
    { title: 'Buy groceries', done: true, tag: 'Errands' },
  ]

  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Household rhythm</p>
            <h2>Tasks & reminders</h2>
          </div>
          <button type="button" className="primary-button">Add task</button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.title} className={`task-item ${task.done ? 'is-done' : ''}`}>
              <input type="checkbox" checked={task.done} readOnly />
              <div>
                <strong>{task.title}</strong>
                <small>{task.tag}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
