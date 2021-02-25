import React, {useState, useEffect, useContext, useMemo} from "react";
import { Board, FinalModal } from "../components";
import {CARD_THEMES} from "./ChooseCardsThemes";
import {Storage} from "../services/storage";
import {ISettings} from "../common/types";
import {shuffle} from "../utils/gameUtils";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const GamePage = () => {
    const classes = useStyles();
    const [flipped, setFlipped] = useState<number[]>([]);
    const [cards, setCards] = useState<any[]>([]);
    const [solved, setSolved] = useState<any[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [flips, setFlips] = useState(0);
    const [seconds, setSeconds] = useState(100);
    const [isRunning, setIsRunning] = useState(true);
    const [intervalId, setIntervalId] = useState<any>(null);
    const [modalShow, setModalShow] = useState(false);
    const [victory, setVictory] = useState(false);

    const settings = useMemo<ISettings>(() => {
        return new Storage().getSettings();
    }, []);

    useEffect(() => {
        setCards(initDeck(settings));
    }, [settings]);

    useEffect(() => {
        if (solved.length === 16) {
            setIsRunning(false);
            setVictory(true);
            setModalShow(true);
        }
    }, [solved]);

    useEffect(() => {
        if (seconds === 0) {
            setIsRunning(false);
            if (solved.length !== 16) {
                setVictory(false);
            }
            setModalShow(true);
        }
    }, [seconds, solved.length]);

    useEffect(() => {
        if (isRunning) {
            const id = window.setInterval(
                () => setSeconds((seconds) => seconds - 1),
                1000
            );
            setIntervalId(id);
        } else {
            // Clear set Interval
            window.clearInterval(intervalId);
        }
    }, [isRunning, intervalId]);

    const onClick = (id: number) => {
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
    };

    const sameCardClicked = (id: number) => {
        return flipped.includes(id);
    };

    const isMatch = (id: number) => {
        const clickedCard = cards.find((card) => card.id === id);
        const flippedCard = cards.find((card) => flipped[0] === card.id);
        return flippedCard.type === clickedCard.type;
    };

    const playAgain = () => {
        setFlipped([]);
        setCards(initDeck(settings));
        setSolved([]);
        setDisabled(false);
        setFlips(0);
        setSeconds(100);
        setIsRunning(true);
        setModalShow(false);
    };

    return (
        <>
            <main className={classes.gameContainer}>
                <div className={classes.stats}>
                    <span className={classes.timeAndFlips}>Time: {seconds} sec</span>
                    <span className={classes.timeAndFlips}>Flips: {flips}</span>
                </div>
                <div className={classes.cardsContainer}>
                    <Board
                        cards={cards}
                        flipped={flipped}
                        onClick={onClick}
                        disabled={disabled}
                        solved={solved}
                    />
                </div>
                {/*<div>*/}
                {/*    <FinalModal visible={modalShow} onClose={() => setModalShow(false)} time={seconds} flips={flips} onPlayAgain={playAgain} victory={victory} />*/}
                {/*</div>*/}
            </main>
        </>
    );
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    gameContainer:{
        display: 'flex',
        flexDirection: 'column',

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
    "& svg": {
            verticalAlign: 'middle',
            marginBottom: '10px',
        }
    },
    timeAndFlips:{
        color: '#01c5f1',
        fontFamily: 'Hachi Maru Pop',
        [theme.breakpoints.up("lg")]: {
            fontSize: '3rem',
        },
        [theme.breakpoints.up("md")]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '1.5rem',
        }
    },
    cardsContainer:{
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'center',
    },

    }),
);
const initDeck = (settings: ISettings) => {
    let id = 0;
    let cards: any[] = [];

    if (CARD_THEMES.WINTER === settings.cardsTheme) {
        cards = ['sin', 'vet', 'yellow', 'sun', 'shar', 'bike']
    } else if (CARD_THEMES.ARCHITECTURE === settings.cardsTheme) {
        cards = ['white','blue','york','orange','sad','stairs']
    } else {
        cards = ['siam','whcat','rusg','tree','kun','eyes'];
    }
    cards = cards.reduce((acc: any, type: string) => {
        return [...acc, {id: id++, type}, {id: id++, type}];
    }, []);

    return shuffle(cards);
};

 export default GamePage;
