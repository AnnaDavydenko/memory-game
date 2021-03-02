import React, {useEffect} from "react";
import {getAllScoresThunk} from "../thunks/scores";
import {IScore, IState} from "../common/types";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";
import {Loader} from "../components";

interface IRedux {
    isScoresFetching: boolean,
    scores: IScore[],
}

interface IDispatch {
    getAllScores: () => void;
}

type IProps = IRedux & IDispatch;

const ScoreContainer = (props: IProps) => {
    const {isScoresFetching, scores = [], getAllScores} = props;
    const classes = useStyles();
    useEffect(() => {
        getAllScores();
    }, [getAllScores]);

    return (
        <>
            {(isScoresFetching) ? (<Loader/>) : (
                <main>
                    <Modal title='High Score'>
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
                                        <tr key={score.id}>
                                            <td>{index + 1}</td>
                                            <td>{score.title}</td>
                                            <td>{score.value}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <LinkButton to={"/"} text={"Menu"}/>
                    </Modal>

                </main>
            )}
        </>
    );
};
const useStyles = makeStyles({
    absolute: {
    },
    tableHeader: {
        fontSize: '18px',
    },
    scroll: {
        height: '19rem',
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(120deg, #3a7bd5, #00d2ff)',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto 1.5rem',
        textAlign: 'center',
        borderRadius: '5px',
        padding: '10px',
        fontFamily: 'Reggae One',
        color: '#ffffff',
        '& tbody': {
            display: 'block',
            height: '100%',
            overflowY: 'scroll',
            padding: '0.3rem 0',
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
            height: '3.2rem',
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
            background: '#ffffff',
            boxShadow: 'inset 0 0 6px #ffffff',
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
