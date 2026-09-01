export function MessagesPage() {
  const posts = [
    { author: 'Mitch', text: 'You make every day feel calmer and easier.', time: 'Today' },
    { author: 'Syd', text: 'Let’s do a movie night this weekend and order something cozy.', time: 'Yesterday' },
    { author: 'Mitch', text: 'I loved the way we laughed together at brunch.', time: 'Last week' },
  ]

  return (
    <div className="page-grid page-grid--single">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Love notes</p>
            <h2>Message board</h2>
          </div>
          <button type="button" className="primary-button">New post</button>
        </div>

        <div className="message-list">
          {posts.map((post) => (
            <article key={`${post.author}-${post.time}`} className="message-card">
              <div className="message-card__meta">
                <strong>{post.author}</strong>
                <span>{post.time}</span>
              </div>
              <p>{post.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
