<template>
  <div class="todo-app">
    <h1>Todo List</h1>
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoList from './components/TodoList.vue'

export default defineComponent({
  name: 'App',
  components: {
    TodoList
  }
})
</script>

<style>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
}
</style>