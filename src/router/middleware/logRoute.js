export function logRoute(to, _from, next) {
	console.debug('Handing route', { name: to.name });

	next();
}

export default logRoute;
