import React, {FC, useCallback, useState} from "react";
import {makeStyles} from "@material-ui/core";
// @ts-ignore
import fonSound from '../assets/sounds/fon.mp3';
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";

const PlaySoundButton: FC = () => {

    const [play, setPlay] = useState<boolean>(false);
    const classes = useStyles();

    const handlePlay = useCallback(() => {
        const audio = document.querySelector("#megaSound") as HTMLAudioElement;
        setPlay(true);
        audio.play();
    }, []);

    const handlePause = useCallback(() => {
        const audio = document.querySelector("#megaSound") as HTMLAudioElement;
        setPlay(false);
        audio.pause();
    }, []);

    return (
        <>
            {play && (<button onClick={handlePause} className={classes.button} title={'Disable music'}>
                <span className={classes.icon}>
                    <IoMdVolumeHigh />
                </span>
            </button>)}
            {!play && (<button onClick={handlePlay} className={classes.button} title={'Enable music'}>
                <span className={classes.icon}>
                    <IoMdVolumeOff />
                </span>
            </button>)}
        </>
    )
};

const useStyles = makeStyles({
    icon: {
        paddingLeft: '0.5rem',
        color: '#01c5f1 ',
        fontSize: '2rem',
        display: 'flex',
        '& svg': {
            verticalAlign: 'middle',
        },
    },
    button: {
        background: 'transparent',
    },

});
export default PlaySoundButton;
