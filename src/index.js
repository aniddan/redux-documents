export default function Collection({ INSERT, UPDATE, DELETE, compare, extract = action => action.payload }) {
	return (state, action) => {
		switch (action.type) {
		case INSERT: {
			return [...state, ...extract(action)];
		}
		case UPDATE: {
			let changes = extract(action);
			return state.map(doc => {
				if (compare(doc, changes)) {
					return {...doc, ...changes};
				}
				return doc;
			});
		}
		case DELETE: {
			return state.filter(doc => compare(doc, extract(action)));
		}
		}
		return state;
	};
}