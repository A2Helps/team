import crudGenerator from '@/store/crud';
import _ from 'lodash';
import log from '@/log';

import BatchItem from '@/models/BatchItem';

const CRUD_KEY = 'batchItem';
const crud = crudGenerator.Create({
	type: CRUD_KEY,
	actionsConfig: { tenant: false }
});

const state = crud.state;

const mutations = Object.assign(crud.Mutations, {});

const getters = Object.assign(crud.Getters, {
	byBatchId: (state, getters) => id => {
		return _.orderBy(
			getters.filter(x => x.batch_id === id),
			'id'
		);
	}
});

const actions = {
	async update({ commit }, { id, data }) {
		log.debug(`Store/BatchItem@update: updating BatchItem{${id}}`);

		let batchItem = new BatchItem(Object.assign({ id }, data));
		await batchItem.save();

		commit('SET', { batchItem });
	}
};

export default {
	namespaced: true,

	state,
	mutations,
	getters,
	actions
};
