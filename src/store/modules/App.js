import log from 'loglevel';
// import Vue from 'vue';
import axios from 'axios';

const state = {
	app: {
		env: process.env.NODE_ENV,
		name: 'Team',
		url: process.env.VUE_APP_URL
	},
	api: {
		url: process.env.VUE_APP_API_URL
	},
	session: {
		userId: null,
		fbId: null
	},
	versions: {
		vue: require('vue/package.json').version,
		app: process.env.VUE_APP_VERSION,
		app_build: process.env.VUE_APP_BUILD_VERSION
	}
};

const mutations = {
	SET_SESSION(state, { fbId, userId }) {
		state.session.fbId = fbId;
		state.session.userId = userId;

		log.debug('Store/App.SET_SESSION: set user: ' + userId);
	}
};

const getters = {
	dotenv: state => query => {
		let parts = query.split('.');

		let config = state;
		let missingConf = false;
		parts.forEach(part => {
			if (missingConf) return;

			if (typeof config[part] === 'undefined') {
				missingConf = true;
				return;
			}

			config = config[part];
		});

		return config;
	},

	//
	// App
	//
	url: state => state.app.url,
	env: state => state.app.env,
	envDev: state => state.app.env === 'development',
	envProd: state => state.app.env === 'production',
	appName: state => state.app.name,

	//
	// API
	//
	apiUrl: state => state.api.url,

	//
	// Session
	//
	sessionActive: state => state.session.fbId !== null,
	userId: state => state.session.userId,
	fbId: state => state.session.fbId,

	//
	// Versions
	//
	versions: state => state.versions,
	versionVue: state => state.versions.vue,
	versionApp: state => state.versions.app,
	versionAppBuild: state => state.versions.app_build,

	user: (state, getters, rootState, rootGetters) => {
		return rootGetters['User/find'](state.session.userId);
	},

	isAdmin: (state, getters) => {
		let u = getters['user'];

		return u ? u.admin : false;
	}
};

const actions = {
	async setAuthUser({ commit, rootGetters }, { authUser }) {
		return new Promise(resolve => {
			let fbId = null;

			if (authUser) {
				fbId = authUser.uid;
			}

			commit('SET_SESSION', { fbId });

			if (!fbId) {
				return;
			}

			axios.get(rootGetters['App/apiUrl'] + '/v1/users/me').then(response => {
				commit('User/SET', { user: response.data }, { root: true });
				commit('SET_SESSION', { fbId, userId: response.data.id });

				resolve();
			});
		});
	}
};

export default {
	namespaced: true,

	state,
	mutations,
	getters,
	actions
};
