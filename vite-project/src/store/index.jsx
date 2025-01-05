import { createStore } from 'redux'
import rootReducer from '../reducer';

const store = createStore(rootReducer)
console.log(store.getState());

export default store


