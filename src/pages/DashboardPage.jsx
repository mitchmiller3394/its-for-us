import { StatCard } from '../components/StatCard'

export function DashboardPage() {
  return (
    <div className="page-grid">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Today for us</p>
            <h2>Life overview</h2>
          </div>
          <button type="button" className="ghost-button">Quick add</button>
        </div>

        <div className="stats-grid">
          <StatCard label="Upcoming plans" value="3" hint="This week" tone="primary" />
          <StatCard label="Open tasks" value="7" hint="2 overdue" tone="warning" />
          <StatCard label="Messages" value="6" hint="4 unread" tone="accent" />
          <StatCard label="Favorites" value="12" hint="Saved memories" tone="success" />
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">This week</p>
            <h2>Upcoming events</h2>
          </div>
        </div>

        <ul className="mini-list">
          <li><strong>Friday</strong> Date night & dinner reservation</li>
          <li><strong>Saturday</strong> Brunch and grocery trip</li>
          <li><strong>Sunday</strong> Family visit planning</li>
        </ul>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Keep up</p>
            <h2>Household rhythm</h2>
          </div>
        </div>

        <ul className="mini-list">
          <li>Dishes: 4 of 5 done</li>
          <li>Trash: scheduled for tomorrow</li>
          <li>Groceries: list needs review</li>
        </ul>
      </section>

      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Spark</p>
            <h2>Question of the day</h2>
          </div>
        </div>

        <blockquote className="quote-box">
          “What is one thing we want more of in our relationship this month?”
        </blockquote>
      </section>
    </div>
  )
}
