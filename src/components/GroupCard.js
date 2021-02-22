import React from "react";
import { robot8 } from "../assets/images/robots";
import { pokemon6 } from "../assets/images/pokemon";
import { dog9 } from "../assets/images/dogs";
import { makeStyles } from '@material-ui/core/styles';


const GroupCard = ({ type, imageWidth, onClick }) => {
    const classes = useStyles();

    let image = "";

    if (type === "Pokemon") {
        image = pokemon6;
    } else if (type === "Dogs") {
        image = dog9;
    } else {
        image = robot8;
    }

    return (
        <div
            onClick={onClick}
            className={classes.themeBox}>
            <div>
                <img src={image} alt={type} width={imageWidth} />
            </div>
            <div>{type}</div>
        </div>
    );
};

GroupCard.defaultProps = {
    imageWidth: "100%",
};
const useStyles = makeStyles({
    themeBox: {
        width: '30%',
        minHeight: '15rem',
        borderRadius: '2px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'center',
        '&img': {
            borderTopLeftRadius: '2px',
            borderTopRightRadius: '2px',
        },
        '&:hover': {
            transform: 'scale(1.15)',
        },
        '&:active': {
            transform: 'scale(1.15)',
        },
    },

});
export default GroupCard;
