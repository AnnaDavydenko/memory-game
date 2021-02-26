import React, {FC, useState, useCallback} from 'react';
import {makeStyles} from "@material-ui/core";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import classNames from "classnames";
import LinkButton from "../components/LinkButton";
import PlaySoundButton from "../components/PlaySoundButton";
import Modal from "../components/Modal";
import {ISettings, IState} from "../common/types";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {updateSettingsThunk} from "../thunks/settings";

interface IRedux {
    storageSettings: ISettings;
}

interface IDispatch {
    onUpdateSettings: (settings: ISettings) => void;
}

type IProps = IRedux & IDispatch;

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
}
interface Props extends SwitchProps {
    classes: Styles;
}

const SettingsContainer: FC<IProps> = (props: IProps) => {
    const classes = useStyles();

    const {storageSettings, onUpdateSettings} = props;

    const [valueSound, setValueSound] = useState<number>(30);
    // const [valueMusic, setValueMusic] = useState<number>(30);
    // const [fullScreenEnabled, setFullScreenEnabled] = useState<boolean>(false);

    const [settings, setSettings] = useState<ISettings>(storageSettings);

    const handleChangeFullScreen = useCallback((event: React.ChangeEvent<HTMLInputElement>, fullScreenValue: boolean) => {
        if (fullScreenValue) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        settings.fullScreen = fullScreenValue;
        setSettings({...settings});
        onUpdateSettings(settings);
    }, [settings, onUpdateSettings]);


    const handleChangeVolumeSound = (event: any, newValue: number | number[]) => {
        setValueSound(newValue as number);
    };

    const handleChangeVolumeMusic = useCallback((event: any, newValue: number | number[]) => {
        const audio = document.querySelector("#megaSound") as HTMLAudioElement;
        audio.volume = (newValue as number) / 100;
        settings.volumeMusic = newValue as number;
        setSettings({ ...settings });
        onUpdateSettings(settings);
    },[settings, onUpdateSettings]);

    return (
        <main>
            <Modal title='Settings'>
                <Grid container direction="column" className={classes.settingsContainer}>
                    <Grid item className={classes.settingItem}>
                        <span className={classes.span}>Full Screen</span>
                        <IOSSwitch
                            checked={settings.fullScreen}
                            onChange={handleChangeFullScreen}
                            name="fullScreenValue"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Grid>

                    <Grid item className={classes.settingItem}>
                        <span className={classes.span}>Enable Music</span>
                        <PlaySoundButton/>
                    </Grid>

                    <Grid container className={classNames(classes.slider, classes.settingItem)}>
                        <span className={classes.span}>Sounds</span>
                        <Grid item>
                           <VolumeDown />
                        </Grid>
                        <Grid item xs>
                            <Slider value={valueSound} onChange={handleChangeVolumeSound} />
                        </Grid>
                        <Grid item>
                            <VolumeUp />
                        </Grid>
                    </Grid>

                    <Grid container className={classNames(classes.slider, classes.settingItem)}>
                        <span className={classes.span}>Music</span>
                        <Grid item>
                            <VolumeDown />
                        </Grid>
                        <Grid item xs>
                            <Slider value={settings.volumeMusic} onChange={handleChangeVolumeMusic} aria-labelledby="continuous-slider" />
                        </Grid>
                        <Grid item>
                            <VolumeUp />
                        </Grid>
                    </Grid>
                </Grid>
                <LinkButton to={"/"} text={"Back"} />
            </Modal>
        </main>
    );
};

const useStyles = makeStyles({
    settingsContainer: {
      marginBottom: '0.5rem',
    },
    slider: {
        width: 200,
    },
    span: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
        paddingRight: '1.5rem',
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

const mapStateToProps = (state: IState) => ({
    storageSettings: state.settings.settings,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onUpdateSettings: (settings: ISettings) => {
        // @ts-ignore
        dispatch(updateSettingsThunk(settings));
    }
});

const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
export default Settings

