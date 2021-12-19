import { createRouter, createWebHistory } from 'vue-router'
import Game from '../components/Game.vue'
import Settings from '../components/Settings.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Settings
	},
	{
		path: '/game',
		name: 'game',
		component: Game,
		meta: {
			time: Number,
			level: Number,
			operations: []
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router;