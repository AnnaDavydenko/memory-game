import React, {useState, useEffect, useCallback} from "react";
import {Board, FinalModal} from "../components";
import {CARD_THEMES} from "./ChooseCardsThemes";
import {ICard, ISettings, IState} from "../common/types";
import {shuffle} from "../utils/gameUtils";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";

interface IProps {
    settings: ISettings;
}

const GamePageContainer = (props: IProps) => {
    const classes = useStyles();

    const {settings} = props;

    const [autoPlay, setAutoPlay] = useState<boolean>(false);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [flips, setFlips] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [cards, setCards] = useState<ICard[]>([]);

    useEffect(() => {
        setCards(initDeck(settings));
    },[]);

    useEffect(() => {
        const audio = document.querySelector("#win") as HTMLAudioElement;
        if (solved.length === 12) {
            setModalShow(true);
            setAutoPlay(false);
            if (settings.enableMusic) {
                audio.play();
            }
        }
    }, [settings.enableMusic, solved]);

    const sameCardClicked = useCallback((id: number) => {
        return flipped.includes(id);
    },[flipped]);

    const isMatch = useCallback((id: number) => {
        const clickedCard = cards.find((card) => card.id === id) as ICard;
        const flippedCard = cards.find((card) => flipped[0] === card.id) as ICard;
        return flippedCard.type === clickedCard.type;
    }, [cards, flipped]);

    const handleCardAction = useCallback((id: number) => {
        setDisabled(true);

        // If no cards flipped
        if (flipped.length === 0) {
            if (!sameCardClicked(id)) {
                setFlips((flips) => flips + 1);
            }
            setFlipped([id]);
            setDisabled(false);
            // At least flipped one
        } else {
            if (!sameCardClicked(id)) {
                setFlips((flips) => flips + 1);
            }

            if (sameCardClicked(id)) {
                setDisabled(false);
                return;
            }
            // if two cards flipped
            setFlipped([flipped[0], id]);

            // if we get a match
            if (isMatch(id)) {
                setSolved([...solved, flipped[0], id]);
                // Reset Cards
                setFlipped([]);
                setDisabled(false);

                // if not a match
            } else {
                setTimeout(() => {
                    // Reset Cards
                    setFlipped([]);
                    setDisabled(false);
                }, 2000);
            }
        }
    }, [flipped, solved, isMatch, sameCardClicked]);

    const onClick = useCallback((id: number) => {
        handleCardAction(id);
    }, [handleCardAction]);

    const handleRestart = useCallback(() => {
        const audio = document.querySelector("#buttonSound") as HTMLAudioElement;
        setCards(initDeck(settings));
        setFlipped([]);
        setSolved([]);
        setDisabled(false);
        setFlips(0);
        setModalShow(false);
        if(settings.enableSounds){
            audio.play();
        }
    },[settings]);

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (!modalShow && (e.altKey && (e.key === "r" || e.key === "к"))) {
            handleRestart();
        }
    }, [modalShow, handleRestart]);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyPress);
        return () => {
            document.removeEventListener("keyup", handleKeyPress);
        }
    }, [handleKeyPress]);

    const handleAutoPlay = useCallback(() => {
        setAutoPlay(true);
        setFlipped([]);
        const unresolved = cards.filter((item) => !solved.includes(item.id));
        const cardItem = unresolved[0];
        const itemPair = unresolved.find((item, index) => item.type === cardItem?.type && index !== 0) as ICard;
        if (cardItem && !solved.includes(cardItem?.id) && !solved.includes(itemPair?.id)) {
            setSolved([...solved, cardItem.id, itemPair.id]);
        }
    },[solved, cards]);

    const handleAutoplayClick = useCallback(() => {
        const audio = document.querySelector("#buttonSound") as HTMLAudioElement;
        if (settings.enableSounds) {
            audio.play();
        }
        handleAutoPlay();
    }, [settings, handleAutoPlay]);

    useEffect(() => {
        if (autoPlay && solved.length < 12) {
            setTimeout(()=> {
                handleAutoPlay();
            }, 1000);
        }
    }, [solved, solved.length, autoPlay, handleAutoPlay]);

    return (
        <>
            <main className={classes.gameContainer}>
                <div className={classes.stats}>
                    <button onClick={handleRestart} className={classes.restartAndFlips}>Restart Game</button>
                    <span className={classes.restartAndFlips}>Flips: {flips}</span>
                    <button onClick={handleAutoplayClick} className={classes.restartAndFlips}>Auto Play</button>
                </div>
                <div className={classes.cardsContainer}>
                    <Board
                        cards={[...cards]}
                        flipped={flipped}
                        onClick={onClick}
                        disabled={disabled}
                        solved={solved}
                    />
                </div>
                <div>
                    {modalShow && <FinalModal open={modalShow} flips={flips} />}
                </div>
            </main>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    gameContainer:{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 150px)',
        overflowY: 'auto',
        paddingBottom: '1rem',

        [theme.breakpoints.up("md")]: {
            padding: '0 9rem',
        },
        [theme.breakpoints.up("sm")]: {
            padding: '0 5rem',
        },
        [theme.breakpoints.down("sm")]: {
            padding: '0 3rem',
        },
    },
    stats:{
        fontSize: '3.2rem',
        color: '#fff',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    "& svg": {
            verticalAlign: 'middle',
            marginBottom: '10px',
        }
    },
    restartAndFlips:{
        color: '#3288dc',
        fontFamily: 'Hachi Maru Pop',
        background: 'transparent',
        '&:hover':{
            color: '#01c5f1',
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: '3rem',
        },
        [theme.breakpoints.up("md")]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '1.5rem',
        },

    },
    cardsContainer: {
        height: 'calc(100vh - 146px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    }),
);
const initDeck = (settings: ISettings): ICard[] => {
    let id = 0;
    let cards: any[] = [];

    if (CARD_THEMES.WINTER === settings.cardsTheme) {
        cards = ['sin', 'vet', 'yellow', 'sun', 'shar', 'bike']
    } else if (CARD_THEMES.ARCHITECTURE === settings.cardsTheme) {
        cards = ['white','blue','york','orange','sad','stairs']
    } else {
        cards = ['siam','whcat','rusg','tree','kun','eyes'];
    }
    cards = cards.reduce((acc: ICard[], type: string) => {
        return [...acc, {id: id++, type}, {id: id++, type}];
    }, []);

    return shuffle(cards);
};

const mapStateToProps = (state: IState) => ({
    settings: state.settings.settings
});

const GamePage = connect(mapStateToProps)(GamePageContainer);

 export default GamePage;
