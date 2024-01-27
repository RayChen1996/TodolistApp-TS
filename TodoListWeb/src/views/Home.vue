<template>
  <div class="container">
    <h1>代辦事項</h1>
    <TodoComponent />
  </div>
</template>

<script lang="ts">
import TodoComponent from '../components/ListItem/Todo.vue'
export default {
  setup() {},
  components: {
    TodoComponent,
  },
}
</script>
