import './App.css'

function App() {
  const quickActions = [
    { title: 'Campus Map', subtitle: 'View buildings and routes', icon: '🗺️' },
    { title: 'My Classes', subtitle: 'View your schedule', icon: '📚' },
    { title: 'Upcoming Events', subtitle: 'See campus happenings', icon: '📅' },
    { title: 'Community', subtitle: 'Connect with the community', icon: '👥' },
    { title: 'Settings', subtitle: 'Customize your app', icon: '⚙️' },
  ]

  return (
    <main className="app-shell">
      <section className="hero-section">

        <div className="hero-copy">
          <h1>Welcome, Tiger!</h1>
          <p className="hero-description">
            What will be your next stop today?
          </p>
        </div>

      </section>

      <section className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <button key={action.title} className="action-card" type="button">
              <span className="action-icon">{action.icon}</span>
              <span className="action-title">{action.title}</span>
              <span className="action-subtitle">{action.subtitle}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App