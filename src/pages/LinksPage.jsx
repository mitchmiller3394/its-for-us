export function LinksPage() {
  const links = [
    { name: 'Favorite dinner spot', category: 'Food' },
    { name: 'DIY date night ideas', category: 'Ideas' },
    { name: 'Weekend trip inspiration', category: 'Travel' },
  ]

  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">We should check this out</p>
            <h2>Curated links</h2>
          </div>
          <button type="button" className="primary-button">Add link</button>
        </div>

        <div className="link-list">
          {links.map((link) => (
            <div key={link.name} className="link-item">
              <strong>{link.name}</strong>
              <span>{link.category}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
