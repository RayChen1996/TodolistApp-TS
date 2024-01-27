<template lang="">
  <div class="container">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      data-bs-whatever="@mdo"
    >
      新增
    </button>
    <br />
    <br />
    <div class="container">
      <div
        class="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          checked
        />
        <label class="btn btn-outline-primary" for="btnradio1">全部</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
        />
        <label class="btn btn-outline-primary" for="btnradio2">已完成</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          autocomplete="off"
        />
        <label class="btn btn-outline-primary" for="btnradio3">未完成</label>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">是否啟用</th>
          <th scope="col">工作內容</th>
          <th scope="col">修改</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in TodoData" :key="index">
          <th scope="row">
            <input
              :checked="todo.status"
              class="form-check-input"
              @change="updateTodoSwitch(todo.id)"
              type="checkbox"
              name=""
              id=""
            />
          </th>
          <td :class="{ strikethrough: todo.status }">{{ todo.content }}</td>
          <td>
            <button class="btn btn-info" @click="openModal" type="button">
              修改
            </button>
          </td>
          <td>
            <button
              class="btn btn-danger"
              @click="deleteFromTodoId(todo.id)"
              type="button"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal  -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-show="isEditModalOpen"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增Todo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="message-text" class="col-form-label"
                  >待辦事項:</label
                >
                <textarea
                  v-model="todoText"
                  class="form-control"
                  id="message-text"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
            <button type="button" @click="addTodo" class="btn btn-primary">
              新增待辦
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.strikethrough {
  text-decoration: line-through;
}
</style>
<script lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// const TodoData: any = reactive([])
export default {
  setup() {
    const router = useRouter()

    // 在这里可以使用 router 对象
    console.log('router ', router)
    return {
      todoText: '',
    }
  },
  data() {
    return {
      TodoData: ref([]),
      loading: ref(true),
      isEditModalOpen: false,
    }
  },
  mounted() {
    this.queryTodo()
  },
  methods: {
    queryTodo() {
      const apiUrl = 'https://todolist-api.hexschool.io/'

      fetch(apiUrl + 'todos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('@TodoListToken')}`, //Bearer
        },
      })
        .then(response => {
          if (!response.ok) {
            console.log(response)
          }
          return response.json()
        })
        .then(data => {
          // Handle the data from the API
          const { status } = data

          this.TodoData = data.data
          console.log('TodoData', this.TodoData)
          if (status) {
            console.log(data.data)
          } else {
          }
          console.log('API Response:', data)
          if (data?.status) {
          } else {
          }
        })
        .catch(error => {
          alert(error)
          console.error('Fetch Error:', error)
        })
    },
    deleteFromTodoId(id: string) {
      const apiUrl = 'https://todolist-api.hexschool.io/'

      fetch(apiUrl + 'todos/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('@TodoListToken')}`, //Bearer
        },
      })
        .then(response => {
          if (!response.ok) {
            console.log(response)
          }
          return response.json()
        })
        .then(data => {
          // Handle the data from the API
          const { status } = data

          if (status) {
          } else {
          }
          console.log('API Response:', data)
          if (data?.status) {
          } else {
          }
          this.queryTodo()
        })
        .catch(error => {
          alert(error)
          console.error('Fetch Error:', error)
        })
    },
    addTodo() {
      const apiUrl = 'https://todolist-api.hexschool.io/'
      const sendData = {
        content: this.todoText,
      }
      fetch(apiUrl + 'todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('@TodoListToken')}`, //Bearer
        },
        body: JSON.stringify(sendData),
      })
        .then(response => {
          if (!response.ok) {
            console.log(response)
          }
          return response.json()
        })
        .then(data => {
          // Handle the data from the API
          const { status } = data

          if (status) {
          } else {
          }
          console.log('API Response:', data)
          if (data?.status) {
          } else {
          }
          this.queryTodo()
          this.todoText = ''
        })
        .catch(error => {
          alert(error)
          console.error('Fetch Error:', error)
        })
    },

    updateTodo(id: any) {
      const apiUrl = 'https://todolist-api.hexschool.io/'
      const sendData = {
        content: this.todoText,
      }
      fetch(apiUrl + 'todos/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('@TodoListToken')}`, //Bearer
        },
        body: JSON.stringify(sendData),
      })
        .then(response => {
          if (!response.ok) {
            console.log(response)
          }
          return response.json()
        })
        .then(data => {
          // Handle the data from the API
          const { status } = data

          if (status) {
          } else {
          }
          console.log('API Response:', data)
          if (data?.status) {
          } else {
          }
          this.queryTodo()
        })
        .catch(error => {
          alert(error)
          console.error('Fetch Error:', error)
        })
    },
    closeEditModal() {
      this.isEditModalOpen = false
    },
    openModal() {
      this.isEditModalOpen = true
    },
    updateTodoSwitch(id: any) {
      const apiUrl = 'https://todolist-api.hexschool.io/'

      fetch(apiUrl + 'todos/' + id + '/toggle', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('@TodoListToken')}`, //Bearer
        },
      })
        .then(response => {
          if (!response.ok) {
            console.log(response)
          }
          return response.json()
        })
        .then(data => {
          // Handle the data from the API
          const { status } = data

          if (status) {
          } else {
          }
          console.log('API Response:', data)
          if (data?.status) {
          } else {
          }
          this.queryTodo()
        })
        .catch(error => {
          alert(error)
          console.error('Fetch Error:', error)
        })
    },
  },
}
</script>
