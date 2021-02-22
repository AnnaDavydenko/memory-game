import {memory} from './memory';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
    memory: memory,
});
