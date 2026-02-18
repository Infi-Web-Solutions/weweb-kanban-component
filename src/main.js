import './assets/main.css'
import './wwLibMock.js'

import { createApp } from 'vue'
import App from './App.vue'
import { wwElement, wwLayoutItemContext } from './components/wwMockComponents'

const app = createApp(App)
app.component('wwElement', wwElement)
app.component('wwLayoutItemContext', wwLayoutItemContext)
app.mount('#app')

