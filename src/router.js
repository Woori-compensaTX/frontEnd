import { createRouter, createWebHistory } from 'vue-router';
import ExcahngeView from './view/ExcahngeView.vue';
import BuyView from './view/BuyView.vue';
import salView from './view/salView.vue';
import ResultView from './view/ResultView.vue';
import FailView from './view/FailView.vue';

const routes = [
  { path: '/', name: 'Exchange', component: ExcahngeView },
  { path: '/buy', name: 'buy', component: BuyView },
  { path: '/sal', name: 'sal', component: salView },
  { path: '/result', name: 'result', component: ResultView },
  { path: '/err', name: 'err', component: FailView },
];

export default createRouter({
  history: createWebHistory(),
  routes
});
