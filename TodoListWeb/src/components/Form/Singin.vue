<template lang="">
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="emailInput"
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
        />
      </div>

      <div class="mb-3">
        <label for="pwd" class="form-label">密碼</label>
        <input
          v-model="passwordInput"
          type="password"
          class="form-control"
          id="pwd"
          placeholder=""
        />
      </div>

      <button type="submit" class="btn btn-primary">登入</button>
      <button type="submit" class="btn btn-outline-primary">
        <router-link to="/singup">註冊</router-link>
      </button>
    </form>
  </div>
</template>

<style lang="scss"></style>
<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emailInput = ref('ray.10315332@gmail.com')
const passwordInput = ref('As123df000')

export default {
  setup() {
    const router = useRouter()
    const handleSubmit = () => {
      const email = emailInput.value
      const password = passwordInput.value

      console.log(email + ' ' + password)
      const userData = {
        email: email,
        password: password,
      }
      const apiUrl = 'https://todolist-api.hexschool.io/'

      fetch(apiUrl + 'users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => {
          if (!response.ok) {
            console.log(response)
          }
          return response.json()
        })
        .then(data => {
          // Handle the data from the API
          const { message, status } = data
          if (status) {
            alert('成功')

            router.push('/')
          } else {
          }
          console.log(message)
          console.log('API Response:', data)
          if (data?.status) {
            localStorage.setItem('@TodoListToken', data?.token)
          } else {
          }
        })
        .catch(error => {
          alert(error)
          console.error('Fetch Error:', error)
        })
    }
    // 在这里可以使用 router 对象
    console.log('router ', router)
    return {
      emailInput,
      passwordInput,
      handleSubmit,
    }
  },
  data() {
    return {
      emailInput: 'ray.10315332@gmail.com',
      passwordInput: 'As123df000',
    }
  },
  methods: {},
}
</script>
