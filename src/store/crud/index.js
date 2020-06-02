import pluralize from '@/util/Pluralize';
import decamelize from 'decamelize';

import Mutations from './mutations';
import Getters from './getters';
import Actions from './actions';

const Create = ({ type }) => {
	const ptype = pluralize(type); // plural type
	// const ltype = ptype + 'List'; //
	const ltype = 'ids'; //
	const atype = decamelize(type); // api type
	const aptype = decamelize(ptype); // api plural type

	const types = { type, ptype, ltype, atype, aptype };

	const config = {};

	let state = {
		[ptype]: {},
		[ltype]: []
	};

	return {
		types,
		config,
		state,
		Mutations: Mutations(types),
		Getters: Getters(types),
		Actions: Actions(types, config)
	};
};

export default {
	Mutations,
	Getters,
	Actions,
	Create
};
