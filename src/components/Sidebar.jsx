export function Sidebar({ items, activeItem, onSelect }) {
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
          <button
            key={item.id}
            type="button"
            className={`nav-item ${activeItem === item.id ? 'is-active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="nav-item__icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
