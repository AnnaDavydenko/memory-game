import React, {FC, useCallback} from "react";
import { GiBackstab, GiCardJoker, GiTrophy } from "react-icons/gi";
import LinkButton from "../components/LinkButton";
import {makeStyles, Theme, ThemeProvider} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from "./Modal";

interface IFinalModal {
    victory: boolean;
    flips: number;
}

const FinalModal:FC<IFinalModal> = (props:IFinalModal) => {
    const {victory, flips} = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleSubmit = useCallback(() => {

    }, []);
    return (

        <div className={classes.modalContainer}>
            <Dialog open={open}>
                <h2 className={classes.title}>Game Over</h2>
                <DialogContent className={classes.content}>
                    <div>{(props.victory) ? (
                        <span className={classes.win}> <GiTrophy /> YOU WIN!! </span>) : (<span className={classes.lose}> <GiBackstab /> YOU LOSE!! </span>
                    )} </div>
                    <div className={classes.joker}><GiCardJoker /> Cards Flipped: {props.flips}</div>
                    <form className={classes.root}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Your Name"
                        type="text"
                        fullWidth
                        className={classes.margin}
                    />
                    </form>
                </DialogContent>
                <LinkButton to={"/score"} text={"Continue"} />
            </Dialog>
        </div>
    );
};





const useStyles = makeStyles((theme: Theme) => ({
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
    },
    margin: {
        margin: '2rem',
    },
}));


// const theme = createMuiTheme({
//     palette: {
//         primary: green,
//     },
// });

export default FinalModal;
