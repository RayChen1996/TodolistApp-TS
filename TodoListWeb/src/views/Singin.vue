<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import LoginForm from '../components/Form/Singin.vue'
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    return {
      count,
    }
  },
  mounted() {
    console.log('掛載組件')
  },
  unmounted() {
    console.log('卸載組件')
  },
  components: {
    LoginForm,
  },
  methods: {
    addCount() {
      this.count++
      console.log('aaa', this.count)
    },
    decCount() {
      this.count--
      console.log('aaa', this.count)
    },
  },
}
</script>
