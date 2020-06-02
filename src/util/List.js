export const ListSet = (arr, id) => {
	if (typeof arr !== 'object') return;

	if (/^\d+$/.test(id)) {
		id = Number(id);
	}

	let index = arr.indexOf(id);
	if (index !== -1) {
		arr.splice(index, 1);
	}

	arr.push(id);
};
