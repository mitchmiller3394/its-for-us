export function AlbumsPage() {
  const photos = ['A', 'B', 'C', 'D']

  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Our memories</p>
            <h2>Photo album</h2>
          </div>
          <button type="button" className="primary-button">Upload photos</button>
        </div>

        <div className="photo-grid">
          {photos.map((label, index) => (
            <div key={label + index} className="photo-tile">
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
