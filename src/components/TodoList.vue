<template>
  <div class="todo-list">
    <div class="add-todo">
      <input
        v-model="newTodoText"
        @keyup.enter="addTodo"
        placeholder="Add a new todo"
        data-testid="new-todo-input"
      />
      <button @click="addTodo" data-testid="add-todo-button">Add</button>
    </div>

    <ul class="todos">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-content">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
            :data-testid="'todo-checkbox-' + todo.id"
          />
          <input
            v-if="editingId === todo.id"
            v-model="editText"
            @blur="saveTodoText"
            @keyup.enter="saveTodoText"
            @keyup.esc="cancelEdit"
            :data-testid="'todo-edit-input-' + todo.id"
            ref="editInput"
            type="text"
          />
          <span
            v-else
            @dblclick="startEdit(todo)"
            :class="{ completed: todo.completed }"
            :data-testid="'todo-text-' + todo.id"
          >
            {{ todo.text }}
          </span>
          <input
            type="date"
            v-model="todo.dueDate"
            :data-testid="'todo-date-' + todo.id"
          />
        </div>
        <button
          @click="removeTodo(todo.id)"
          class="remove-btn"
          :data-testid="'todo-remove-' + todo.id"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
  dueDate: string
}

export default defineComponent({
  name: 'TodoList',
  setup() {
    const todos = ref<Todo[]>([])
    const newTodoText = ref('')
    const editingId = ref<number | null>(null)
    const editText = ref('')
    const editInput = ref<HTMLInputElement | null>(null)

    const loadTodos = () => {
      const savedTodos = localStorage.getItem('todos')
      if (savedTodos) {
        todos.value = JSON.parse(savedTodos)
      }
    }

    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos.value))
    }

    const addTodo = () => {
      if (newTodoText.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodoText.value.trim(),
          completed: false,
          dueDate: ''
        })
        newTodoText.value = ''
        saveTodos()
      }
    }

    const removeTodo = (id: number) => {
      todos.value = todos.value.filter(todo => todo.id !== id)
      saveTodos()
    }

    const toggleTodo = (id: number) => {
      const todo = todos.value.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
        saveTodos()
      }
    }

    const startEdit = (todo: Todo) => {
      editingId.value = todo.id
      editText.value = todo.text
    }

    const saveTodoText = () => {
      if (editingId.value !== null) {
        const todo = todos.value.find(t => t.id === editingId.value)
        if (todo && editText.value.trim()) {
          todo.text = editText.value.trim()
          saveTodos()
        }
        editingId.value = null
      }
    }

    const cancelEdit = () => {
      editingId.value = null
    }

    onMounted(() => {
      loadTodos()
    })

    return {
      todos,
      newTodoText,
      editingId,
      editText,
      editInput,
      addTodo,
      removeTodo,
      toggleTodo,
      startEdit,
      saveTodoText,
      cancelEdit
    }
  }
})
</script>

<style scoped>
.todo-list {
  margin-top: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

.todos {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.remove-btn {
  background-color: #dc3545;
  padding: 4px 8px;
  font-size: 16px;
}

.remove-btn:hover {
  background-color: #c82333;
}

input[type="date"] {
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>