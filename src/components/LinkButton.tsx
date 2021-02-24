import React, {FC} from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core";

interface ILinkProps {
    text: string;
    to: string;
}

const LinkButton: FC<ILinkProps> = (props: ILinkProps) => {
    const {text, to} = props;
    const classes = useStyles();
    return (
        <Link className={classes.button}
            to={to} >
            {text}
        </Link>
    );
};
const useStyles = makeStyles({
    button: {
        marginTop:'1.5rem',
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
});
export default LinkButton;
