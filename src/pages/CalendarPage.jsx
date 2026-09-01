import { useEffect, useState } from 'react'
import { useCouple } from '../hooks/useCouple'
import { createEvent, deleteEvent, fetchEvents } from '../services/calendarService'

const LOCAL_FALLBACK = [
  {
    id: 'demo-1',
    title: 'Date night',
    start_at: '2026-09-04T19:30:00',
    event_type: 'Date Night',
    description: 'Dinner and a walk downtown.',
  },
  {
    id: 'demo-2',
    title: 'Anniversary planning',
    start_at: '2026-09-10T18:00:00',
    event_type: 'Planning',
    description: 'Talk through plans and ideas.',
  },
]

const EMPTY_FORM = { title: '', date: '', time: '', type: 'Custom', description: '' }

function formatEventDate(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatEventTime(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  const hours = d.getHours()
  const mins = d.getMinutes()
  if (hours === 0 && mins === 0) return ''
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function CalendarPage() {
  const { coupleId } = useCouple()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const isConnected = !!coupleId

  useEffect(() => {
    if (!isConnected) {
      setEvents(LOCAL_FALLBACK)
      return
    }

    setLoading(true)
    fetchEvents(coupleId)
      .then(({ data, error: fetchError }) => {
        if (fetchError) setError(fetchError.message ?? fetchError)
        else setEvents(data)
      })
      .finally(() => setLoading(false))
  }, [coupleId, isConnected])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.date) return

    const startAt = form.time
      ? `${form.date}T${form.time}:00`
      : `${form.date}T00:00:00`

    if (!isConnected) {
      setEvents((prev) => [
        { id: Date.now(), title: form.title, start_at: startAt, event_type: form.type, description: form.description },
        ...prev,
      ])
      setForm(EMPTY_FORM)
      return
    }

    setSaving(true)
    const { data, error: saveError } = await createEvent({
      couple_id: coupleId,
      title: form.title,
      start_at: startAt,
      event_type: form.type,
      description: form.description || null,
    })
    setSaving(false)

    if (saveError) {
      setError(saveError.message ?? saveError)
    } else {
      setEvents((prev) => [data, ...prev])
      setForm(EMPTY_FORM)
    }
  }

  const handleDelete = async (id) => {
    if (!isConnected) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id))
      return
    }
    await deleteEvent(id)
    setEvents((prev) => prev.filter((ev) => ev.id !== id))
  }

  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Shared calendar</p>
            <h2>Upcoming plans</h2>
          </div>
          {!isConnected && (
            <span className="status-badge status-badge--warning">Demo mode</span>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        <form className="inline-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-field">
              <span>Event title</span>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Movie night" />
            </label>

            <label className="form-field">
              <span>Type</span>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="Custom">Custom</option>
                <option value="Date Night">Date Night</option>
                <option value="Planning">Planning</option>
                <option value="Family">Family</option>
                <option value="Travel">Travel</option>
              </select>
            </label>

            <label className="form-field">
              <span>Date</span>
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </label>

            <label className="form-field">
              <span>Time</span>
              <input type="time" name="time" value={form.time} onChange={handleChange} />
            </label>

            <label className="form-field" style={{ gridColumn: '1 / -1' }}>
              <span>Description</span>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="What are you planning?" />
            </label>
          </div>

          <button type="submit" className="primary-button" disabled={saving}>
            {saving ? 'Saving…' : 'Add event'}
          </button>
        </form>

        {loading && <p className="muted-text">Loading events…</p>}

        <div className="event-list">
          {events.map((event) => (
            <article key={event.id} className="event-item">
              <div>
                <strong>{event.title}</strong>
                <div className="event-meta">
                  {formatEventDate(event.start_at)}
                  {formatEventTime(event.start_at) ? ` • ${formatEventTime(event.start_at)}` : ''}
                  {` • ${event.event_type}`}
                </div>
                {event.description && <div className="event-meta">{event.description}</div>}
              </div>
              <button type="button" className="small-button danger-button" onClick={() => handleDelete(event.id)}>
                Delete
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
