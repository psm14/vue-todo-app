import { render, fireEvent, screen } from '@testing-library/vue'
import TodoList from '../components/TodoList.vue'

describe('TodoList', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('adds a new todo', async () => {
    const { container } = render(TodoList)
    
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    
    await fireEvent.update(input, 'Test todo')
    await fireEvent.click(addButton)
    
    const todoElement = container.querySelector('.todo-item span')
    expect(todoElement).toHaveTextContent('Test todo')
  })

  test('marks a todo as completed', async () => {
    const { container } = render(TodoList)
    
    // Add a todo first
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    await fireEvent.update(input, 'Test todo')
    await fireEvent.click(addButton)
    
    const checkbox = container.querySelector('.todo-item input[type="checkbox"]') as HTMLInputElement
    await fireEvent.click(checkbox)
    
    const todoText = container.querySelector('.todo-item span')
    expect(todoText).toHaveClass('completed')
  })

  test('removes a todo', async () => {
    const { container } = render(TodoList)
    
    // Add a todo first
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    await fireEvent.update(input, 'Test todo')
    await fireEvent.click(addButton)
    
    const removeButton = container.querySelector('.remove-btn') as HTMLButtonElement
    await fireEvent.click(removeButton)
    
    const todoElement = container.querySelector('.todo-item')
    expect(todoElement).not.toBeInTheDocument()
  })

  test('edits a todo text', async () => {
    const { container } = render(TodoList)
    
    // Add a todo first
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    await fireEvent.update(input, 'Test todo')
    await fireEvent.click(addButton)
    
    const todoText = container.querySelector('.todo-item span') as HTMLSpanElement
    await fireEvent.dblClick(todoText)
    
    const editInput = container.querySelector('.todo-item input[type="text"]') as HTMLInputElement
    await fireEvent.update(editInput, 'Updated todo')
    await fireEvent.keyUp(editInput, { key: 'Enter' })
    
    const updatedText = container.querySelector('.todo-item span')
    expect(updatedText).toHaveTextContent('Updated todo')
  })

  test('sets a due date on todo', async () => {
    render(TodoList)
    
    // Add a todo first
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    await fireEvent.update(input, 'Test todo')
    await fireEvent.click(addButton)
    
    const todoId = Date.now()
    const dateInput = screen.getByTestId('todo-date-' + todoId)
    await fireEvent.update(dateInput, '2024-12-31')
    
    expect(dateInput).toHaveValue('2024-12-31')
  })

  test('persists todos in localStorage', async () => {
    const { unmount } = render(TodoList)
    
    // Add a todo
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    await fireEvent.update(input, 'Test todo')
    await fireEvent.click(addButton)
    
    // Unmount and remount to test persistence
    unmount()
    render(TodoList)
    
    const todos = JSON.parse(localStorage.getItem('todos') || '[]')
    expect(todos.length).toBe(1)
    expect(todos[0].text).toBe('Test todo')
  })
})