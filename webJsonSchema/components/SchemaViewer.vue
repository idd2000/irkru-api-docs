<template>
  <div class="viewer">
    <div class="header">
      <h2>Schema Viewer</h2>
      <input v-model="search" placeholder="Поиск типов..." class="search" />
    </div>

    <div class="types-list">
      <div v-for="typeName in filteredTypes" :key="typeName" class="type-card" :class="{collapsed: !expanded.has(typeName)}">
        <div
          class="type-header"
          @click="toggle(typeName)"
          @mouseover="onHeaderHover(typeName)"
          @mouseout="onHeaderLeave"
        >
          <span class="chev">{{ expanded.has(typeName) ? "▾" : "▸" }}</span>
          <div class="type-label">
            <span class="type-name">{{ typeName }}</span>
          </div>
        </div>

        <div v-if="expanded.has(typeName)" class="type-content">
          <TypeNode
            :node="definitions[typeName]"
            :definitions="definitions"
            :visited="new Set()"
            :setActiveNode="setActiveNode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import TypeNode from "./TypeNode.vue";
import schema from "../types/schema.json";

const props = defineProps<{
  setActiveNode?: (name: string | null) => void;
}>();

const definitions = ((schema as any).definitions as Record<string, any>);
const search = ref("");
const expanded = ref(new Set<string>());

function toggle(name: string) {
  if (expanded.value.has(name)) expanded.value.delete(name);
  else expanded.value.add(name);
}

function onHeaderHover(name: string) {
  props.setActiveNode?.(name);
}
function onHeaderLeave() {
  props.setActiveNode?.(null);
}

const filteredTypes = computed(() => {
  if (!search.value) return Object.keys(definitions || {}).filter((n) => n != 'Main');
  const q = search.value.toLowerCase();
  return Object.keys(definitions || {}).filter((n) => n.toLowerCase().includes(q) && n != 'Main');
});

// реактивный get параметр search без vue-router
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  search.value = params.get('search') ?? "";
});

watch(search, (newValue) => {
  const url = new URL(window.location.href);
  if (newValue) {
    url.searchParams.set('search', newValue);
  } else {
    url.searchParams.delete('search');
  }
  window.history.replaceState({}, '', url);
});
</script>

<style scoped>
.viewer {
  max-width: 100%;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}
h2 {
  margin: 0;
  font-size: 18px;
}
.search {
  padding: 12px 16px;
  box-shadow: 0 0 2px 0 #333;
  border-radius: 8px;
  border: 1px solid var(--border);
}
.types-list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.type-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  width: 100%;
}
.type-header {
  cursor: pointer;
  display: flex;
  gap: 8px;
}
.chev {
  width: 18px;
  display: inline-block;
  text-align: center;
  color: #374151;
}
.type-name {
  color: #111827;
  font-weight: 600;
}
.type-content {
  margin-top: 8px;
}
.type-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
