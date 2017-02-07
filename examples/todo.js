import { createStore } from 'redux';
import Collection from '..';

const todo = (state = [], action) =>
  Collection({
    INSERT: 'ADD_TODO',
    UPDATE: 'CHANGE_TODO',
    DELETE: 'REMOVE_TODO',
    compare: (a, b) => a._id == b._id,
  })(state, action);

const store = createStore(todo, [
  {
    _id: '1',
    text: 'Use Redux',
  },
]);

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

store.dispatch({
  type: 'ADD_TODO',
  payload: {
    _id: '2',
    text: 'Read the docs',
  },
});

store.dispatch({
  type: 'CHANGE_TODO',
  payload: {
    _id: '2',
    text: 'READ the docs',
  },
});

store.dispatch({
  type: 'REMOVE_TODO',
  payload: {
    _id: '1',
  },
});