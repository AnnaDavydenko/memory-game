import React, {FC} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Header: FC = () => {
    const classes = useStyles();
	return (
        <Grid container
              justify="center"
              alignItems="center">
            <Grid container justify="center" >
                <Typography variant="h1" className={classes.header}>Memory Game</Typography>
            </Grid>
        </Grid>
	);
};

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
