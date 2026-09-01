import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function Layout({ items, children }) {
  return (
    <div className="app-shell">
      <Sidebar items={items} />

      <main className="main-panel">
        <Topbar />
        <div className="content-panel">{children}</div>
      </main>
    </div>
  )
}
