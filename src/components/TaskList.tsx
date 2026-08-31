import type { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (taskId: number) => void;
}

function TaskList({ tasks, toggleTask }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <span>{task.text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;