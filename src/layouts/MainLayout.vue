<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,

} from "@/components/ui/sidebar";
import {
  ChevronRight,
  ChevronsUpDown,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  PieChart,
  Plus,
  Book
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";


const mode = useColorMode();

// Sample data
const data = {
  user: {
    name: "Khon Vakhim",
    email: "vakhim07@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Note Vue",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Notes",
      url: "#",
      icon: Book,
      isActive: true,
      items: [
        {
          title: "Notes List",
          url: "/",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const activeTeam = ref(data.teams[0]);

function setActiveTeam(team: typeof data.teams[number]) {
  activeTeam.value = team;
}

onMounted(async () => {

});

</script>


<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <component :is="activeTeam.logo" class="size-4" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ activeTeam.name }}</span>
                    <span class="truncate text-xs">{{ activeTeam.plan }}</span>
                  </div>

                  <ChevronsUpDown class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                  class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  :side-offset="4"
              >
                <DropdownMenuLabel class="text-xs text-muted-foreground">
                  Teams
                </DropdownMenuLabel>
                <DropdownMenuItem
                    v-for="(team, index) in data.teams"
                    :key="team.name"
                    class="gap-2 p-2"
                    @click="setActiveTeam(team)"
                >
                  <div class="flex size-6 items-center justify-center rounded-sm border">
                    <component :is="team.logo" class="size-4 shrink-0" />
                  </div>
                  {{ team.name }}
                  <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 p-2">
                  <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus class="size-4" />
                  </div>
                  <div class="font-medium text-muted-foreground">
                    Add team
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
                v-for="item in data.navMain"
                :key="item.title"
                as-child
                :default-open="item.isActive"
                class="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                        v-for="subItem in item.items"
                        :key="subItem.title">
                      <SidebarMenuSubButton as-child>
                        <router-link :to="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </router-link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 px-4">
        <div class="flex items-center gap-2">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <!-- Light/Dark Mode Toggle and Profile Dropdown -->
        <div class="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="h-12 w-12 flex items-center justify-center">
                <Icon
                    icon="radix-icons:moon"
                    class="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Icon
                    icon="radix-icons:sun"
                    class="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="mode = 'light'">Light</DropdownMenuItem>
              <DropdownMenuItem @click="mode = 'dark'">Dark</DropdownMenuItem>
              <DropdownMenuItem @click="mode = 'auto'">System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Profile Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="h-12 w-12 flex items-center justify-center">
                <Icon
                    icon="heroicons-outline:user-circle"
                    class="h-6 w-6 transition-all"
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
                side="bottom"
                align="end"
                :side-offset="8"
            >
              <!-- User Info -->
              <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex items-center gap-4 px-2 py-3 text-left text-base">
                  <Avatar class="h-12 w-12 rounded-lg">
                    <AvatarImage src="https://lh3.googleusercontent.com/ogw/AF2bZyg0js-7soVF3fPb1Oq-WlFxnNLqpo7rUwVpxpSeKoTyPg=s64-c-mo" :alt="data.user.name" />
                    <AvatarFallback class="rounded-lg">
                      <Icon icon="heroicons-outline:user" class="h-8 w-8 text-gray-500" />
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate text-base font-semibold">{{ data.user.name }}</span>
                    <span class="truncate text-sm">{{ data.user.email }}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main>
        <router-view/>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>