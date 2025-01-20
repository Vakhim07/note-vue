<script setup lang="ts">
import {Badge} from '@/components/ui/badge'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
</script>

<template>
  <div class="grid h-screen w-full pl-[56px]">
    <div class="flex flex-col">
      <header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 class="text-xl font-semibold">
          Playground
        </h1>

        <Button
            variant="outline"
            size="sm"
            class="ml-auto gap-1.5 text-sm"
        >
          <Share class="size-3.5"/>
          Share
        </Button>
      </header>
      <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="relative hidden flex-col items-start gap-8 md:flex">
          <form class="grid w-full items-start gap-6">
            <fieldset class="grid gap-6 rounded-lg border p-4">
              <legend class="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <div class="grid gap-3">
                <Label for="temperature">Temperature</Label>
                <Input id="temperature" type="number" placeholder="0.4"/>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-3">
                  <Label for="top-p">Top P</Label>
                  <Input id="top-p" type="number" placeholder="0.7"/>
                </div>
                <div class="grid gap-3">
                  <Label for="top-k">Top K</Label>
                  <Input id="top-k" type="number" placeholder="0.0"/>
                </div>
              </div>
            </fieldset>
            <fieldset class="grid gap-6 rounded-lg border p-4">
              <legend class="-ml-1 px-1 text-sm font-medium">
                Messages
              </legend>

              <div class="grid gap-3">
                <Label for="content">Content</Label>
                <Textarea
                    id="content"
                    placeholder="You are a..."
                    class="min-h-[9.5rem]"
                />
              </div>
            </fieldset>
          </form>
        </div>
        <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <Badge variant="outline" class="absolute right-3 top-3">
            Output
          </Badge>
          <div class="flex-1"/>
          <form
              class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
            <Label for="message" class="sr-only">
              Message
            </Label>
            <Textarea
                id="message"
                placeholder="Type your message here..."
                class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
          </form>
        </div>
      </main>
    </div>
  </div>
</template>