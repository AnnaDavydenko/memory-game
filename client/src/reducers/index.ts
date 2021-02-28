import {combineReducers} from 'redux';
import {settings} from "./settings";
import {scores} from "./scores";

export const rootReducer = combineReducers({
    settings: settings,
    scores: scores,
});

