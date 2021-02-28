import {ISettingsState} from "../reducers/settings";
import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;

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


