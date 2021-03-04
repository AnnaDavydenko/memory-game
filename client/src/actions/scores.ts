import {IScore} from "../common/types";

export const fetchScores = (type: string, scores?: IScore[]) => ({
    type,
    payload: scores
});

export const addScore = (type: string, score?: IScore) => {
    return {
        type,
        payload: score
    }
};
