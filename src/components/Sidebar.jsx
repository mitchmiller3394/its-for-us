import { NavLink } from 'react-router'

export function Sidebar({ items }) {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">IF</div>
        <div>
          <div className="brand-name">ItsForUs</div>
          <small className="brand-subtitle">our shared life</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' is-active' : ''}`}
          >
            <span className="nav-item__icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
