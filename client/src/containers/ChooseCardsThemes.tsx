import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {GroupCard, Loader} from "../components";
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";
import {ISettings, IState} from "../common/types";
import {Grid} from "@material-ui/core";
import imageArray from "../utils/preloadImages";
import {config} from "../config";
import {Dispatch} from "redux";
import {updateSettingsThunk} from "../thunks/settings";
import {connect} from "react-redux";

interface IRedux {
    settings: ISettings;
}

interface IDispatch {
    onUpdateSettings: (settings: ISettings) => void;
}

type IProps = IRedux & IDispatch;
export const CARD_THEMES = {
    WINTER: "Winter",
    ARCHITECTURE: "Architecture",
    CATS: "Cats",
};
interface ICardItem {
    id: string,
    type: string,
}

const ChooseCardsThemesContainer:FC<IProps> = (props: IProps) => {
    const {settings, onUpdateSettings} = props;
    const classes = useStyles();

    const [activeCardId, setActiveCardId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

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
        onUpdateSettings(settings);
    }, [settings, onUpdateSettings]);

    const preloadImage = () => {
        setLoading(true);
        const images = imageArray();
        let length = images.length;
        images.forEach((picture) => {
            const img = new Image();
            img.src = picture;
            img.onload = () => {
                --length;
                if (length <= 0) {
                    setLoading(false);
                }
            };
        });
    };
    useEffect(() => {
        console.log(config);
        preloadImage();
    }, []);

    return (
        <>
            {(loading) ? (<Loader/>) : (
                <main>
                    <Modal title='Choose cards'>
                        <div className={classes.cardsContainer}>
                            {CARDS.map((cardItem, index) => (
                                <div key={`id-${index}`}
                                     className={(cardItem.id === activeCardId) ? classes.activeCard : undefined}>
                                    <GroupCard
                                        type={cardItem.type}
                                        onClick={handleChangeTheme(cardItem)}
                                        classes={{image: classes.imageRoot}}
                                    />
                                </div>
                            ))}
                        </div>
                        <Grid container className='buttonsContainer'>
                            <LinkButton to={"/game"} text={"Start"}/>
                            <LinkButton to={"/"} text={"Back"}/>
                        </Grid>
                    </Modal>
                </main>
            )}
        </>
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

const mapStateToProps = (state: IState) => ({
    settings: state.settings.settings,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onUpdateSettings: (settings: ISettings) => {
        // @ts-ignore
        dispatch(updateSettingsThunk(settings));
    }
});

const ChooseCardsThemes = connect(mapStateToProps, mapDispatchToProps)(ChooseCardsThemesContainer);
export default ChooseCardsThemes;
