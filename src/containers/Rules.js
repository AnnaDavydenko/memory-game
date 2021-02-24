import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GiAlarmClock } from "react-icons/gi";
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";

const Rules = () => {
    const classes = useStyles();
    return (
        <main>
            <Modal title='Game Rules'>
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
                <LinkButton
                    to={"/"} text={"Back"}>
                </LinkButton>
            </Modal>
        </main>
    );
};
const useStyles = makeStyles({
    rulesList: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
        fontSize: "1.4rem",
        padding: "1.5rem 0 0 0",
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
