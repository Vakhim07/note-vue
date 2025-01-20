<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import {useAdmin} from "@/store";
import router from "@/router";
const admin = useAdmin()
const alert = ref(false)
const error = ref(false)
const title = ref('')
const content = ref('')

const saveNote = async () => {
  try {
    await admin.store(title.value, content.value)
    if (admin.message === true) {
      alert.value = true
      setTimeout(() => {
        alert.value = false
        router.push('/')
      }, 1200)
    } else {
      error.value = true
      setTimeout(() => {
        error.value = false
      }, 3000)
    }
  } catch (err) {
    console.error(err)
    error.value = true
    setTimeout(() => {
      error.value = false
    }, 3000)
  }
}
</script>

<template>
  <div class="relative">
    <div
        v-if="alert"
        class="fixed right-5 top-5 z-50 transition-transform transform scale-100"
    >
      <Alert>
        <AlertCircle class="w-4 h-4" />
        <AlertTitle style="color: #4ade80">
          Success
        </AlertTitle>
        <AlertDescription>
          Created note successfully!
        </AlertDescription>
      </Alert>
    </div>
    <div
        v-if="error"
        class="fixed right-5 top-5 z-50 transition-transform transform scale-100"
    >
      <Alert>
        <AlertCircle class="w-4 h-4" />
        <AlertTitle style="color: #f62121">
          Error
        </AlertTitle>
        <AlertDescription>
          Created note fail!
        </AlertDescription>
      </Alert>
    </div>

    <div class="container mx-auto shadow-md rounded-lg px-10 py-5 w-full">
      <h1 class="font-bold text-black dark:text-white text-2xl mb-5">
        Create Note
      </h1>

      <div class="grid grid-cols-1 gap-x-4">
        <div class="w-full">
          <label
              for="vehicle-name"
              class="block text-sm font-medium py-2"
          >
            Title
          </label>
          <input
              type="text"
              v-model="title"
              id="vehicle-name"
              placeholder="Enter title"
              class="w-full px-4 py-2 mt-1 border rounded-lg
                   focus:ring-indigo-500 focus:border-indigo-500 bg-transparent"
          />
        </div>

        <div class="w-full">
          <label
              for="manufacturer-name"
              class="block text-sm font-medium py-2"
          >
            Content
          </label>
          <Textarea v-model="content" placeholder="Type your message here." />
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-8 text-end">
        <button
            @click="saveNote"
            class="px-8 py-2 text-white bg-indigo-500 rounded-lg
                 hover:bg-indigo-600 focus:outline-none
                 focus:ring-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
