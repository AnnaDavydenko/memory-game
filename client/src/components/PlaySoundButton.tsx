import React, {FC, useCallback} from "react";
import {makeStyles} from "@material-ui/core";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";


interface IPlaySoundButton {
    enabled: boolean;
    type: string;
    onClick: (type: string) => void;
}

const PlaySoundButton: FC<IPlaySoundButton> = (props: IPlaySoundButton) => {

    const {type, onClick, enabled} = props;
    const classes = useStyles();

    const handleClick = useCallback(() => onClick(type), [type, onClick]);

    return (
        <>
            {enabled && (
                <button onClick={handleClick} className={classes.button} title={'Disable music'}>
                    <span className={classes.icon}>
                        <IoMdVolumeHigh />
                    </span>
                </button>
            )}
            {!enabled && (
                <button onClick={handleClick} className={classes.button} title={'Enable music'}>
                    <span className={classes.icon}>
                        <IoMdVolumeOff />
                    </span>
                </button>
            )}
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
