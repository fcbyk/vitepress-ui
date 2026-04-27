<script setup lang="ts">
import type { MenuItem } from '../composables/outline'

defineProps<{
  headers: MenuItem[]
  root?: boolean
}>()

function onClick({ target: el }: Event) {
  const id = (el as HTMLAnchorElement).href!.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id))
  heading?.focus({ preventScroll: true })
}
</script>

<template>
  <ul class="VPDocOutlineItem" :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers">
      <a class="outline-link" :href="link" @click="onClick" :title="title">{{ title }}</a>
      <template v-if="children?.length">
        <VPDocOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-right: 16px;
  padding-left: 16px;
}

.outline-link {
  display: block;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s, background-color 0.25s;
  padding-left: 12px;
  border-radius: 6px;
}

.outline-link:hover {
  color: var(--vp-c-text-1);
  background-color: rgba(128, 128, 128, 0.05);
}

.outline-link.active {
  color: var(--vp-c-text-1);
  font-weight: 600;
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
}

.outline-link.nested {
  padding-left: 13px;
}
</style>
