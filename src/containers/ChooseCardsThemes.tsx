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

const ChooseCardsThemes:FC = () => {

    const classes = useStyles();

    const storage = useMemo(() => {
        return new Storage();
    }, []);

    const [settings, setSettings] = useState<ISettings>(storage.getSettings());

    const handleChangeTheme = useCallback((theme: string) => () => {
        settings.cardsTheme = theme;
        setSettings({...settings});
        storage.updateSettings(settings);
    }, [settings, storage]);

    return (
        <main>
            <Modal title='Choose cards'>
                <div className={classes.cardsContainer} >
                    <GroupCard
                        type={CARD_THEMES.ARCHITECTURE}
                        onClick={handleChangeTheme(CARD_THEMES.ARCHITECTURE)}
                        classes={{image: classes.imageRoot}}
                    />
                    <GroupCard
                        type={CARD_THEMES.CATS}
                        onClick={handleChangeTheme(CARD_THEMES.CATS)}
                        classes={{image: classes.imageRoot}}
                    />
                    <GroupCard
                        type={CARD_THEMES.WINTER}
                        onClick={handleChangeTheme(CARD_THEMES.WINTER)}
                        classes={{image: classes.imageRoot}}
                    />
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

});
export default ChooseCardsThemes;
