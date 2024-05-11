import App from '@/App.vue';
import '@/style.css';
import { defineNostalgicDiva } from '@aigamo/nostalgic-diva';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import { createApp } from 'vue';

defineNostalgicDiva();

const app = createApp(App);
app.use(PrimeVue);
app.mount('#root');
