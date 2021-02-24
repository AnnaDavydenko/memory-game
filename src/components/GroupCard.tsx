import React, {FC} from "react";
import classNames from "classnames";
import { robot8 } from "../assets/images/robots";
import { pokemon6 } from "../assets/images/pokemon";
import { dog9 } from "../assets/images/dogs";
import { makeStyles } from '@material-ui/core/styles';

interface IGroupCardProps {
    type: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    classes?: {[key: string]: string};
}

const GroupCard:FC<IGroupCardProps> = (props: IGroupCardProps) => {
    const { type, onClick, classes } = props;
    const innerClasses = useStyles();

    let image = "";

    if (type === "Pokemon") {
        image = pokemon6;
    } else if (type === "Dogs") {
        image = dog9;
    } else {
        image = robot8;
    }

    return (
        <div onClick={onClick} className={innerClasses.themeBox}>
            <div>
                <img src={image} alt={type} className={classNames(innerClasses.image, classes?.image)} />
            </div>
            <div>{type}</div>
        </div>
    );
};
const useStyles = makeStyles({
    themeBox: {
        width: '30%',
        borderRadius: '2px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'center',
        '&:hover': {
            transform: 'scale(1.15)',
        },
        '&:active': {
            transform: 'scale(1.15)',
        },
    },
    image: {
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
        width: '100%',
    }
});
export default GroupCard;
