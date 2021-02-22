import {IOffersState} from "../reducers/memory";

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



export interface IState {
    offers: IOffersState;
}
