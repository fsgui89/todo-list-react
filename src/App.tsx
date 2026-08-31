import GenericList from "./components/GenericList";
import "./App.css";

function App() {
  return (
    <main className="app">
      <h1>Minha To-do List em React</h1>

      <GenericList title="Tarefas da Secretaria" />
    </main>
  );
}

export default App;