import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GroupCard } from "../components";
import useTheme from "../utils/useTheme";
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";

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
            <Modal title='Choose cards'>
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
                        <LinkButton
                            to={"/"} text={"Back"}>
                        </LinkButton>
                        <LinkButton
                            to={"/game"} text={"Start"}>
                        </LinkButton>
                    </div>
            </Modal>
        </main>
    );
};

const useStyles = makeStyles({
    cardsContainer: {
        marginTop: '2rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        marginBottom: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },

});
export default ChooseCardsThemes;
