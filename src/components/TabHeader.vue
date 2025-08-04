<template>
  <div class="tab-header">
    <span
      :class="{ active: activeTab === '원화' }"
      @click="$emit('changeTab', '원화')"
    >원화</span>
    <span
      :class="{ active: activeTab === '달러' }"
      @click="$emit('changeTab', '달러')"
    >달러</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(['activeTab']);
</script>

<style scoped>
.tab-header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tab-header span {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
}

.tab-header span.active {
  border-bottom: 3px solid #1d5cff;
  color: #1d5cff;
}
</style>
