import React, {FC, useCallback, useRef} from "react";
import { useHistory } from "react-router-dom";
import {makeStyles} from "@material-ui/core";
// @ts-ignore
import buttonSound from "../assets/sounds/buttonSound.mp3";
import {ISettings, IState} from "../common/types";
import {connect} from "react-redux";



interface ILinkProps {
    text: string;
    to: string;
}


const LinkButton: FC<ILinkProps> = (props: ILinkProps) => {
    const {text, to} = props;
    const classes = useStyles();
    let history = useHistory();
    const audioRef = useRef<any>();

    const handleClick = useCallback(() => {
        audioRef?.current?.play();
        setTimeout(() => {
            history.push(to);
        }, 250);
    }, [audioRef, history, to]);

    return (
        <>
            <button className={classes.button} onClick={handleClick}>
                {text}
            </button>
            <audio ref={audioRef} src={buttonSound} />
        </>
    );
};
const useStyles = makeStyles({
    button: {

        marginBottom:'1.5rem',
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
});

export default LinkButton;
