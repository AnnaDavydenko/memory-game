import React, {FC, useMemo} from "react";
import { Card } from "../components";
import {Theme, makeStyles, createStyles, createMuiTheme, Grid} from "@material-ui/core";

interface IBoardProps {
    cards: Array<{id:number, type:string}>;
    flipped: Array<number>;
    solved: Array<number>;
    onClick: (id: number) => void;
    disabled: boolean;

}
const Board:FC<IBoardProps> = (props: IBoardProps) => {
    const { cards, flipped, onClick, disabled, solved } = props;
    const classes = useStyles();

    const series = useMemo(() => {
        const half = splitIntoHalf(cards);
        const quatar_1 = splitIntoHalf(half.first);
        const quatar_2 = splitIntoHalf(half.second);
        return [
            quatar_1.first,
            quatar_1.second,
            quatar_2.first,
            quatar_2.second,
        ]
    }, [cards]);


    return (
        <Grid container>
            {series.map((seriesItem, index) => (
                <Grid container item key={`series-${index}`} xs={12} md={6} justify={"space-around"} className={classes.gridItem}>
                    {seriesItem.map((card) => (
                        <Grid item key={card.id} xs={4} md={2} >
                            <Card
                                id={card.id}
                                type={card.type}
                                width={100}
                                height={150}
                                flipped={flipped.includes(card.id)}
                                solved={solved.includes(card.id)}
                                onClick={onClick}
                                disabled={disabled || solved.includes(card.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

const splitIntoHalf = (array: any[]) => {
    const half = Math.ceil(array.length / 2);
    return {
        first: array.splice(0, half),
        second: array.splice(-half),
    };
};

const useStyles = makeStyles({
    board:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem:{
        textAlign: 'center',
    },

});

export default Board;
