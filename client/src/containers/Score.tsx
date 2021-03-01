import React, {useEffect} from "react";
import {config} from "../config";
import {getAllScoresThunk} from "../thunks/scores";
import {IScore, ISettings, IState} from "../common/types";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

interface IRedux {
    isScoresFetching: boolean,
    scores: IScore[],
}

interface IDispatch {
    getAllScores: () => void;
}

type IProps = IRedux & IDispatch;

const ScoreContainer = (props: IProps) => {
    const {isScoresFetching, scores, getAllScores} = props;
    const classes = useStyles();
    useEffect(() => {
        getAllScores();
    }, [getAllScores]);


    const handleClick = () => {

    }


    return (
        <main>
            <div className={classes.absolute}>
                <table className={classes.scroll}>
                    <thead className={classes.tableHeader}>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Flips</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((score: IScore, index: number) => {
                        return (
                            <tr key={score.id} >
                                <td>{index+1}</td>
                                <td>{score.title}</td>
                                <td>{score.value}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <button onClick={handleClick}>{"click me"}</button>
        </main>
    );
};
const useStyles = makeStyles({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        textAlign: 'center',
    },
    tableHeader: {
        fontSize: '18px',
    },
    scroll: {
        height: 'calc(100% - 120px)',
        overflow: 'hidden',
        background: '#00000069',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: '25px auto',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '7px',
        border: '2px solid #150304',
        padding: '10px',
        fontFamily: 'Cinzel',
        '& tbody': {
            display: 'block',
            height: '100%',
            overflowY: 'scroll',
            paddingBottom: '8px',
        },
        '& tbody::-webkit-scrollbar': {
            width: '3px',
        },
        '& thead, tbody tr': {
            display: 'table',
            width: '100%',
            tableLayout: 'fixed',
        },
        '& tbody tr': {
            height: '45px',
        },
        '& thead': {
            width: 'calc(100% - 2px)',
        },
        '& tbody::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '10px',
        },
        '& tbody::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: '#ffa96cc9',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)',
        },
    },
});

const mapStateToProps = (state: IState) => ({
    isScoresFetching: state.scores.isFetching,
    scores: state.scores.list,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllScores: () => {
        // @ts-ignore
        dispatch(getAllScoresThunk());
    }
});

const Score = connect(mapStateToProps, mapDispatchToProps)(ScoreContainer);

export default Score;
