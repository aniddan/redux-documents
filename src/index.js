export default function Collection({ INSERT, UPDATE, DELETE, compare, extract = action => action.payload }) {
  return (state, action) => {
    const extracted = extract(action);
    switch (action.type) {
      case INSERT: {
        return [...state, ...(extracted[Symbol.iterator] ? extracted : [extracted])];
      }
      case UPDATE: {
        return state.map(doc => {
          if (compare(doc, extracted)) {
            return { ...doc, ...extracted };
          }
          return doc;
        });
      }
      case DELETE: {
        return state.filter(doc => compare(doc, extracted));
      }
    }
    return state;
  };
}