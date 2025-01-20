<script setup lang="ts">
import { ref } from 'vue'
import { useAdmin } from '@/store'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const admin = useAdmin()

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Please fill out all fields.'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    await admin.register(name.value, password.value, email.value)
    if (!admin.message) {
      errorMessage.value = 'Registration failed. Please try again.'
    } else {
      await admin.login(name.value, password.value)
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-700 px-4 py-8">
    <div class="max-w-sm w-full bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

      <label class="block mb-2 text-gray-700" for="name">Name</label>
      <input
          v-model="name"
          id="name"
          type="text"
          placeholder="Enter your name"
          class="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />

      <label class="block mb-2 text-gray-700" for="email">Email</label>
      <input
          v-model="email"
          id="email"
          type="email"
          placeholder="Enter your email"
          class="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />

      <label class="block mb-2 text-gray-700" for="password">Password</label>
      <div class="relative mb-4">
        <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Enter your password"
            class="block w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
            type="button"
            class="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
            @click="togglePasswordVisibility"
        >
          <span v-if="!showPassword">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M1.5 12s3.272-7 10.5-7 10.5 7 10.5 7-3.272 7-10.5 7S1.5 12 1.5 12z"
              />
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9.75A2.25 2.25 0 1014.25 12 2.249 2.249 0 0012 9.75z"
              />
            </svg>
          </span>
          <span v-else>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3l18 18M10.477 10.477a2.25 2.25 0 013.182 3.182m-3.182-3.182L4.5 12S7.772 5 15 5c2.018 0 3.712.45 5.067 1.158M13.523 13.523L19.5 12s-3.272 7-10.5 7c-1.355 0-2.61-.221-3.75-.601"
              />
            </svg>
          </span>
        </button>
      </div>

      <label class="block mb-2 text-gray-700" for="confirmPassword">Confirm Password</label>
      <input
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          id="confirmPassword"
          placeholder="Confirm your password"
          class="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />

      <p v-if="errorMessage" class="text-red-600 mb-4">
        {{ errorMessage }}
      </p>

      <button
          @click="handleRegister"
          :disabled="isLoading"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 w-full rounded flex items-center justify-center"
      >
        <template v-if="isLoading">
          <span class="animate-spin rounded-full h-5 w-5 mr-2 border-2 border-white border-t-transparent"></span>
          Registering...
        </template>
        <template v-else>
          Register
        </template>
      </button>

      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
