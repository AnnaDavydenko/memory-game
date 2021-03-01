import {ADD_SCORE, FETCH_SCORES} from "../actions/actionTypes";
import {IAction, IScore} from "../common/types";

export interface IScoresState {
    list: IScore[];
    isFetching: boolean;
}

const initialState: IScoresState = {
    list: [],
    isFetching: false
};

export const scores = (state: IScoresState = initialState, action: IAction) => {
    switch (action.type) {

        case FETCH_SCORES.START:
            return {
                ...state,
                isFetching: true
            };

        case FETCH_SCORES.FINISHED:
            return {
                ...state,
                list: action.payload,
                isFetching: false
            };
        //
        // case ADD_SCORE.START:
        //     return {
        //         ...state,
        //         isFetching: true
        //     };
        //
        // case ADD_SCORE.FINISHED:
        //     return {
        //         ...state,
        //         list: [...state.list, action.payload],
        //         isFetching: false
        //     };

        default:
            return state;
    }
};
