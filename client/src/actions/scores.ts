import {FETCH_SCORES, ADD_SCORE} from "./actionTypes";
import {IScore} from "../common/types";

export const fetchScores = () => ({
    type: FETCH_SCORES.START,
});

