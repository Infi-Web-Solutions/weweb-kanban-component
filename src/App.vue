<script setup>
import Kanban from './components/wwElement_v15_fixed_Backup.vue'
import { reactive } from 'vue'

const generateItems = (count, status) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${status}-${i + 1}`,
    name: `${status.toUpperCase()} Task ${i + 1}`,
    status: status
  }))
}

const content = reactive({
  items: [
    ...generateItems(15, 'todo'),
    ...generateItems(15, 'wip'),
    ...generateItems(15, 'done'),
    ...generateItems(15, 'unknown'),
  ],
  stacks: [
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'wip' },
    { label: 'Done', value: 'done' },
  ],
  stackedBy: 'status',
  stackLabel: 'label',
  stackValue: 'value',
  uncategorizedStack: true,
  sortable: true,
  stackElement: { type: 'ww-stack' },
  readonly: false,
  longPress: true,
  longPressDelay: 500,
})



const wwElementState = reactive({
  states: []
})

const wwEditorState = reactive({
  isSelected: false
})
</script>

<template>
  <div id="app-container">
    <h1>Kanban Test</h1>
    <div class="kanban-wrapper">
      <Kanban 
        :content="content" 
        uid="test-kanban"
        :wwElementState="wwElementState"
        :wwEditorState="wwEditorState"
      />
    </div>
  </div>
</template>

<style>
#app-container {
  padding: 20px;
  font-family: sans-serif;
}
.kanban-wrapper {
  margin-top: 20px;
  border: 1px solid #eee;
  padding: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  height: 600px;
  display: flex;
}


.ww-kanban {
  display: flex;
  gap: 20px;
}
/* Basic styling for stacks since the component might depend on WeWeb styles */
.ww-kanban-stack {
  min-width: 250px;
  background-color: #f4f4f4;
  border-radius: 4px;
}
</style>
