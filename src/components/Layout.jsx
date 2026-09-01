import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function Layout({ items, activeItem, onSelect, pageTitle, children }) {
  return (
    <div className="app-shell">
      <Sidebar items={items} activeItem={activeItem} onSelect={onSelect} />

      <main className="main-panel">
        <Topbar pageTitle={pageTitle} />
        <div className="content-panel">{children}</div>
      </main>
    </div>
  )
}
