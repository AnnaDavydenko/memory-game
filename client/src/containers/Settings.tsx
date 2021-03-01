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

const SOUND_TYPES = {
    MUSIC: 'music',
    SOUND: 'sound',
};

const SettingsContainer: FC<IProps> = (props: IProps) => {
    const classes = useStyles();

    const {storageSettings, onUpdateSettings} = props;

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

    const handleChangeVolumeSound = useCallback((event: any, newValue: number | number[]) => {
        const audio = document.querySelector("#buttonSound") as HTMLAudioElement;
        audio.volume = (newValue as number) / 100;
        settings.volumeSounds = newValue as number;
        setSettings({ ...settings });
        onUpdateSettings(settings);
    }, [settings, onUpdateSettings]);

    const handleChangeVolumeMusic = useCallback((event: any, newValue: number | number[]) => {
        const audio = document.querySelector("#music") as HTMLAudioElement;
        audio.volume = (newValue as number) / 100;
        settings.volumeMusic = newValue as number;
        setSettings({ ...settings });
        onUpdateSettings(settings);
    },[settings, onUpdateSettings]);

    const handleChangeSound = useCallback((type: string) => {
        const audio = document.querySelector("#music") as HTMLAudioElement;
        const sound = document.querySelector("#buttonSound") as HTMLAudioElement;
        if (type === SOUND_TYPES.MUSIC) {
            if (!settings.enableMusic) {
                audio.play();
            } else {
                audio.pause();
            }
            settings.enableMusic = !settings.enableMusic;
        }
        if (type === SOUND_TYPES.SOUND) {
            if (!settings.enableSounds) {
                sound.play();
            } else {
                sound.pause();
            }
            settings.enableSounds = !settings.enableSounds;
        }

        setSettings({ ...settings });
        onUpdateSettings(settings);
    }, [settings, onUpdateSettings]);

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

                    <Grid container justify='space-between' className={classes.gridContainer} >
                        <Grid item className={classes.settingItem} >
                            <span className={classes.span}>Enable Music</span>
                            <PlaySoundButton type={SOUND_TYPES.MUSIC} enabled={settings.enableMusic} onClick={handleChangeSound}/>
                        </Grid>

                        <Grid item className={classes.settingItem}>
                            <span className={classes.span}>Enable Sounds</span>
                            <PlaySoundButton type={SOUND_TYPES.SOUND} enabled={settings.enableSounds} onClick={handleChangeSound}/>
                        </Grid>
                    </Grid>
                <Grid container justify='space-between'>
                    <Grid container className={classNames(classes.sliderContainer, classes.settingItem)}>
                        <span className={classes.span}>Sounds</span>
                        <Grid item className={classes.icon}>
                           <VolumeDown />
                        </Grid>
                        <Grid item xs>
                            <Slider className={classes.slider} valueLabelDisplay="on" value={settings.volumeSounds} onChange={handleChangeVolumeSound} />
                        </Grid>
                        <Grid item className={classes.icon}>
                            <VolumeUp />
                        </Grid>
                    </Grid>

                    <Grid container className={classNames(classes.sliderContainer, classes.settingItem)}>
                        <span className={classes.span}>Music</span>
                        <Grid item className={classes.icon}>
                            <VolumeDown />
                        </Grid>
                        <Grid item xs>
                            <Slider className={classes.slider} valueLabelDisplay="on" value={settings.volumeMusic} onChange={handleChangeVolumeMusic} />
                        </Grid>
                        <Grid item className={classes.icon}>
                            <VolumeUp />
                        </Grid>
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
    sliderContainer: {
        width: 200,
    },
    span: {
        fontFamily: 'Reggae One',
        color: '#3288dc',
        paddingRight: '1.5rem',
    },
    gridContainer: {
        marginBottom: '1rem',
    },
    settingItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '1rem 0',
    },
    icon: {
        '& svg': {
            color: '#01c5f1 ',
            fontSize: '2rem',
        }
    },
    slider: {
        color: '#3288dc',
    }

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
export default Settings;

