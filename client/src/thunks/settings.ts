import {Storage} from "../services/storage";
import {ISettings} from "../common/types";
import {Dispatch} from "redux";
import {updateSettings} from "../actions";

export const updateSettingsThunk = (settings: ISettings, updatedSettings: ISettings) => (dispatch: Dispatch) => {
    const storage = new Storage();
    const audio = document.querySelector("#music") as HTMLAudioElement;
    const sound = document.querySelector("#buttonSound") as HTMLAudioElement;
    if (settings.enableMusic !== updatedSettings.enableMusic){
        if (updatedSettings.enableMusic) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    if (settings.enableSounds !== updatedSettings.enableSounds) {
        if (updatedSettings.enableSounds) {
            sound.play();
        } else {
            sound.pause();
        }
    }
    if (settings.fullScreen !== updatedSettings.fullScreen) {
        if (updatedSettings.fullScreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    storage.updateSettings(updatedSettings);
    dispatch(updateSettings(updatedSettings));
};
