import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GroupCard } from "../components";
import useTheme from "../utils/useTheme";
import {Link} from "react-router-dom";

const ChooseCardsThemes = () => {
    const [active, setActive] = useTheme("Robots", "Active");
    const classes = useStyles();
    useEffect(() => {
        if (active === "Robots") {
            localStorage.setItem('Active', 'Robots');
        } else if (active === "Pokemon") {
            localStorage.setItem('Active', 'Pokemon');
        } else {
            localStorage.setItem('Active', 'Dogs');
        }
    }, [active]);

    return (
        <main>

            <div className={classes.modalContainer} >
                <div className={classes.modal}>
                    <h2 className={classes.modalTitle}>Choose cards</h2>

                    <div className={classes.cardsContainer} >
                        <GroupCard
                            type='Robots'
                            imageWidth='80%'
                            onClick={() => setActive("Robots")}
                        />
                        <GroupCard
                            type='Pokemon'
                            imageWidth='80%'
                            onClick={() => setActive("Pokemon")}
                        />
                        <GroupCard
                            type='Dogs'
                            onClick={() => setActive("Dogs")}
                        />
                    </div>
                    <div className='buttonsContainer'>
                        <Link to={"/"} className={classes.button}>{"Back"}</Link>
                        <Link to={"/game"} className={classes.button}>{"Start"}</Link>
                    </div>
                </div>
            </div>



        </main>
    );
};

const useStyles = makeStyles({
    modalContainer: {
        marginTop: '4rem',
        paddingBottom: '2rem',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
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
        },
    cardsContainer: {
        marginTop: '2rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        marginTop: '3rem',
        marginBottom: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        fontSize: '1.8rem',
        padding: '1rem 7rem',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(120deg, #3a7bd5, #00d2ff)',
        cursor: 'pointer',
        transition: 'all 0.3s',
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
export default ChooseCardsThemes;
