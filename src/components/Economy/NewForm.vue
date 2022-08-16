<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Nuevo</span>
        <el-button type="primary" @click="onSubmit">Crear</el-button>
      </div>
    </template>
    <el-form label-position="left" label-width="150px">
      <el-form-item label="Concepto">
        <el-row :gutter="20">
          <el-col>
            <el-input placeholder="Concepto" v-model="transactionConcept" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Tipo">
        <el-radio-group v-model="transactionType">
          <el-radio border :label="true">Abono</el-radio>
          <el-radio border :label="false">Cargo</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Cantidad">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input
              placeholder="Cantidad"
              type="number"
              v-model="transactionAmount"
            />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { ElNotification } from 'element-plus'
const transactionType = ref(true);
const transactionAmount = ref(0);
const transactionConcept = ref("");
const props = defineProps(["switchUser", "push"]);

const createBody = () => {
  return {
    data: {
      concept: transactionConcept.value,
      amount: transactionType.value
        ? transactionAmount.value
        : transactionAmount.value * -1,
      user: props.switchUser ? "Juliancito" : "Lomito",
    },
  };
};

const onSubmit = async () => {
  const body = createBody()
  console.log("submit!");
  console.log(body);
  postData('https://limitless-forest-50416.herokuapp.com/api/transactions', body)
  .then(r => {
    if (r.status === 200)
        return r.json()
    else
        return {}
  }).then(d =>{ 
  if(d.data? true : false){
    props.push(d.data)
    ElNotification({
    title: 'Creado',
    message: 'Entrada creada',
    type: 'success',
  })
  }else {
ElNotification({
    title: 'Error del servidor',
    message: 'Intente de nuevo',
    type: 'error',
  })
  }
    
  })
};

async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response // parses JSON response into native JavaScript objects
  }
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
