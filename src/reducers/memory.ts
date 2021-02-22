import {IAction} from "../common/types";
import {FLIP_CARD} from "../actions/actionTypes/actionTypes";

//todo название
export interface IOffersState {
    flippedCards: Array<number>,
    counter: number,
}

const initialState: IOffersState = {
    flippedCards: [],
    counter: 0,
};

export const memory = (state: IOffersState = initialState, action: IAction) => {
    switch (action.type) {

        case FLIP_CARD:
            return {
                ...state,
                isFetching: true
            };

        // case FETCH_OFFERS.FINISHED:
        //     return {
        //         ...state,
        //         list: [...action.payload],
        //         isFetching: false
        //     };

        default:
            return state;
    }
};
