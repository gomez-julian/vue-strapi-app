<template>
  <el-row class="row-bg" justify="center">
    <el-switch v-model="switchTab" class="mb-2" active-text="Juliancito" inactive-text="Lomito" size="large" />
  </el-row>


  <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="Resumen" name="1">
      <el-descriptions title="Resumen">
      <el-descriptions-item label="Total actual:">${{ totalTab }}</el-descriptions-item>
    <el-descriptions-item label="Recuento:">
      <el-tag size="small" type="success">Abonos</el-tag> $---
      <el-tag size="small" type="danger">Cargos</el-tag> $---
    </el-descriptions-item>
  </el-descriptions>
    </el-collapse-item>
    <el-collapse-item title="Nueva entrada" name="2">
      <el-row class="row-bg" justify="center">
        <NewForm :switchUser="switchTab" :push="pushTransaction" />
      </el-row>
    </el-collapse-item>
    <el-collapse-item title="Historial" name="3">
      <el-row class="row-bg" justify="center">
        <el-col :xs="22" :sm="18" :md="12" :lg="6" :xl="6">
          <div class="grid-content ep-bg-purple" />
          <div v-if="transactionsTab.length > 0">
            <Timeline :transactions="transactionsTab" />
          </div>
          <div v-else>
            <el-empty description="No se encontraron entradas" />
          </div>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item title="Proximamente" name="4">
      <div>
        Si lees esto es porque te gusta la paradam
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref, computed } from "vue";
import Timeline from "../components/Economy/Timeline.vue";
import NewForm from "../components/Economy/NewForm.vue";

const transactions = ref([]);
const total = ref(0);
const switchTab = ref(true);

const pushTransaction = (t) => {
  transactions.value.push(t);
};

fetch("https://limitless-forest-50416.herokuapp.com/api/transactions")
  .then((r) => r.json())
  .then((d) => {
    const a = d.data;
    transactions.value = a;
    total.value = a.reduce((s, v) => s + v.attributes.amount, 0);
  })
  .catch((e) => {
    console.log("xd");
  });

const totalTab = computed(()=>{
  const a =  transactions.value
    ? transactions.value
      .filter(
        (t) =>
          t.attributes.user == (switchTab.value ? "Juliancito" : "Lomito")
      )
      .slice()
      .reverse()
    : [];
  return a.reduce((s, v) => s + v.attributes.amount, 0);
})

const transactionsTab = computed(() => {
  return transactions.value
    ? transactions.value
      .filter(
        (t) =>
          t.attributes.user == (switchTab.value ? "Juliancito" : "Lomito")
      )
      .slice()
      .reverse()
    : [];
});


const activeNames = ref(['1','3'])
const handleChange = (val) => {
  console.log(val)
}
</script>

<style>
</style>
