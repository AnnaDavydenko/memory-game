import React from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { GiAlarmClock } from "react-icons/gi";

const Rules = () => {
    const classes = useStyles();
    return (
        <main>
            <div className={classes.modalContainer} >
                <div className={classes.modal}>
                    <h2 className={classes.modalTitle}>Game Rules</h2>
                <ul className={classes.rulesList}>
                    <li>There will be 16 cards displayed on the screen.</li>
                    <li>Click on a card to flip it and memorize the picture.</li>
                    <li>You need to match the cards with same picture.</li>
                    <li>Clock is ticking
                        <span className={classes.icon}>
                            <GiAlarmClock />
                        </span>
                    </li>
                </ul>
                <Link to={"/"} className={classes.button}>{"Back"}</Link>
                </div>
            </div>
        </main>
    );
};
const useStyles = makeStyles({
    modalContainer: {
        marginTop: '4rem',
        paddingBottom: '2rem',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    modal: {
        width: '500px',
        minHeight: '300px',
        background: '#fff',
        padding: '1.5rem 2rem',
        borderRadius: '5px',
        boxShadow: '0 2rem 5rem 0 rgba(0, 0, 0, 0.2)',
    },
    modalTitle: {
        fontSize: '2.2rem',
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontFamily: 'Hachi Maru Pop',
        color: '#3288dc',
    },
    button: {
        fontSize: '1.8rem',
        padding: '1rem 7rem',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(120deg, #3a7bd5, #00d2ff)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontFamily: 'Reggae One',
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 1rem 2rem 0 rgba(0, 0, 0, 0.2)',
        },
        '&:focus': {
            outline: 0,
            boxShadow: '0 1rem 2rem 0 rgba(0, 0, 0, 0.2)',
        },
        '&:active': {
            transform: 'scale(1)',
        },
    },
    rulesList: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
        fontSize: "1.4rem",
        padding: "1.5rem 0",
        '& li': {
            padding: '0.5rem 0',
        },
    },
    icon: {
        paddingLeft: '0.5rem',
        color: '#ff5e2b',
        fontSize: '2rem',
        '& svg': {
            verticalAlign: 'middle',
        },
    },
});
export default Rules;
