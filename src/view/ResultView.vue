<template>
    <div class="container">
        <!-- 상단 상태 정보 -->
        <div>
            <div class="header">
                <h2>환전 결과</h2>
                <a href="/" style="font-weight: 400; font-size: 14px;">🏡 홈으로 </a>
            </div>

            <div :class="['status-message', isFail ? 'red' : '']">
                {{isFail ? '환전이 실패 되었습니다.': '환전이 완료 되었습니다.'}}
            </div>
        </div>

        <!-- 배송 로그 테이블 -->
        <div class="delivery-log">
            <h3>구매 추적</h3>
            <table>
                <thead>
                    <tr>
                        <th>시간</th>
                        <th>위치</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(log, index) in deliveryLogList" :key="index">
                        <td>{{ moment(log.request.date).format('YYYY.MM.DD') }}<br>
                            {{ moment(log.request.date).tz('Asia/Seoul').format('HH:mm:ss') }} 
                        </td>
                        <td>{{ log.request.id }}</td>
                        <td>{{ log.state }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import moment from "moment-timezone";

import axios from 'axios';

const deliveryLogList = ref([]);
const isFail = ref(true);



//지피티쌤 :  192.168.0.53:80
const fetchData = async (id) => {
    console.log(id)
    const port = '80'
    await axios.get(`http://192.168.0.53:${port}/check/request`, {
        params: {
            id: id,
        },
    }).then(res => {
        console.log("res", res);
        deliveryLogList.value =  res.data;

    }).catch(err => { console.log('에러:', err) })

}

// 최초 1회
onMounted(() => {
    console.log(history.state.isFail)
    isFail.value = history.state.isFail;
    
    fetchData(history.state.id ?? null);
})

</script>

<style scoped>
.header {
    margin: 20px 0;
}

.status-message {
    grid-column: span 2;
    margin: 16px 0;
    font-weight: 600;
    color: #0078ff;
    background-color: #f0f7ff;
    padding: 12px;
    border-radius: 8px;
}

.status-message.red {
    background-color: #fff0f0;
    color: #ff0000;
}

.delivery-log h3 {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
    margin-bottom: 50px;
}

th,
td {
    min-width: 50px;
    text-align: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
    text-align: left;
    font-size: 13px;
    line-height: 1.5;
}

th {
    background-color: #f9f9f9;
    color: #666;
    font-weight: 500;
}
</style>
