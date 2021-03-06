import React, {FC, useMemo} from "react";
import classNames from "classnames";
import { winter9 } from "../assets/images/winter";
import { architecture9 } from "../assets/images/architecture";
import { cat9 } from "../assets/images/cats";
import { makeStyles } from '@material-ui/core/styles';
import {CARD_THEMES} from "../containers/ChooseCardsThemes";

interface IGroupCardProps {
    type: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    classes?: {[key: string]: string};
}

const GroupCard:FC<IGroupCardProps> = (props: IGroupCardProps) => {
    const { type, onClick, classes } = props;
    const innerClasses = useStyles();

    const image = useMemo( () => {
        let image = "";
        if (type === CARD_THEMES.ARCHITECTURE) {
            image = architecture9;
        } else if (type === CARD_THEMES.CATS) {
            image = cat9;
        } else {
            image = winter9;
        }
        return image;
    },[type]);

    return (
        <div onClick={onClick} className={innerClasses.themeBox}>
            <div>
                <img src={image} alt={type} className={classNames(innerClasses.image, classes?.image)} />
            </div>
            <div className={innerClasses.typeText}>{type}</div>
        </div>
    );
};
const useStyles = makeStyles({
    themeBox: {
        width: '80%',
        borderRadius: '2px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'center',
        marginBottom: '1.5rem',
        marginTop: '0.5rem',
        '&:active': {
            transform: 'scale(1.15)',
        },
        '&:hover': {
            transform: 'scale(1.15)',
        },
    },
    image: {
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
        width: '100%',
    },
    typeText: {
        color: '#01c5f1',
        fontFamily: 'Hachi Maru Pop',
        marginTop: '0.5rem',
    }
});
export default GroupCard;
