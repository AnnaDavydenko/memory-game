import {IScore} from "../common/types";
import {Dispatch} from "redux";
import {addScore, fetchScores} from "../actions";
import {config} from "../config";
import {ADD_SCORE, GET_SCORES} from "../actions/actionTypes";

export const addScoreThunk = (score: IScore) => (dispatch: Dispatch) => {
    // add start
    dispatch(addScore(ADD_SCORE.START));
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
            dispatch(addScore(ADD_SCORE.FINISHED, res.newTodo));
        })
        .catch(res => {
            //add failing
            dispatch(addScore(ADD_SCORE.FAILED));
        });
};

export const getAllScoresThunk = () => (dispatch: Dispatch) => {
    // fetch start
    dispatch(fetchScores(GET_SCORES.START));
    fetch(`${config.api}/api/scores`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(res => {
            // fetch success
            dispatch(fetchScores(GET_SCORES.FINISHED, res.data));
        })
        .catch(err => {
            // fetch error
            dispatch(fetchScores(GET_SCORES.FAILED));
        });


};
