import React, {FC, useCallback, useMemo, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GroupCard } from "../components";
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";
import {ISettings} from "../common/types";
import {Storage} from "../services/storage";
import {Grid} from "@material-ui/core";

export const CARD_THEMES = {
    WINTER: "Winter",
    ARCHITECTURE: "Architecture",
    CATS: "Cats",
};
interface ICardItem {
    id: string,
    type: string,
}

const ChooseCardsThemes:FC = () => {
    const classes = useStyles();
    const storage = useMemo(() => {
        return new Storage();
    }, []);

    const [settings, setSettings] = useState<ISettings>(storage.getSettings());
    const [activeCardId, setActiveCardId] = useState<string>("");

    const CARDS = useMemo( () => {
        return [{
            id: "123",
            type: CARD_THEMES.ARCHITECTURE,
        }, {
            id: "456",
            type: CARD_THEMES.CATS,
        }, {
            id: "789",
            type: CARD_THEMES.WINTER,
        },]
    },[]);

    const handleChangeTheme = useCallback((cardItem: ICardItem) => () => {
        settings.cardsTheme = cardItem.type;
        setActiveCardId(cardItem.id);
        setSettings({...settings});
        storage.updateSettings(settings);
    }, [settings, storage]);

    return (
        <main>
            <Modal title='Choose cards'>
                <div className={classes.cardsContainer} >
                 {CARDS.map((cardItem, index) => (
                     <div key={`id-${index}`} className={(cardItem.id === activeCardId) ? classes.activeCard : undefined}>
                     <GroupCard
                         type={cardItem.type}
                         onClick={handleChangeTheme(cardItem)}
                         classes={{image: classes.imageRoot}}
                     />
                     </div>
                 ))}
                </div>
                <Grid container className='buttonsContainer'>
                    <LinkButton to={"/game"} text={"Start"} />
                    <LinkButton to={"/"} text={"Back"} />
                </Grid>
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
        marginBottom: '1.5rem',
    },
    buttonsContainer: {
        marginBottom: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    imageRoot: {
      width: "80%",
    },
    activeCard: {
        transform: 'scale(1.15)',
    },
    notActive: {
        transform: 'none',
    },

});
export default ChooseCardsThemes;
