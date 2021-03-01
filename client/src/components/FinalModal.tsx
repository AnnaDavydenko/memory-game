import React, {FC, useCallback, useState} from "react";
import { GiBackstab, GiCardJoker, GiTrophy } from "react-icons/gi";
import {makeStyles, Theme, ThemeProvider} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Zoom from '@material-ui/core/Zoom';
import {useHistory} from "react-router";


interface IFinalModal {
    flips: number;
}

const FinalModal:FC<IFinalModal> = (props:IFinalModal) => {
    const {flips} = props;
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    let history = useHistory();

    const handleSubmit = useCallback(() => {
        console.log(flips);
        console.log(name);

        history.push("/score");
    }, [history, name, flips]);

    const handleChangeInput = useCallback((e: any) => {
        setName(e.target.value);
    }, []);


    return (
        <Zoom in={open}>
            <div className={classes.modalContainer}>
                <Dialog open={open}>
                    <h2 className={classes.title}>Game Over</h2>
                    <DialogContent className={classes.content}>
                        <div className={classes.victory}>
                            <span className={classes.win}> <GiTrophy /> YOU WIN!! </span>
                        </div>
                        <div className={classes.joker}><GiCardJoker /> Cards Flipped: {flips}</div>
                        <form className={classes.root}>
                        <TextField
                            value={name}
                            onChange={handleChangeInput}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Your Name"
                            type="text"
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.input,
                                },
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.label,
                                    focused: classes.focusedLabel,
                                },
                            }}
                        />
                        </form>
                    </DialogContent>
                    <button onClick={handleSubmit} className={classes.button}>Continue</button>
                </Dialog>
            </div>
        </Zoom>
    );
};

const useStyles = makeStyles({
    modalContainer: {
        marginTop: '4rem',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0 2rem 5rem 0 rgba(0, 0, 0, 0.2)',
    },
    title:{
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #3288dc',
        color: '#3288dc',
        fontFamily: 'Hachi Maru Pop',
        fontSize: '2.2rem',
        textTransform: 'uppercase',
        padding: '1rem 0',
    },
    content: {
        fontSize: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '500px',
        minHeight: '300px',

        '& svg': {
            verticalAlign: 'middle',
            marginBottom: '8px',
        }
    },
    victory: {
        marginBottom: '1.5rem',
    },
    win:{
        fontFamily: 'Reggae One',
        color: '#3288dc',
        '& svg': {
            color: '#47ff44',
        }
    },
    lose:{
        fontFamily: 'Reggae One',
        color: '#3288dc',
        '& svg': {
            color: '#ff4444',
        }
    },
    joker:{
        fontFamily: 'Reggae One',
        color: '#3288dc',
        '& svg': {
            color: '#01c5f1 ',
        }
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiInput-underline:after': {
            borderColor: '#01c5f1',
        },
        '& .MuiInput-underline:before': {
            borderBottom: '2px solid #3288dc',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: '2px solid #3288dc',
        },
    },
    input: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
        fontSize: '1.5rem',
    },
    label: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
        '&$focusedLabel': {
            color: '#01c5f1',
        },
    },
    focusedLabel: {
    },
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

export default FinalModal;
