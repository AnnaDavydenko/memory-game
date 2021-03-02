import {ADD_SCORE, GET_SCORES} from "../actions/actionTypes";
import {IAction, IScore} from "../common/types";

export interface IScoresState {
    list: IScore[];
    isFetching: boolean;
    isUpdating: boolean;
}

const initialState: IScoresState = {
    list: [],
    isFetching: false,
    isUpdating: false,
};

export const scores = (state: IScoresState = initialState, action: IAction) => {
    switch (action.type) {

        case GET_SCORES.START:
            return {
                ...state,
                isFetching: true
            };

        case GET_SCORES.FINISHED:
            return {
                ...state,
                list: action.payload,
                isFetching: false
            };

        case ADD_SCORE.START:
            return {
                ...state,
                isUpdating: true
            };

        case ADD_SCORE.FINISHED:
            return {
                ...state,
                list: [...state.list, action.payload],
                isUpdating: false
            };

        default:
            return state;
    }
};
