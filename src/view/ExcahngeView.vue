<template>
  <div class="container">
    <FailView v-if="data.isErr" :onclick="fetchData"  />
    <div class="logo">
      <img src="../assets/transparent-Photoroom-removebg-preview.png" alt="" width="100" height="100">
      <h2 class="title">환전 서비스</h2>
    </div>


    <TabHeader :activeTab="activeTab" @changeTab="activeTab = $event" />
    <div class="balance-section">
      <p class="label">환전 가능 금액</p>
      <p class="amount">{{ activeTab === '달러' ? '$': '' }} {{ data.amount.toLocaleString() }} {{ activeTab === '원화' ? '원': '' }}</p>
      <hr style="border-color: rgb(252 252 252);">
      
      <div class="next-button">
        <button @click="goRouter">환전하기</button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref ,watch} from 'vue';
import TabHeader from '@/components/TabHeader.vue';
// import ExchangeList from '@/components/ExchangeList.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import FailView from './FailView.vue';

const router = useRouter();
const activeTab = ref('원화');

const data = reactive({
  amount : 0,
  isErr : false
});
//지피티쌤 :  192.168.0.53:80
const fetchData = async () => {
  try {
    const port = '80'
    const endpoint = activeTab.value === '원화' ? 'wonhwa' : 'oehwa'
    const res = await axios.get(`http://192.168.0.53:${port}/check/${endpoint}`, {
      params: {
        userId: '1',
      },
    })

    data.amount = res.data.base_amount ?? 0
    console.log("res", res)
    data.isErr = false;
  } catch (err) {
    console.log('에러:', err)
    data.isErr = true;
  }
}

// 최초 1회
onMounted(() => {
  fetchData()
})

// 탭 변경 시마다 실행
watch(activeTab, () => {
  fetchData()
})

const goRouter = () =>{
  router.push({
    path: activeTab.value === '원화' ? '/buy' : '/sal',
    state: {
      amount: data.amount
    }
  });
}

</script>

<style scoped>
</style>

