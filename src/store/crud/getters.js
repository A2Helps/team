export const Getters = types => {
	// const type = types.type;
	const ptype = types.ptype;
	const ltype = types.ltype;

	return {
		all: state => state[ltype].map(x => state[ptype][x]),
		list: state => state[ltype],

		find: (state, getters) => id => {
			if (id === null) return null;

			if (Array.isArray(id)) {
				return getters['findMany'](id);
			}

			if (typeof id === 'function') {
				return getters['findByFilter'](id);
			}

			// why are we doing this? well so we are reactive of course!
			let res = state[ltype].indexOf(id);
			res = state[ptype][id];

			return res === undefined ? null : res;
		},

		findMany: (state, getters) => ids => {
			return getters['filter'](x => ids.indexOf(x.id) > -1);
		},

		filter: state => filterCb => {
			return state[ltype].filter(x => filterCb(state[ptype][x])).map(x => state[ptype][x]);
		},

		findByFilter: state => filterCb => {
			let ret = state[ltype].find(x => filterCb(state[ptype][x]));

			return ret ? state[ptype][ret] : null;
		}
	};
};

export default Getters;
