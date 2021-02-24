import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { GroupCard } from "../components";
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";
import {ISettings} from "../common/types";
import {Storage} from "../services/storage";

export const CARD_THEMES = {
    ROBOTS: "Robots",
    POKEMON: "Pokemon",
    DOGS: "Dogs",
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
                        type={CARD_THEMES.ROBOTS}
                        onClick={handleChangeTheme(CARD_THEMES.ROBOTS)}
                        classes={{image: classes.imageRoot}}
                    />
                    <GroupCard
                        type={CARD_THEMES.POKEMON}
                        onClick={handleChangeTheme(CARD_THEMES.POKEMON)}
                        classes={{image: classes.imageRoot}}
                    />
                    <GroupCard
                        type={CARD_THEMES.DOGS}
                        onClick={handleChangeTheme(CARD_THEMES.DOGS)}
                    />
                </div>
                <div className='buttonsContainer'>
                    <LinkButton to={"/"} text={"Back"} />
                    <LinkButton to={"/game"} text={"Start"} />
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
    imageRoot: {
      width: "80%",
    },

});
export default ChooseCardsThemes;
