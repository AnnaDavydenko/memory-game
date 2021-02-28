import React, {FC, useCallback} from "react";
import cardImage from "../assets/images/card.png";
import getImage from "../utils/getImage";
import {makeStyles} from "@material-ui/core";
import classNames from "classnames";

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
const Card: FC<ICardProps> = (props: ICardProps) => {

    const {id, type, flipped, solved, height, width, onClick, disabled} = props;

    const classes = useStyles();

    let frontImage = getImage(type);

    const handleClick = useCallback(() => {
        if (!disabled) {
            onClick(id)
        }
    }, [id, disabled, onClick]);

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

export default Card;
