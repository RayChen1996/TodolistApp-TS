<template lang="">
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="nickname" class="form-label">暱稱</label>
        <input
          v-model="nickname"
          type="text"
          class="form-control"
          id="nickname"
          placeholder=""
        />
        {{ nickname }}
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          v-model="emailInput"
          class="form-control"
          id="email"
          placeholder="name@example.com"
        />
        {{ emailInput }}
      </div>

      <div class="mb-3">
        <label for="pwd" class="form-label">密碼</label>
        <input
          type="password"
          v-model="passwordInput"
          class="form-control"
          autocomplete="current-password"
          id="pwd"
          placeholder=""
        />
        {{ passwordInput }}
      </div>

      <button type="submit" class="btn btn-primary">註冊</button>
      <button type="submit" class="btn btn-outline-primary">
        <router-link to="/singin">前往登入</router-link>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      nickname: 'yi681520',
      emailInput: 'ray.10315332@gmail.com',
      passwordInput: 'As123df000',
    }
  },
  methods: {
    handleSubmit() {
      // 在这里处理提交事件的逻辑
      console.log('表单提交')
      const nickname = this.nickname
      const email = this.emailInput
      const password = this.passwordInput

      console.log(nickname + '' + email + ' ' + password)
      const userData = {
        email: email,
        password: password,
        nickname: nickname,
      }
      const apiUrl = 'https://todolist-api.hexschool.io/'

      fetch(apiUrl + 'users/sign_up', {
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
            alert('註冊成功')
          } else {
            alert(message)
            if (message === '用戶已存在') {
            }
          }
          console.log(message)
          console.log('API Response:', data)
        })
        .catch(error => {
          alert(error)
          console.error('Fetch Error:', error)
        })
    },
  },
}
</script>
