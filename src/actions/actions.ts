import { FLIP_CARD, RESTART_GAME, MATCH_CARDS } from './actionTypes/actionTypes';

// export const flipCard = index => ({
// 	type: FLIP_CARD,
// 	index,
// });

export const matchCards = () => ({
	type: MATCH_CARDS,
});

export const restartGame = () => ({
	type: RESTART_GAME,
});
