import Recipient from '@/models/Recipient';
import log from '@/log';
import crudGenerator from '@/store/crud';
import axios from 'axios';

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
	},

	async search({ rootGetters, commit }, { search }) {
		return new Promise(resolve => {
			log.debug(`Store/Recipient@search: searching for Recipients`);

			axios.post(rootGetters['App/apiUrl'] + '/v1/_/search', { search }).then(response => {
				const recipients = response.data.recipients.map(r => new Recipient(r));
				commit('SET_MANY', { recipients });
				resolve(recipients);
			});
		});
	},

	async reset({ rootGetters }, { id }) {
		return new Promise(resolve => {
			log.debug(`Store/Recipient@reset: resetting Recipients{${id}}`);

			axios.post(rootGetters['App/apiUrl'] + `/v1/recipients/${id}/reset`).then(r => resolve(r.data));
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
