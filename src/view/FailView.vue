<template>
  <div class="container err-container">
    <div class="error-card">
      <div class="emoji">😓</div>
      <h2 class="error-title">문제가 발생했어요</h2>
      <p class="error-message">
        서버와 연결하는 데 실패했어요.<br />
        잠시 후 다시 시도해주세요.
      </p>
      <button class="retry-button" @click="props.onClick">다시 시도하기</button>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue"
const props = defineProps({
    onClick : ()=>{},
})
// emit으로 재시도 처리. 부모 컴포넌트에서 받아서 axios 재시도 가능.
</script>

<style scoped>
.err-container {
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 99;
  background-color: #00000072;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-card {
  background: #fff;
  padding: 20px 30px;
  border-radius: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  font-family: 'Pretendard', system-ui, sans-serif;
}

.emoji {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #666;
  font-size: 14px;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.retry-button {
  transition: background-color 0.2s;
  background-color: #3182f6;
  color: #fff;

  border-radius: 9999px;
  border: none;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;


  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
}
.retry-button:hover {
  background-color: #1f6fe0;
}
</style>
