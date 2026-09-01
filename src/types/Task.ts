export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export type TaskFilter = 'all' | 'active' | 'completed'
