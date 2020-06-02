import Vue from 'vue';
import Vuex from 'vuex';

import baseModules from './modules';
// import routeModules from './route_modules'

Vue.use(Vuex);

// merge modules and routeModules together
// let modules = Object.assign({}, baseModules, routeModules)

let modules = Object.assign({}, baseModules);

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',

	state: {},
	modules
});
