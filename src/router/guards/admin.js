import store from '@/store';

/**
 * adminGuard
 * Guard a route with admin perms
 */
export function adminRouteGuard(to, from, next) {
	if (to.matched.some(record => record.meta.requiresAdmin)) {
		if (store.getters['App/isAdmin']) {
			next();
		} else {
			next({
				name: 'home'
			});
		}
	} else {
		next(); // make sure to always call next()!
	}
}

export default adminRouteGuard;
