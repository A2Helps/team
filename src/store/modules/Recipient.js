import Recipient from '@/models/Recipient';
import log from '@/log';
import crudGenerator from '@/store/crud';

const CRUD_KEY = 'recipient';
const crud = crudGenerator.Create({
	type: CRUD_KEY,
	actionsConfig: { tenant: false }
});

const state = crud.state;

const mutations = Object.assign(crud.Mutations, {});

const getters = Object.assign(crud.Getters, {});

const actions = {
	async fetchAll({ commit }) {
		log.debug(`Store/Recipient@fetchAll: fetching all Recipients`);

		let recipients = await Recipient.where('selected', true).get();

		commit('SET_MANY', { recipients });
	}
};

export default {
	namespaced: true,

	state,
	mutations,
	getters,
	actions
};
