<template>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h2>환전신청</h2>
      <a href="/" style="font-weight: 400; font-size: 14px;">🏡 홈으로 </a>
    </header>

    <div v-if="isLoading" class="overlay">
      <div class="spinner"></div>
      <p>환전 요청 중입니다...</p>
    </div>
  <section v-else class="section">
    <p style="color: gray; margin-bottom: 10px; font-size: 12px;">환전 가능한 금액 : ${{ amount.toLocaleString()  }}</p>
    <div class="section-title">환전금액입력</div>

    <div class="currency-input">
      <!-- 한국돈 입력 -->
      <div class="currency-box">
        <img src="https://flagcdn.com/w40/kr.png" class="flag" />
        <span>KRW</span>
        <input type="number" v-model="krwAmount" class="input" />
      </div>

      <!-- 환산된 미국돈 표시 -->
      <div class="currency-box">
        <img src="https://flagcdn.com/w40/us.png" class="flag" />
        <span>USD</span>
        <div class="readonly">{{ calculatedUSD.toLocaleString() }}</div>
      </div>
    </div>
  </section>

  <!-- 버튼 -->
  <div class="next-button">
    <button @click="submit">확인</button>
  </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const amount = ref(0);
const isLoading = ref(false);

onMounted(() => {
  amount.value = history.state.amount;
  console.log(history.state.amount)
})

const krwAmount = ref(1310);  // 입력 기준: 한국 돈
const baseRate = 1310.5;       // 1 USD = 1310.5 KRW

const calculatedUSD = computed(() => {
  return krwAmount.value > 0 ? (krwAmount.value / baseRate).toFixed(2) : 0;
});


const submit = async () => {
  const usdPirce = krwAmount.value > 0 ? (krwAmount.value / baseRate).toFixed(2) : 0;
  if(usdPirce > amount.value){
    return alert("환전 가능한 금액을 넘었습니다. 금액을 낮춰 입력해주세용 :)")
  }

  isLoading.value = true // ✅ 로딩 시작
  try {
    const res = await axios.post(`http://192.168.0.53:80/exchange`, {
      userid: 1,
      direction: 'BUY',
      base: 'USD',
      base_account: 1,
      base_amount: Number(usdPirce),
      quote: 'KRW',
      quote_account: 1,
      quote_amount: krwAmount.value,
      rate: krwAmount.value,
      guid: null,
      status: 'NONE',
      date: new Date().toISOString().slice(0, 19),
    })

    console.log("res:::", res)
    goRouter(res)
  } catch (e) {
    console.error('요청 실패:', e)
    router.push({
      path: '/result',
      state: {
        isFail: true,
        id: null
      }
    })
  } finally {
    isLoading.value = false // ✅ 로딩 종료
  }
}


const goRouter = (res) => {
  router.push({
    path: '/result',
    state: {
      isFail: !(res.status == 200),
      id: res.data.id ?? null
    }
  });
}
</script>
