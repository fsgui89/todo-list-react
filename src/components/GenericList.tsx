import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import type { Task } from "../types/Task";

interface GenericListProps {
  title: string;
}

function GenericList({ title }: GenericListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskText: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  useEffect(() => {
    const pendingTasks = tasks.filter((task) => !task.completed);

    if (pendingTasks.length !== tasks.length) {
      setTasks(pendingTasks);
    }
  }, [tasks]);

  return (
    <section className="todo-card">
      <h2>{title}</h2>

      <TaskInput addTask={addTask} />

      {tasks.length > 0 ? (
        <TaskList tasks={tasks} toggleTask={toggleTask} />
      ) : (
        <p className="empty-message">Nenhuma tarefa pendente.</p>
      )}
    </section>
  );
}

export default GenericList;