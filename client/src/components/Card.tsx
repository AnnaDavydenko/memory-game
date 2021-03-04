import React, {FC, useCallback} from "react";
import cardImage from "../assets/images/card.png";
import getImage from "../utils/getImage";
import {makeStyles} from "@material-ui/core";
import classNames from "classnames";
import {ISettings, IState} from "../common/types";
import {connect} from "react-redux";

interface IRedux {
    storageSettings: ISettings;
}
interface ICardProps {
    id: number;
    type: string;
    flipped: boolean;
    solved: boolean;
    height: number;
    width: number;
    onClick: (id: number) => void;
    disabled: boolean;
}
type IProps = ICardProps & IRedux;

const CardContainer: FC<IProps> = (props: IProps) => {

    const {id, type, flipped, solved, height, width, onClick, disabled, storageSettings} = props;

    const classes = useStyles();

    let frontImage = getImage(type);

    const handleClick = useCallback(() => {
        const audio = document.querySelector("#zvuk") as HTMLAudioElement;
        if (!disabled) {
            onClick(id);
            if(storageSettings.enableSounds){
                audio.play();
            }
        }
    }, [id, disabled, onClick, storageSettings.enableSounds]);

    return (
        <div
            className={classNames(classes.cardContainer, flipped ? classes.flipped : "")}
            style={{width, height}}
            onClick={handleClick}>
            <div className='flipper'>
                <img
                    alt='card'
                    height={height}
                    className={flipped ? classes.cardFront : classes.cardBack}
                    width={width}
                    src={flipped || solved ? frontImage : cardImage}
                />
            </div>
        </div>
    );
};
const useStyles = makeStyles({
    cardContainer:{
        cursor: 'pointer',
        marginRight: '1rem',
        marginBottom: '1rem',
        perspective: '1000px',
        display: 'inline-block',
        borderRadius: '5px',
        "& .flipper": {
            transition: '0.3s',
            transformStyle: 'preserve-3d',
            position: 'relative',
        }
    },

    cardFront: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'rotateY(180deg)',
    },
    cardBack: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 2,
        transform: 'rotateY(0deg)',
    },
    flipped: {
        "& .flipper": {
            transform: 'rotateY(180deg)',
        }
    },

});

const mapStateToProps = (state: IState) => ({
    storageSettings: state.settings.settings,
});

const Card = connect(mapStateToProps)(CardContainer);

export default Card;
