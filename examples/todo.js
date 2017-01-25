import { createStore } from 'redux';
import Collection from '.';

function todo(state = [], action) {
	return Collection({
		INSERT: 'ADD_TODO',
		UPDATE: 'CHANGE_TODO',
		DELETE: 'REMOVE_TODO',
		compare: (a, b) => a._id == b._id,
	})(state, action);
}

let store = createStore(todo, [
	{
		_id: '1',
		text: 'Use Redux',
	}
]);

store.subscribe(() => console.log(store.getState()));

store.dispatch({
  type: 'ADD_TODO',
  payload: {
    _id: '2',
    text: 'Read the docs',
  }
});

store.dispatch({
	type: 'CHANGE_TODO',
	payload: {
		_id: '2',
		text: 'READ the docs',
	}
});

store.dispatch({
	type: 'REMOVE_TODO',
	payload: {
		_id: '1'
	}
});