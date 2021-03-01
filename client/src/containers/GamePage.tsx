import React, {useState, useEffect, useContext, useMemo, useCallback} from "react";
import { Board, FinalModal } from "../components";
import {CARD_THEMES} from "./ChooseCardsThemes";
import {Storage} from "../services/storage";
import {ISettings, IState} from "../common/types";
import {shuffle} from "../utils/gameUtils";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

interface IProps {
    settings: ISettings;
}

const GamePageContainer = (props: IProps) => {
    const classes = useStyles();

    const {settings} = props;

    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<any[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [flips, setFlips] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    const cards = useMemo(() => initDeck(settings), [settings]);

    useEffect(() => {
        if (solved.length === 16) {
            setIsRunning(false);
            setModalShow(true);
        }
    }, [solved]);

    const sameCardClicked = useCallback((id: number) => {
        return flipped.includes(id);
    },[flipped]);

    const isMatch = useCallback((id: number) => {
        const clickedCard = cards.find((card) => card.id === id);
        const flippedCard = cards.find((card) => flipped[0] === card.id);
        return flippedCard.type === clickedCard.type;
    }, [cards, flipped]);

    const onClick = useCallback((id: number) => {
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
    }, [ flipped, solved, isMatch, sameCardClicked]);

    return (
        <>
            <main className={classes.gameContainer}>
                <div className={classes.stats}>
                    <Link to={"/game"}><span className={classes.timeAndFlips}>Restart Game</span></Link>
                    <span className={classes.timeAndFlips}>Flips: {flips}</span>
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
                    {modalShow && <FinalModal flips={flips} />}
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

const mapStateToProps = (state: IState) => ({
    settings: state.settings.settings
});

const GamePage = connect(mapStateToProps)(GamePageContainer);

 export default GamePage;
