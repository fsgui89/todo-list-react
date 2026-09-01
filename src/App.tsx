import GenericList from './components/GenericList'
import './App.css'

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function App() {
  const currentDate = capitalize(
    new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    }).format(new Date()),
  )

  return (
    <main className="app-shell">
      <div className="background-grid" aria-hidden="true" />
      <div className="background-glow background-glow-blue" aria-hidden="true" />
      <div className="background-glow background-glow-violet" aria-hidden="true" />

      <section className="app-container">
        <header className="app-header">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 12.5 10.1 16 17.5 8" />
              </svg>
            </span>

            <div>
              <span className="brand-eyebrow">Organização pessoal</span>
              <strong>TaskFlow</strong>
            </div>
          </div>

          <time className="current-date" dateTime={new Date().toISOString()}>
            {currentDate}
          </time>
        </header>

        <div className="hero-copy">
          <span className="hero-kicker">Seu espaço de produtividade</span>
          <h1>Clareza para fazer o que importa.</h1>
          <p>
            Organize suas prioridades, acompanhe o progresso e conclua o dia
            com tudo sob controle.
          </p>
        </div>

        <GenericList defaultTitle="Minha lista de tarefas" />
      </section>
    </main>
  )
}

export default App
