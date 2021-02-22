import React from "react";
import {Link, Route} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const Menu = () => {
    const classes = useStyles();

    return (
        <main>
            <div className={classes.modalContainer} >
                <div className={classes.modal}>
                    <h2 className={classes.modalTitle}>Welcome</h2>
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center">
                        <Link to={"/chooseCards"} className={classes.button}>{"New Game"}</Link>
                        <Link to={"/score"} className={classes.button}>{"High Score"}</Link>
                        <Link to={"/gameRules"} className={classes.button}>{"Rules"}</Link>
                        <Link to={"/settings"} className={classes.button}>{"Settings"}</Link>
                    </Grid>
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
        marginTop:'1.5rem',
        fontFamily: 'Reggae One',
        width: '80%',
        textAlign: 'center',
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


});
export default Menu;

