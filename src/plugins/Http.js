// import _Vue from 'vue'
import axios from 'axios';
import { axiosAuthInjector } from './Auth';
import QS from 'qs';

/**
 * Export a VuePlugin wrapper
 */
export const HttpPlugin = {
	install: function(Vue) {
		axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		axios.interceptors.request.use(axiosAuthInjector);
		axios.defaults.paramsSerializer = params => {
			return QS.stringify(params);
		};

		Vue.$http = axios;

		Object.defineProperties(Vue.prototype, {
			$http: {
				get() {
					return axios;
				}
			}
		});
	}
};
