import { useState } from 'react'
import type { FormEvent } from 'react'

interface TaskInputProps {
  addTask: (taskText: string) => void
}

function TaskInput({ addTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState('')
  const normalizedValue = inputValue.trim()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!normalizedValue) {
      return
    }

    addTask(normalizedValue)
    setInputValue('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">
        Nova tarefa
      </label>

      <div className="task-input-wrapper">
        <svg className="task-input-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>

        <input
          id="new-task"
          type="text"
          placeholder="O que você precisa fazer?"
          value={inputValue}
          maxLength={100}
          autoComplete="off"
          onChange={(event) => setInputValue(event.target.value)}
        />
      </div>

      <button type="submit" disabled={!normalizedValue}>
        Adicionar tarefa
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </form>
  )
}

export default TaskInput
