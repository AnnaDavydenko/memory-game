import React from 'react';
import { connect } from 'react-redux';
import { restartGame } from '../actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const ConnectedHeader = (props) => {
	const { restart } = props;
    const classes = useStyles();
	return (
        <Grid container
              justify="center"
              alignItems="center"
              className={classes.headerContainer}>
            <Grid container justify="center" >
                <Typography variant="h1" className={classes.header}>Memory Game</Typography>
            </Grid>
            <Grid item >
                    <button type="button" className={classes.button} onClick={restart}>Restart</button>
            </Grid>
        </Grid>
	);
};
const mapDispatchToProps = dispatch => ({
    restart: () => dispatch(restartGame()),
});

const Header = connect(null, mapDispatchToProps)(ConnectedHeader);

const useStyles = makeStyles({
    header: {
        fontSize: '6rem',
        fontFamily: 'GameFont',
        backgroundImage: 'linear-gradient(120deg, #3a7bd5, #00d2ff)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
    },
});
export default Header;
