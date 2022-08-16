<template>
<el-timeline-item  
      center
      placement="top"
      :timestamp="nodeDate"
      :color="nodeColorFull"
    >
      <el-card>
        <el-tag class="ml-2" :type="nodeTag.type" effect="dark">{{ nodeTag.label }}</el-tag>
        <h4>{{ formatedAmount() }}</h4>
        <p>{{ transaction.attributes.concept }}</p>
      </el-card>
    </el-timeline-item>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(["transaction"]);
const { transaction } = props

const formatedAmount = (() => {
    return `Cantidad: $${Math.abs(transaction.attributes.amount)}`
})

const nodeTag = computed(() => {
    return transaction.attributes.amount > 0 ? 
        { type: 'success', label: 'Abono' } : { type: 'danger', label: 'Cargo' } 
})

const nodeDate = computed(() => {
    const d = new Date(transaction.attributes.createdAt)
    const w = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const m = ["Enero", "Febrero", "Marzo","Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return `${w[d.getDay()]} ${d.getDate()}, ${m[d.getMonth()]} ${d.getFullYear()}`
})

const nodeColorFull = computed(() => {
    const a = transaction.attributes.amount
    if(a > 100) return '#58D68D'
    else if (a > 0) return '#DAF7A6'
    else if (a > -100) return '#FF5733'
    else if (a > -200) return '#C70039'
    else return '#900C3F'
})
</script>