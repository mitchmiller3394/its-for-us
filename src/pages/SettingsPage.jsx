export function SettingsPage() {
  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Preferences</p>
            <h2>Couple settings</h2>
          </div>
        </div>

        <div className="settings-list">
          <div className="setting-row">
            <span>Couple name</span>
            <strong>Mitchell & Aly</strong>
          </div>
          <div className="setting-row">
            <span>Anniversary</span>
            <strong>September 14</strong>
          </div>
          <div className="setting-row">
            <span>Private mode</span>
            <strong>Enabled</strong>
          </div>
        </div>
      </section>
    </div>
  )
}
