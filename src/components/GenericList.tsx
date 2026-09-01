import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import TaskInput from './TaskInput'
import TaskList from './TaskList'
import type { Task, TaskFilter } from '../types/Task'

interface GenericListProps {
  defaultTitle: string
}

const TASKS_STORAGE_KEY = 'taskflow-tasks'
const TITLE_STORAGE_KEY = 'taskflow-list-title'

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') {
    return false
  }

  const task = value as Partial<Task>

  return (
    typeof task.id === 'string' &&
    typeof task.text === 'string' &&
    typeof task.completed === 'boolean' &&
    typeof task.createdAt === 'string'
  )
}

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)

    if (!savedTasks) {
      return []
    }

    const parsedTasks: unknown = JSON.parse(savedTasks)
    return Array.isArray(parsedTasks) ? parsedTasks.filter(isTask) : []
  } catch {
    return []
  }
}

function loadTitle(defaultTitle: string) {
  return localStorage.getItem(TITLE_STORAGE_KEY)?.trim() || defaultTitle
}

function createTaskId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function GenericList({ defaultTitle }: GenericListProps) {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [listTitle, setListTitle] = useState(() => loadTitle(defaultTitle))
  const [titleDraft, setTitleDraft] = useState(listTitle)
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const completedCount = tasks.filter((task) => task.completed).length
  const activeCount = tasks.length - completedCount

  const filteredTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed)
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.completed)
    }

    return tasks
  }, [filter, tasks])

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(TITLE_STORAGE_KEY, listTitle)
  }, [listTitle])

  function addTask(taskText: string) {
    const newTask: Task = {
      id: createTaskId(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
    setFilter('all')
  }

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    )
  }

  function removeTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  function clearCompletedTasks() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed),
    )
    setFilter('all')
  }

  function startEditingTitle() {
    setTitleDraft(listTitle)
    setIsEditingTitle(true)
  }

  function saveTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedTitle = titleDraft.trim()

    if (normalizedTitle) {
      setListTitle(normalizedTitle)
    } else {
      setTitleDraft(listTitle)
    }

    setIsEditingTitle(false)
  }

  function cancelTitleEditing() {
    setTitleDraft(listTitle)
    setIsEditingTitle(false)
  }

  const emptyMessage =
    filter === 'completed'
      ? 'Nenhuma tarefa concluída por enquanto.'
      : filter === 'active'
        ? 'Tudo concluído. Sua lista está em dia!'
        : 'Sua lista está vazia. Adicione a primeira tarefa.'

  return (
    <section className="todo-panel" aria-label={listTitle}>
      <div className="list-heading">
        <div>
          <span className="section-label">Lista ativa</span>

          {isEditingTitle ? (
            <form className="title-form" onSubmit={saveTitle}>
              <label className="sr-only" htmlFor="list-title">
                Nome da lista
              </label>
              <input
                id="list-title"
                value={titleDraft}
                maxLength={48}
                autoFocus
                onChange={(event) => setTitleDraft(event.target.value)}
              />
              <button className="title-action save-title" type="submit">
                Salvar
              </button>
              <button
                className="title-action cancel-title"
                type="button"
                onClick={cancelTitleEditing}
              >
                Cancelar
              </button>
            </form>
          ) : (
            <div className="title-display">
              <h2>{listTitle}</h2>
              <button
                className="edit-title"
                type="button"
                aria-label="Editar nome da lista"
                title="Editar nome da lista"
                onClick={startEditingTitle}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m4 16-.8 4.8L8 20l10.4-10.4a2.1 2.1 0 0 0-3-3L5 17Z" />
                  <path d="m13.8 8.2 3 3" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <span className="saved-locally">
          <span aria-hidden="true" />
          Salvo neste dispositivo
        </span>
      </div>

      <div className="stats-grid" aria-label="Resumo das tarefas">
        <article className="stat-card stat-total">
          <span>Total</span>
          <strong>{tasks.length.toString().padStart(2, '0')}</strong>
          <small>Tarefas adicionadas</small>
        </article>

        <article className="stat-card stat-active">
          <span>Pendentes</span>
          <strong>{activeCount.toString().padStart(2, '0')}</strong>
          <small>Próximas prioridades</small>
        </article>

        <article className="stat-card stat-completed">
          <span>Concluídas</span>
          <strong>{completedCount.toString().padStart(2, '0')}</strong>
          <small>Progresso realizado</small>
        </article>
      </div>

      <TaskInput addTask={addTask} />

      <div className="task-toolbar">
        <div className="filter-group" aria-label="Filtrar tarefas">
          <button
            type="button"
            className={filter === 'all' ? 'is-active' : ''}
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Todas <span>{tasks.length}</span>
          </button>
          <button
            type="button"
            className={filter === 'active' ? 'is-active' : ''}
            aria-pressed={filter === 'active'}
            onClick={() => setFilter('active')}
          >
            Pendentes <span>{activeCount}</span>
          </button>
          <button
            type="button"
            className={filter === 'completed' ? 'is-active' : ''}
            aria-pressed={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >
            Concluídas <span>{completedCount}</span>
          </button>
        </div>

        {completedCount > 0 && (
          <button
            className="clear-completed"
            type="button"
            onClick={clearCompletedTasks}
          >
            Limpar concluídas
          </button>
        )}
      </div>

      {filteredTasks.length > 0 ? (
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          removeTask={removeTask}
        />
      ) : (
        <div className="empty-state">
          <span className="empty-state-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M7 4h10a2 2 0 0 1 2 2v14H5V6a2 2 0 0 1 2-2Z" />
              <path d="M9 9h6M9 13h4" />
            </svg>
          </span>
          <strong>Nada por aqui</strong>
          <p>{emptyMessage}</p>
        </div>
      )}
    </section>
  )
}

export default GenericList
