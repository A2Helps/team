import store from '@/store';

/**
 * authRouteGuard
 * Guard a route with authe
 */
export function authRouteGuard(to, from, next) {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!store.getters['App/sessionActive']) {
			console.log('User attempted to access protected resource', to.path);
			next({
				name: 'login',
				// path: '/login',
				query: { redirect: to.fullPath }
			});
		} else {
			next();
		}
	} else {
		next(); // make sure to always call next()!
	}
}

export default authRouteGuard;
