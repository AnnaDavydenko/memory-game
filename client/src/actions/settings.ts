import {UPDATE_SETTINGS} from "./actionTypes"
import {ISettings} from "../common/types";

export const updateSettings = (settings: ISettings) => {
	return {
		type: UPDATE_SETTINGS,
		payload: settings
	}
};
