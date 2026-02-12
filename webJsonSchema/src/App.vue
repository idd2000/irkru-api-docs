<template>
  <div class="app-container">
    <div class="left-panel" :style="{ width: leftWidth + '%' }" ref="leftPanel">
      <SchemaViewer :setActiveNode="setActiveNode" />
    </div>

    <!-- <div class="divider" @mousedown="startResize"></div>

    <div class="right-panel">
      <TypeGraph :activeNode="activeNode" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import SchemaViewer from "../components/SchemaViewer.vue"
import TypeGraph from "../components/TypeGraph.vue"

// Изменить, если потребуется панель графа
const leftWidth = ref(100) // проценты
const isResizing = ref(false)
const activeNode = ref<string | null>(null)

function setActiveNode(name: string | null) {
  activeNode.value = name
}

/* Drag & resize */
function startResize(e: MouseEvent) {
  isResizing.value = true
  e.preventDefault()
}
function stopResize() {
  isResizing.value = false
}
function onMouseMove(e: MouseEvent) {
  if (!isResizing.value) return
  const newWidth = (e.clientX / window.innerWidth) * 100
  if (newWidth > 20 && newWidth < 80) {
    leftWidth.value = newWidth
  }
}

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("mouseup", stopResize)
})
onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove)
  window.removeEventListener("mouseup", stopResize)
})
</script>

<style>
body{
  margin: 0;
}
</style>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.left-panel {
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid var(--border);
  background-color: #f9fafb;
}

.right-panel {
  flex: 1;
  padding: 20px;
  overflow: hidden;
  background-color: var(--card);
}

.divider {
  width: 6px;
  background-color: var(--border);
  cursor: col-resize;
  user-select: none;
}
</style>
