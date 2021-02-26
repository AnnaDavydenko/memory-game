import {Storage} from "../services/storage";
import {ISettings} from "../common/types";
import {Dispatch} from "redux";
import {updateSettings} from "../actions";

export const updateSettingsThunk = (settings: ISettings) => (dispatch: Dispatch) => {
    const storage = new Storage();
    storage.updateSettings(settings);
    dispatch(updateSettings(settings));
};
