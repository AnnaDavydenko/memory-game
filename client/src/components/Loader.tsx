import React, {FC} from 'react';
import {makeStyles} from "@material-ui/core";
import loader from "../assets/images/loader.gif";

const Loader: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.loaderContainer} >
            <img src={loader} alt='Loader' />
        </div>
    )
};

const useStyles = makeStyles({
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "calc(100vh - 146px)",
        '& img' : {
            width: '5rem',
        }
    },
});

export default Loader;
