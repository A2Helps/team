import log from '@/log';
import Merchant from '@/models/Merchant';
import crudGenerator from '@/store/crud';

const CRUD_KEY = 'merchant';
const crud = crudGenerator.Create({
	type: CRUD_KEY,
	actionsConfig: { tenant: false }
});

const state = crud.state;

const mutations = Object.assign(crud.Mutations, {});

const getters = Object.assign(crud.Getters, {
	nameById: (state, getters) => id => {
		let m = getters.find(id);

		return m ? m.name : null;
	}
});

const actions = {
	async fetchAll({ commit }) {
		log.debug(`Store/Merchant@fetchAll: fetching all merchants`);

		let merchants = await Merchant.get();

		commit('SET_MANY', { merchants });
	},

	async fetch({ commit }, { id }) {
		log.debug(`Store/Merchant@fetch: fetching merchant{${id}}`);

		let merchant = await Merchant.find(id);

		commit('SET', { merchant });
		return merchant;
	},

	async update({ commit }, { id, data }) {
		log.debug(`Store/Merchant@update: updating Merchant{${id}}`);

		let merchant = new Merchant(Object.assign({ id }, data));
		await merchant.save();

		commit('SET', { merchant });
	},

	async create({ commit }, { data }) {
		log.debug(`Store/Merchant@create: creating Merchant`);

		let merchant = new Merchant(data);
		await merchant.save();

		commit('SET', { merchant });
	}
};

export default {
	namespaced: true,

	state,
	mutations,
	getters,
	actions
};
