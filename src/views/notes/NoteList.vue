<script setup lang="ts">
import {onMounted, ref} from "vue";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction,
  AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-vue-next";
import {useAdmin} from "@/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export interface ListNoteUI {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}
const admin = useAdmin()
const noteList = ref<ListNoteUI[]>([]);
const alert = ref(false);
const error = ref(false);
const loading = ref(false);
onMounted(async () => {
  loading.value = true
  await admin.getListNote();
  noteList.value = admin.listNotes
  loading.value = false
});
const noteDelete = async (id: number) => {
  try {
    await admin.deleteNote(id)
    if (admin.message === true) {
      alert.value = true
      await admin.getListNote();
      noteList.value = admin.listNotes
      setTimeout(() => {
        alert.value = false
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
    <div v-if="alert" class="fixed right-5 top-5 z-50 transition-all transform scale-100">
      <Alert>
        <AlertCircle class="w-4 h-4" />
        <AlertTitle style="color: #4ade80"> Success</AlertTitle>
        <AlertDescription>
          Delete Note Success.
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
          Delete note fail!
        </AlertDescription>
      </Alert>
    </div>
    <div class="p-6 min-h-screen">
      <div class=" mx-auto shadow-md rounded-lg pb-5">
        <div class="flex justify-between items-center mb-2">
          <router-link to="/create-note">
            <Button type="button">
              Add Note
            </Button>
          </router-link>
          <div class="flex justify-between items-center space-x-2">
            <Select>
              <SelectTrigger class="w-[280px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel value="">Filter</SelectLabel>
                  <SelectItem value="1">Filter 1</SelectItem>
                  <SelectItem value="2">Filter 2</SelectItem>
                  <SelectItem value="3">Filter 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div class="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="search" />
              <Button type="button">Search</Button>
            </div>
          </div>
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg ">
          <table class="w-full text-sm text-left ">
            <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3">No</th>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Create</th>
              <th scope="col" class="px-6 py-3">Action</th>

            </tr>
            </thead>
            <tbody>
            <tr v-if="loading">
              <td colspan="4" class="text-center py-10">
                <div class="flex justify-center items-center space-x-2">
                  <svg
                      class="animate-spin h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <span class="text-gray-500">Loading...</span>
                </div>
              </td>
            </tr>
            <!-- No Data State -->
            <tr v-if="!loading && noteList.length === 0">
              <td colspan="8" class="text-center py-10">
                <div class="flex justify-center items-center space-x-2">
                  <span class="text-gray-500">No Data</span>
                </div>
              </td>
            </tr>
            <tr v-if="noteList.length > 0" v-for="(item, index) in noteList" :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{index + 1}}</td>
              <td class="px-6 py-4">{{item.title}}</td>
              <td class="px-6 py-4">{{item.createdAt}}</td>
              <td class="flex auto-rows-max px-2 py-3 text-center space-x-2">
                <router-link :to="'/edit-note/'+ item.id">
                  <button class="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm">
                    Edit
                  </button>
                </router-link>
                <button class="bg-amber-400 hover:bg-amber-300 text-white py-1 px-3 rounded text-sm">
                  <AlertDialog>
                    <AlertDialogTrigger>View</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Content</AlertDialogTitle>
                        <AlertDialogDescription>
                           {{item.content}}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm">
                  <AlertDialog>
                    <AlertDialogTrigger>Delete</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the {{item.title}}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction @click="noteDelete(item.id)">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>