import { useEffect, useState } from 'react'
import { useCouple } from '../hooks/useCouple'
import { createTask, deleteTask, fetchTasks, toggleTask } from '../services/tasksService'

const LOCAL_FALLBACK = [
  { id: 'demo-1', title: 'Do the dishes', category: 'Home', completed: true },
  { id: 'demo-2', title: 'Take out the trash', category: 'Home', completed: false },
  { id: 'demo-3', title: 'Plan anniversary dinner', category: 'Relationship', completed: false },
  { id: 'demo-4', title: 'Buy groceries', category: 'Errands', completed: true },
]

const EMPTY_FORM = { title: '', category: 'Home' }

export function TasksPage() {
  const { coupleId } = useCouple()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const isConnected = !!coupleId

  useEffect(() => {
    if (!isConnected) {
      setTasks(LOCAL_FALLBACK)
      return
    }

    setLoading(true)
    fetchTasks(coupleId)
      .then(({ data, error: fetchError }) => {
        if (fetchError) setError(fetchError.message ?? fetchError)
        else setTasks(data)
      })
      .finally(() => setLoading(false))
  }, [coupleId, isConnected])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return

    if (!isConnected) {
      setTasks((prev) => [
        { id: Date.now(), title: form.title.trim(), category: form.category, completed: false },
        ...prev,
      ])
      setForm(EMPTY_FORM)
      return
    }

    setSaving(true)
    const { data, error: saveError } = await createTask({
      couple_id: coupleId,
      title: form.title.trim(),
      category: form.category,
    })
    setSaving(false)

    if (saveError) {
      setError(saveError.message ?? saveError)
    } else {
      setTasks((prev) => [data, ...prev])
      setForm(EMPTY_FORM)
    }
  }

  const handleToggle = async (id, current) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !current } : t)),
    )

    if (isConnected) {
      const { error: toggleError } = await toggleTask(id, !current)
      if (toggleError) {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: current } : t)),
        )
        setError(toggleError.message ?? toggleError)
      }
    }
  }

  const handleDelete = async (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    if (isConnected) await deleteTask(id)
  }

  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Household rhythm</p>
            <h2>Tasks & reminders</h2>
          </div>
          {!isConnected && (
            <span className="status-badge status-badge--warning">Demo mode</span>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        <form className="inline-form" onSubmit={handleAdd}>
          <div className="form-grid">
            <label className="form-field">
              <span>Task name</span>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Fold laundry" />
            </label>

            <label className="form-field">
              <span>Category</span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="Home">Home</option>
                <option value="Errands">Errands</option>
                <option value="Planning">Planning</option>
                <option value="Relationship">Relationship</option>
              </select>
            </label>
          </div>

          <button type="submit" className="primary-button" disabled={saving}>
            {saving ? 'Saving…' : 'Add task'}
          </button>
        </form>

        {loading && <p className="muted-text">Loading tasks…</p>}

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'is-done' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id, task.completed)}
                />
                <div>
                  <strong>{task.title}</strong>
                  <div className="task-meta">{task.category}</div>
                </div>
              </div>
              <button type="button" className="small-button danger-button" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
