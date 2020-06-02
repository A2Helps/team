import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
// import mw from './middleware';
import guards from './guards';

import { requiresAuth, requiresAdmin } from './meta';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: { requiresAuth }
	},
	{
		path: '/batches',
		name: 'batches',
		component: require('@/views/Batches').default,
		meta: { requiresAuth }
	},
	{
		path: '/batches/:id',
		name: 'batch',
		component: require('@/views/Batch').default,
		meta: { requiresAuth }
	},
	{
		path: '/recipients',
		name: 'recipients',
		component: require('@/views/Recipients').default,
		meta: { requiresAuth }
	},
	{
		path: '/team',
		name: 'team',
		component: require('@/views/Team').default,
		meta: { requiresAuth, requiresAdmin }
	},
	{
		path: '/donations',
		name: 'donations',
		component: require('@/views/Donations').default,
		meta: { requiresAuth }
	},
	{
		path: '/merchants',
		name: 'merchants',
		component: require('@/views/Merchants').default,
		meta: { requiresAuth }
	},
	{
		path: '/merchants/:id',
		name: 'merchant',
		component: require('@/views/Merchant').default,
		meta: { requiresAuth }
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: require('@/views/Login').default
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

/**
 * Middlware
 */
// router.beforeEach(mw.logRoute);

/**
 * Guards
 */
router.beforeEach(guards.auth);
router.beforeEach(guards.admin);

export default router;
