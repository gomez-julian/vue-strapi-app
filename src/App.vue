<script setup>
import { RouterView } from 'vue-router'
import PageMenu from './components/PageMenu.vue'
</script>

<template>
  
   <div class="common-layout">
    <el-container>
      <el-header>
        <PageMenu/>
      </el-header>
      <el-main>
        <RouterView />
        
      </el-main>
    </el-container>
  </div>
</template>

<style>
*{
  font-family: 'Arial'
}
</style>
