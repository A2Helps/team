import store from '@/store';
import firebase from 'firebase';

/**
 * axiosAuthInjector
 * @param Object config the request configuration
 */
export function axiosAuthInjector(config) {
	// if we do not have an active session then we do not need to alter config
	if (!store.getters['App/sessionActive']) {
		return config;
	}

	return firebase
		.auth()
		.currentUser.getIdToken()
		.then(token => {
			config.headers.Authorization = `Bearer ${token}`;
			return config;
		});
}
