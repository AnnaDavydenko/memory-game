import React, {useState, useEffect, useContext, useMemo} from "react";

import { Board, Rodal } from "../components";
import {CARD_THEMES} from "./ChooseCardsThemes";
import {Storage} from "../services/storage";
import {ISettings} from "../common/types";
import {shuffle} from "../utils/gameUtils";

const GamePage = () => {
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
        // console.log(isRunning);
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
                // ...solved = already solved | fliped[0] = first click | id = current clicked
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
    }

    return (
        <>
            <main className='game__container'>
                <div className='game__stats'>
                    <div className='game__time'>Time: {seconds} sec</div>
                    <div className='game__flips'>Flips: {flips}</div>
                </div>
                <div className='game__cards-container'>
                    <Board
                        cards={cards}
                        flipped={flipped}
                        onClick={onClick}
                        disabled={disabled}
                        solved={solved}
                    />
                </div>
                <div>
                    <Rodal visible={modalShow} onClose={() => setModalShow(false)} time={seconds} flips={flips} onPlayAgain={playAgain} victory={victory} />
                </div>
            </main>
        </>
    );
};

const initDeck = (settings: ISettings) => {
    let id = 0;
    let cards: any[] = [];

    if (CARD_THEMES.ROBOTS === settings.cardsTheme) {
        cards = ["red", "yellow"]
    } else if (CARD_THEMES.POKEMON === settings.cardsTheme) {
        cards = ["bulbasaur", "charizard"]
    } else {
        cards = ["lhasa", "eskimo"];
    }
    cards = cards.reduce((acc: any, type: string) => {
        return [...acc, {id: id++, type}, {id: id++, type}];
    }, []);

    return shuffle(cards);
};

 export default GamePage;
