import {IScore} from "../common/types";
import {Dispatch} from "redux";
import {addScore, fetchScores} from "../actions";
import {config} from "../config";
import {FETCH_SCORES} from "../actions/actionTypes";

export const addScoreThunk = (score: IScore) => (dispatch: Dispatch) => {
    // add start
    dispatch(addScore(FETCH_SCORES.START));
    fetch(`${config.api}/api/scores/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: score.title, value: score.value}),
    })
        .then(res => res.json())
        .then(res => {
            // add success
            dispatch(addScore(FETCH_SCORES.FINISHED, res.data));
        })
        .catch(res => {
            //add failing
            dispatch(addScore(FETCH_SCORES.FAILED));
        });
};

export const getAllScoresThunk = () => (dispatch: Dispatch) => {
    // fetch start
    dispatch(fetchScores(FETCH_SCORES.START));
    fetch(`${config.api}/api/scores`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(res => {
            // fetch success
            dispatch(fetchScores(FETCH_SCORES.FINISHED, res.data));
        })
        .catch(err => {
            // fetch error
            dispatch(fetchScores(FETCH_SCORES.FAILED));
        });


};
