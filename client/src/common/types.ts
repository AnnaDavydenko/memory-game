import {ISettingsState} from "../reducers/settings";
import {IScoresState} from "../reducers/scores";

export interface ISettings {
    fullScreen: boolean;
    enableSounds: boolean;
    enableMusic: boolean;
    volumeSounds: number;
    cardsTheme: string;
    volumeMusic: number | number[];
}

export interface IState {
    settings: ISettingsState;
    scores: IScoresState;
}

export interface IScore {
    id: number;
    title: string;
    value: number;
}

export interface IAction {
    type: string;
    payload?: any;
}







export interface IImages {
    small: string;
    medium: string;
    large: string;
}

export interface IPrice {
    currency: string;
    display: string;
    value: number;
}

export interface IOfferData {
    id: string;
    headlines: {
        description: string;
    };
    prices: {
        totalPrice: {
            amount: IPrice;
        }
    };
    images: IImages;
}


