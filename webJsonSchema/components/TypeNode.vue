<template>
  <div class="node">
    <!-- OBJECT -->
    <div v-if="node.type === 'object'" class="object">
      <div v-if="node.description" class="description">
        {{ node.description }}
      </div>
      <div v-for="(prop, key) in node.properties" :key="key" class="property">
        <span class="property-name">{{ key }}<span class="property-description" v-if="prop.description"> ({{ prop.description }})</span></span>
        <div class="property-row" @mouseover="onPropHover(prop)" @mouseout="onPropLeave">

          <TypeNode
            :node="prop"
            :definitions="definitions"
            :visited="visited"
            :setActiveNode="setActiveNode"
          />
        </div>

      </div>
    </div>

    <!-- ARRAY -->
    <div v-else-if="node.type === 'array'" class="array">
      <span class="type-badge array-badge">Array</span>
      <div class="array-content">
        <TypeNode
          :node="node.items"
          :definitions="definitions"
          :visited="visited"
          :setActiveNode="setActiveNode"
        />
      </div>
    </div>

    <!-- REF -->
    <div v-else-if="node.$ref" class="ref">
      <span
        class="type-badge ref-badge"
        @click="handleRefClick(refName)"
        @mouseover="handleRefHover(refName)"
        @mouseout="handleRefLeave"
      >
        <div class="ref-badge__chev">{{ expanded ? "▾" : "▸" }}</div>
        <div class="ref-badge__name">{{ refName }}</div>
      </span>

      <div v-if="definitions" class="ref-content" v-show="expanded">
        <TypeNode
          :node="definitions[refName]"
          :definitions="definitions"
          :visited="visited"
          :setActiveNode="setActiveNode"
        />
      </div>
    </div>

    <!-- PRIMITIVE -->
    <span v-else class="type-badge primitive-badge">{{ node.type }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  node: any;
  definitions?: Record<string, any>;
  visited?: Set<string>;
  setActiveNode?: (name: string | null) => void;
}>();

const expanded = ref(false);

const refName = computed(() => {
  if (!props.node || !props.node.$ref) return "";
  return String(props.node.$ref).split("/").pop() || "";
});

function toggleExpand() {
  if (!props.node.$ref) return
  expanded.value = !expanded.value;
}

function handleRefClick(name: string) {
  props.setActiveNode?.(name);
  toggleExpand();
}
function handleRefHover(name: string) {
  props.setActiveNode?.(name);
}
function handleRefLeave() {
  props.setActiveNode?.(null);
}

function onPropHover(prop: any) {
  // Если поле — $ref, подсвечиваем тип
  if (prop && prop.$ref) {
    const r = String(prop.$ref).split("/").pop() ?? null;
    props.setActiveNode?.(r);
  }
}
function onPropLeave() {
  props.setActiveNode?.(null);
}
</script>

<style scoped>
.node {
  border-left: 1px solid var(--border);
  font-size: 14px;
  font-family: monospace;
  width: 100%;
}
.property {
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: #333333 0px 0px 3px 0px;
  border-radius: 8px;
  padding: 16px 16px;
}
.property-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.property-name {
  font-weight: 600;
  color: #111827;
}
.separator {
  color: #9ca3af;
}
.property-description {
  font-weight: 400;
  color: var(--muted);
  font-size: 13px;
}

.type-badge {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
.primitive-badge {
  background: #e0f2fe;
  color: #0369a1;
}
.array-badge {
  background: #ede9fe;
  color: #5b21b6;
}
.ref-badge {
  background: #dcfce7;
  color: #166534;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  user-select: none;
}
.array-content {
  margin-left: 12px;
  margin-top: 6px;
}
.ref-content {
  margin-left: 12px;
  margin-top: 6px;
}
.cycle-warning {
  color: #ef4444;
  font-size: 12px;
  margin-left: 8px;
}
.description {
  font-style: italic;
  color: var(--muted);
  margin-bottom: 2px;
}
.object{
  margin-left: 26px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ref :deep(.object){
  margin-left: 4px;
}
</style>
