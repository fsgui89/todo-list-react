import type { Task } from '../types/Task'

interface TaskListProps {
  tasks: Task[]
  toggleTask: (taskId: string) => void
  removeTask: (taskId: string) => void
}

function TaskList({ tasks, toggleTask, removeTask }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? 'is-completed' : ''}`}
        >
          <label className="task-toggle">
            <input
              className="sr-only"
              type="checkbox"
              checked={task.completed}
              aria-label={
                task.completed
                  ? `Marcar ${task.text} como pendente`
                  : `Marcar ${task.text} como concluída`
              }
              onChange={() => toggleTask(task.id)}
            />

            <span className="custom-checkbox" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m6.5 12.5 3.3 3.3 7.7-8" />
              </svg>
            </span>
          </label>

          <div className="task-content">
            <span className="task-text">{task.text}</span>
            <span className="task-status">
              {task.completed ? 'Concluída' : 'Em andamento'}
            </span>
          </div>

          <button
            className="delete-task"
            type="button"
            aria-label={`Excluir a tarefa ${task.text}`}
            title="Excluir tarefa"
            onClick={() => removeTask(task.id)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
