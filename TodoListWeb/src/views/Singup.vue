<template>
  <div class="container">
    <SingupForm />
  </div>
</template>

<script lang="ts">
import SingupForm from '../components/Form/Singup.vue'
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
    SingupForm,
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
