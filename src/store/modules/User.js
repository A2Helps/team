import crudGenerator from '@/store/crud';

const CRUD_KEY = 'user';
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

const actions = {};

export default {
	namespaced: true,

	state,
	mutations,
	getters,
	actions
};
