import Vue from 'vue';
import log from '@/log';
import { ListSet } from '@/util/List';

export const Mutations = types => {
	const type = types.type;
	const ptype = types.ptype;
	const ltype = types.ltype;

	return {
		SET(state, data) {
			Vue.set(state[ptype], data[type].id, data[type]);

			ListSet(state[ltype], data[type].id);

			log.debug(`Mutation/${type}@SET: ${data[type].id}`);
		},

		SET_MANY(state, data) {
			let objs = state[ptype];
			let list = state[ltype];

			data[ptype].forEach(x => {
				objs[x.id] = x;

				ListSet(list, x.id);
			});

			Vue.set(state, ptype, objs);
			Vue.set(state, ltype, list);

			log.debug(`Mutation/${type}@SET_MANY: ${data[ptype].length}`);
		},

		REPLACE_ALL(state, data) {
			let tmp = {};
			let list = [];

			data[ptype].forEach(x => {
				tmp[x.id] = x;
				list.push(x.id);
			});

			Vue.set(state, ptype, tmp);
			Vue.set(state, ltype, list);

			log.debug(`Mutation/${type}@REPLACE_ALL: ${ptype.length}`);
		},

		// supported deletion keys
		// { id: 1 }, { test: { id: 1 }}, and { testId: 1 }
		DELETE(state, data) {
			let id = data['id'];

			if (!id) {
				if (typeof data[type] === 'object') {
					id = data[type].id;
				} else {
					id = data[type + 'Id'];
				}
			}

			if (!id) {
				log.warn(`Mutation/${type}@DELETE: no ${type}Id or ${type} provided`);
				return;
			}

			let index = state[ltype].indexOf(id);
			if (index === -1) {
				return;
			}

			state[ltype].splice(index, 1);
			Vue.delete(state[ptype], id);

			log.debug(`Mutation/${type}@DELETE: ${id}`);
		},

		// supported deletion keys
		// { ids: [1, 2] }
		// { testIds: [1, 2] }
		// { tests: [{ id: 1 }, { id: 2 }] }
		DELETE_MANY(state, data) {
			let ids = data['ids'];

			if (!ids) {
				if (typeof data[type + 'Ids'] === 'object') {
					ids = data[type + 'Ids'];
				} else if (typeof data[ptype] === 'object') {
					ids = data[ptype].map(x => x.id);
				}
			}

			if (!ids || typeof ids !== 'object') {
				log.warn(`Mutation/${type}@DELETE_MANY: no ids provided`);
				return;
			}

			let objs = state[ptype];
			let list = state[ltype];

			ids.forEach(id => {
				let index = list.indexOf(id);
				if (index === -1) {
					return;
				}

				delete objs[id];
				list.splice(index, 1);
			});

			Vue.set(state, ptype, objs);
			Vue.set(state, ltype, list);

			log.debug(`Mutation/${type}@DELETE_MANY`);
		},

		DELETE_ALL(state) {
			Vue.set(state, ptype, {});
			Vue.set(state, ltype, []);

			log.debug(`Mutation/${ptype}@DELETE_ALL`);
		}
	};
};

export default Mutations;
