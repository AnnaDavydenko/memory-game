import React, {FC} from "react";
import { makeStyles } from '@material-ui/core/styles';
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";
import {Grid} from "@material-ui/core";

const Rules:FC = () => {
    const classes = useStyles();
    return (
            <Modal title='Game Rules'>
                <ul className={classes.rulesList}>
                    <li>There will be 12 cards displayed on the screen.</li>
                    <li>Click on a card to flip it and memorize the picture.</li>
                    <li>You need to match the cards with same picture.</li>

                </ul>
                <h6 className={classes.subHeader}>Hot keys:</h6>

                <div className={classes.hotKeysContainer}>

                <Grid container justify='space-between'>
                    <div className={classes.hotKeyText}>
                        <span className={classes.hotKeyIcon}><span className={classes.alt}>Alt+</span>x</span>
                        Turn on full screen
                    </div>
                    <div className={classes.hotKeyText}>
                        <span className={classes.hotKeyIcon}>Esc</span>
                        Turn off full screen
                    </div>
                </Grid>
                <Grid container justify='space-between'>
                    <div className={classes.hotKeyText}>
                        <span className={classes.hotKeyIcon}><span className={classes.alt}>Alt+</span>m</span>
                        Turn on / off music
                    </div>
                    <div className={classes.hotKeyText}>
                        <span className={classes.hotKeyIcon}><span className={classes.alt}>Alt+</span>s</span>
                        Turn on / off sounds
                    </div>
                </Grid>
                <Grid container justify='space-between'>
                    <div className={classes.hotKeyText}>
                        <span className={classes.hotKeyIcon}><span className={classes.alt}>Alt+</span>r</span>
                        Restart Game
                    </div>
                    <div className={classes.hotKeyText}>
                        <span className={classes.hotKeyIcon}><span className={classes.alt}>Alt+</span>d</span>
                        Get default settings
                    </div>
                </Grid>
                </div>
                <LinkButton to={"/"} text={"Back"} />
            </Modal>
    );
};
const useStyles = makeStyles({
    rulesList: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
        fontSize: "1.4rem",
        '& li': {
            padding: '0.5rem 0',
        },
    },
    subHeader: {
        color: '#3288dc',
        display: 'flex',
        fontSize: '2rem',
        fontFamily: 'Hachi Maru Pop',
        textTransform: 'uppercase',
        justifyContent: 'center',
    },
    hotKeyIcon: {
        fontFamily: 'Hachi Maru Pop',
        paddingRight: '0.5rem',
        color: '#01c5f1',
        fontSize: '2rem',
    },
    hotKeyText: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
    },
    hotKeysContainer: {
        padding: "0.5rem 0 1.5rem 0",
    },
    alt: {
        fontFamily: 'Hachi Maru Pop',
        fontSize: '1rem',
    },
});
export default Rules;
