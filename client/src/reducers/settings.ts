import {UPDATE_SETTINGS} from "../actions/actionTypes";
import {IAction, ISettings} from "../common/types";
import {Storage} from "../services/storage";

export interface ISettingsState {
    settings: ISettings;
}

const storage = new Storage();

const initialState: ISettingsState = {
    settings: storage.getSettings(),
};

export const settings = (state: ISettingsState = initialState, action: IAction) => {
    switch (action.type) {

        case UPDATE_SETTINGS:
            return {
                settings: {...action.payload},
            };

        default:
            return state;
    }
};
