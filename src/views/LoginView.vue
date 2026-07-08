<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { filterUsernameInput, filterPhoneInput } from '../utils/validation'

const router = useRouter()
const authStore = useAuthStore()
const { loginError } = storeToRefs(authStore)

const username = ref('')
const phone = ref('')
const submitting = ref(false)

function onUsernameInput(event) {
  username.value = filterUsernameInput(event.target.value)
}

function onPhoneInput(event) {
  phone.value = filterPhoneInput(event.target.value)
}

async function onSubmit() {
  submitting.value = true

  try {
    const user = await authStore.login(username.value, phone.value)
    if (user) {
      router.push('/dashboard')
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="login-layout">
    <header class="login-header" aria-hidden="true"></header>

    <main class="login-main">
      <div class="login-form">
        <div class="login-form__head">Login</div>

        <div class="login-form__body">
          <form class="login-form__fields" @submit.prevent="onSubmit">
            <div class="input-wrap">
              <input
                id="username"
                :value="username"
                type="text"
                name="username"
                autocomplete="username"
                aria-label="Username"
                placeholder="Username"
                @input="onUsernameInput"
              />
            </div>

            <div class="input-wrap">
              <input
                id="phone"
                :value="phone"
                type="text"
                name="phone"
                autocomplete="tel"
                aria-label="Phone Number"
                placeholder="Phone Number"
                @input="onPhoneInput"
              />
            </div>

            <div class="input-wrap">
              <button
                type="submit"
                class="login-button"
                :class="{ loading: submitting }"
                :disabled="submitting"
              >
                Login
              </button>
            </div>

            <p v-if="loginError" class="login-error" role="alert">{{ loginError }}</p>
          </form>
        </div>
      </div>
    </main>

    <footer class="login-footer" aria-hidden="true"></footer>
  </div>
</template>

<style scoped>
.login-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.login-header {
  height: 60px;
  background-color: #474747;
  flex-shrink: 0;
}

.login-footer {
  height: 200px;
  background-color: #474747;
  flex-shrink: 0;
}

.login-main {
  flex: 1;
  background-color: #545454;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 90px 16px;
}

.login-form {
  width: 100%;
  max-width: 500px;
}

.login-form__head {
  min-height: 50px;
  padding: 15px;
  background-color: #a5a5a5;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f5f5f;
  font-size: 18px;
  font-weight: 700;
}

.login-form__body {
  background-color: #c3c3c3;
  color: #5f5f5f;
  padding: 20px 25px 35px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.input-wrap + .input-wrap {
  margin-top: 15px;
}

.input-wrap input {
  width: 100%;
  padding: 13px 10px;
  font-size: 18px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 0;
  background-color: #fafafa;
  color: #353535;
}

.input-wrap input::placeholder {
  color: #9a9a9a;
  opacity: 1;
}

.login-button {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: 0;
  border-radius: 5px;
  background-color: #519945;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s linear;
}

.login-button:hover:not(:disabled) {
  background-color: #38702f;
}

.login-button:disabled {
  cursor: not-allowed;
  background-color: #93b48d;
}

.login-error {
  margin: 10px 0 0;
  color: #ff0000;
  font-size: 16px;
}

@media (max-width: 520px) {
  .login-main {
    padding: 40px 16px;
  }

  .login-form__head,
  .input-wrap input,
  .login-button {
    font-size: 16px;
  }
}
</style>
