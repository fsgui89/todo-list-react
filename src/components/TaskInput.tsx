import { useState } from "react";
import type { FormEvent } from "react";

interface TaskInputProps {
  addTask: (taskText: string) => void;
}

function TaskInput({ addTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() !== "") {
      addTask(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Digite uma nova tarefa"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskInput;
