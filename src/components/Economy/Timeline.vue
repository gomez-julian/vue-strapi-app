<template>
  <el-timeline>
    <TimelineNode 
       v-for="t in props.transactions"
      :key="t.id"
      :transaction="t"
    />
  </el-timeline>
</template>

<script setup>
import TimelineNode from './TimelineNode.vue';
const props = defineProps(["transactions"]);

</script>
