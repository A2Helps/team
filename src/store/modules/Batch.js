import Batch from '@/models/Batch';
import log from '@/log';
import crudGenerator from '@/store/crud';

const CRUD_KEY = 'batch';
const crud = crudGenerator.Create({
	type: CRUD_KEY,
	actionsConfig: { tenant: false }
});

const state = crud.state;

const mutations = Object.assign(crud.Mutations, {});

const getters = Object.assign(crud.Getters, {});

const actions = {
	async fetchAll({ commit }, { all }) {
		log.debug(`Store/Batch@fetchAll: fetching all Batches`);

		let query = Batch.include(['batch_items', 'merchant']);

		if (!all) {
			query.where('completed', false);
		}

		const batches = await query.get();

		let merchants = [];
		let batchItems = [];
		batches.forEach(b => {
			batchItems.push(...b.batch_items);
			delete b.batch_items;

			merchants.push(b.merchant);
			delete b.merchant;

			// TODO: dedupe merchants
		});

		commit('SET_MANY', { batches });
		commit('BatchItem/SET_MANY', { batchItems }, { root: true });
		commit('Merchant/SET_MANY', { merchants }, { root: true });
	},

	async completed({ commit }, { id }) {
		log.debug(`Store/Batch@completed: marking Batch{${id}} complete`);

		let batch = new Batch(Object.assign({ id }, { completed: true }));
		await batch.save();

		commit('SET', { batch });
	}
};

export default {
	namespaced: true,

	state,
	mutations,
	getters,
	actions
};
