<template>
  <div style="height:100%; width:100%;">
    <!-- подписываемся на node-drag-stop, nodes-change не обязателен -->
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      fit-view
      @nodeDragStop="onNodeDragStop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { VueFlow } from "@vue-flow/core"
import "@vue-flow/core/dist/style.css"
import schema from "../types/schema.json"

const props = defineProps<{
  activeNode?: string | null
}>()

const definitions = (schema as any).definitions as Record<string, any>

/* --- nodes & edges --- */
const nodes = ref<any[]>([])
const edges = ref<any[]>([])

/* build nodes once (positions set in a simple grid layout) */
const typeNames = Object.keys(definitions || {})
typeNames.forEach((name, index) => {
  nodes.value.push({
    id: name,
    type: "default",
    position: { x: (index % 4) * 240, y: Math.floor(index / 4) * 140 },
    data: { label: name },
    style: { background: "#fff", border: "1px solid var(--border)", padding: "6px", borderRadius: "6px" }
  })
})

/* build edges once (no duplicates) */
const edgeSet = new Set<string>()
function scanRefs(node: any, parent: string) {
  if (!node) return
  if (node.$ref) {
    const refName = String(node.$ref).split("/").pop()
    if (refName && definitions[refName]) {
      const id = `${parent}-${refName}`
      if (!edgeSet.has(id)) {
        edgeSet.add(id)
        edges.value.push({ id, source: parent, target: refName })
      }
    }
  }
  if (node.properties) {
    Object.values(node.properties).forEach((c: any) => scanRefs(c, parent))
  }
  if (node.items) scanRefs(node.items, parent)
}
Object.entries(definitions || {}).forEach(([name, def]) => scanRefs(def, name))

/* --- highlight logic: mutate style of nodes in place (don't replace whole nodes array) --- */
const HIGHLIGHT_BG = "#fde68a"
const NORMAL_BG = "#fff"

watch(
  () => props.activeNode,
  (newVal) => {
    // mutate only style.background for nodes (no reassignment of nodes array)
    for (let i = 0; i < nodes.value.length; i++) {
      const n = nodes.value[i]
      // ensure style object exists
      if (!n.style) n.style = {}
      // set background based on match
      n.style.background = n.id === newVal ? HIGHLIGHT_BG : NORMAL_BG
      // small CSS transition
      n.style.transition = "background 120ms ease"
    }
    // Vue reactivity will pick object property changes inside nodes.value
  },
  { immediate: true }
)

/* --- handle node drag stop: save position so nodes keep their place --- */
function onNodeDragStop(event: any) {
  const node = event.node
  if (!node?.id) return

  const idx = nodes.value.findIndex(n => n.id === node.id)
  if (idx === -1) return

  nodes.value[idx].position = {
    x: node.position.x,
    y: node.position.y
  }
}
</script>

<style scoped>
.flow { height: 100%; width: 100%; }
</style>
