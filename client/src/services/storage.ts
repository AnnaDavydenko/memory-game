import {CARD_THEMES} from "../containers/ChooseCardsThemes";
import {ISettings} from "../common/types";

export class Storage {
  storage: string;

  constructor() {
    this.storage = 'settings';
    if (!window.localStorage.getItem(this.storage)) {
      const data = this.getDefaultData();
      window.localStorage.setItem(this.storage, JSON.stringify(data));
    }
  }

  getDefaultData(): ISettings {
    const settings = {
      fullScreen: false,
      enableSounds: false,
      enableMusic: false,
      volumeSounds: 0.3,
      volumeMusic: 0.3,
      cardsTheme: CARD_THEMES.WINTER,
    };
    return settings;
  }

  getSettings(): ISettings {
    return JSON.parse(window.localStorage.getItem(this.storage) as string);
  }

  updateSettings(updatedSettings: ISettings) {
    this.commit(updatedSettings);
  }

  commit(data: ISettings) {
    window.localStorage.setItem(this.storage, JSON.stringify(data));
  }
}
