import React, {FC} from "react";
import {makeStyles} from "@material-ui/core";

interface IModalProps {
    children: React.ReactNode;
    title: string;
}

const Modal: FC<IModalProps> = (props: IModalProps) => {
    const {children, title} = props;
    const classes = useStyles();
    return (
        <div className={classes.modalContainer}>
            <div className={classes.modal}>
                <h2 className={classes.modalTitle}>{title}</h2>
                <div>{children}</div>
            </div>
        </div>
    );
};
const useStyles = makeStyles({
    modalContainer: {
        height: 'calc(100vh - 146px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '500px',
        minHeight: '300px',
        background: '#fff',
        padding: '1.5rem 2rem',
        borderRadius: '5px',
        boxShadow: '0 2rem 5rem 0 rgba(0, 0, 0, 0.2)',
    },
    modalTitle: {
        fontSize: '2.2rem',
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontFamily: 'Hachi Maru Pop',
        color: '#3288dc',
        marginBottom:'1.5rem',
    },
});
export default Modal;
