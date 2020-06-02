import Donation from '@/models/Donation';
import log from '@/log';
import crudGenerator from '@/store/crud';

const CRUD_KEY = 'donation';
const crud = crudGenerator.Create({
	type: CRUD_KEY,
	actionsConfig: { tenant: false }
});

const state = crud.state;

const mutations = Object.assign(crud.Mutations, {});

const getters = Object.assign(crud.Getters, {
	allCompleted: (state, getters) => getters.filter(x => x.completed)
});

const actions = {
	async fetchAll({ commit }) {
		log.debug(`Store/Donation@fetchAll: fetching all Donations`);

		let donations = await Donation.get();

		commit('SET_MANY', { donations });
	}
};

export default {
	namespaced: true,

	state,
	mutations,
	getters,
	actions
};
