import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import classNames from "classnames";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
}
interface Props extends SwitchProps {
    classes: Styles;
}

const Settings: FC = () => {
    const classes = useStyles();
    const [state, setState] = useState({isChecked: false});
    const [valueSound, setValueSound] = useState<number>(30);
    const [valueMusic, setValueMusic] = useState<number>(30);
   
    const handleChangeFullScreen = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleChangeVolumeSound = (event: any, newValue: number | number[]) => {
        setValueSound(newValue as number);
    };
    const handleChangeVolumeMusic = (event: any, newValue: number | number[]) => {
        setValueMusic(newValue as number);
    };
    return (
        <main>
            <div className={classes.modalContainer} >
                <div className={classes.modal}>
                    <h2 className={classes.modalTitle}>Settings</h2>
                    <Grid container direction="column">
                        <Grid item className={classes.settingItem}>
                            <span className={classes.span}>Full Screen</span>
                            <IOSSwitch
                                checked={state.isChecked}
                                onChange={handleChangeFullScreen}
                                name="isChecked"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                        <Grid container spacing={2} className={classNames(classes.slider, classes.settingItem)}>
                            <span className={classes.span}>Sounds</span>
                            <Grid item>
                               <VolumeDown />
                            </Grid>
                            <Grid item xs>
                                <Slider value={valueSound} onChange={handleChangeVolumeSound} aria-labelledby="continuous-slider" />
                            </Grid>
                            <Grid item>
                                <VolumeUp />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={classes.slider}>
                            <span className={classes.span}>Music</span>
                            <Grid item>
                                <VolumeDown />
                            </Grid>
                            <Grid item xs>
                                <Slider value={valueMusic} onChange={handleChangeVolumeMusic} aria-labelledby="continuous-slider" />
                            </Grid>
                            <Grid item>
                                <VolumeUp />
                            </Grid>
                        </Grid>
                    </Grid>
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
    slider: {
        width: 200,

    },
    span: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
    },
    settingItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '1rem 0',
    },

});

const IOSSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 42,
            height: 26,
            padding: 0,
            margin: theme.spacing(1),
        },
        switchBase: {
            padding: 1,
            '&$checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + $track': {
                    backgroundColor: '#01c5f1 ',
                    opacity: 1,
                    border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: '#01c5f1 ',
                border: '6px solid #fff',
            },
        },
        thumb: {
            width: 24,
            height: 24,
        },
        track: {
            borderRadius: 26 / 2,
            border: `1px solid ${theme.palette.grey[400]}`,
            backgroundColor: '#d2d2d2',
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
    }),
)(({ classes, ...props }: Props) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

export default Settings;

