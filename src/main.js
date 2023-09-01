import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// import "./yourMainScssFile.scss";

import enMessages from './locales/en.json';
import frMessages from './locales/fr.json';
import Vue3Marquee from 'vue3-marquee'


import { createI18n } from 'vue-i18n';

const app = createApp(App)

const i18n = createI18n({
    locale: 'en', // Bahasa default
    fallbackLocale: 'en',
    messages: {
      en: enMessages,
      fr: frMessages
    },
});

console.log(i18n.locale)

app.config.globalProperties.formatPrice = function (value) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return formatter.format(value)
}
const options = {
    timeout: 1500,
    pauseOnHover: false,
    rtl: false,
    position: 'top-left'
}


// const i18n = createI18n({
//     locale: 'en', // Bahasa default
//     fallbackLocale: 'en',
//     messages: {
//       en: import('./locales/en.json'),
//       fr: import('./locales/fr.json')
//     }
// });
app.use(Vue3Marquee)
app.use(i18n)
app.use(Toast, options)
app.use(createPinia())
app.use(router)
app.mount('#app')


