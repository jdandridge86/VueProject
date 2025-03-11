import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import Main from '@/views/Main.vue'
import Join from '@/views/Join.vue'
import Profile from '@/views/Profile.vue'
import PrivateMessage from '@/views/PrivateMessage.vue'
import Welcome from '@/views/Welcome.vue'
import Feed from '@/views/Feed.vue'
import SearchUsers from '@/views/SearchUsers.vue'


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {authRequired: false },
		},
		{
			path: '/signin',
			name: 'signin',
			component: SignIn,
			meta: {authRequired: false },
		},
		{
			path: '/privatemessage',
			name: 'privatemessage',
			component: PrivateMessage,
			meta: {authRequired: true },
		},
		{
			path: '/main',
			component: Main,
			meta: {authRequired: true },
			children: [
				{
					path:"",
					name:"main",
					components:{
						leftSidebar: Welcome,
						focus: Feed,
						rightSidebar: SearchUsers,
					},
					meta: {authRequired: true },
				},
				{
					path: '/profile',
					name: 'profile',
					components: {
						focus: Profile,
					},
					meta: {authRequired: true },
				},
				{
					path: '/user/:userId',
					name: 'user',
					components: {
						focus: PrivateMessage,
					},
					props:true,
					meta: {authRequired: true },
				},
			], 
		},
		{
			path: '/join',
			name: 'join',
			component: Join,
			meta: {authRequired: false },
		},
		{
			path: '/:catchAll(.*)',
			redirect: '/',
		},
	],
})

router.beforeEach ((to, from) => {
	if (to.meta.authRequired && !localStorage.getItem("token")) {
		return {name:'home'}
	}
})

export default router
