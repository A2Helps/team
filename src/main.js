import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import router from './router';
import store from './store';
import firebase from 'firebase';
import { HttpPlugin } from '@/plugins/Http';
import Model from '@/models';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(HttpPlugin);

Model.baseURL = () => {
	return store.getters['App/apiUrl'] + '/v1';
};

let firebaseConfig = {};
if (process.env.NODE_ENV === 'production') {
	firebaseConfig = {
		apiKey: 'AIzaSyBNw7iZSceM2W_wnnev-QAeStw_sqhWMHA',
		authDomain: 'a2cares.firebaseapp.com',
		databaseURL: 'https://a2cares.firebaseio.com',
		projectId: 'a2cares',
		storageBucket: 'a2cares.appspot.com',
		messagingSenderId: '12643715755',
		appId: '1:12643715755:web:d50e6ce431f6d88ea745ee',
		measurementId: 'G-60KLEYE83R'
	};
} else {
	firebaseConfig = {
		apiKey: 'AIzaSyDSRVTsV7WGERtOgMtixEVdSjczs0ORMac',
		authDomain: 'a2cares-local.firebaseapp.com',
		databaseURL: 'https://a2cares-local.firebaseio.com',
		projectId: 'a2cares-local',
		storageBucket: 'a2cares-local.appspot.com',
		messagingSenderId: '581955185890',
		appId: '1:581955185890:web:8a595e40b1481ac02742bb',
		measurementId: 'G-8N0PBQJZ2X'
	};
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let booted = false;
firebase.auth().onAuthStateChanged(authUser => {
	store.dispatch('App/setAuthUser', { authUser }).then(() => {});

	if (!booted) {
		booted = true;

		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app');
	}
});
