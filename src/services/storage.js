export class Storage {
  constructor() {
    this.storage = 'settings';
    if (!window.localStorage.getItem(this.storage)) {
      const data = Storage.getDefaultData();
      window.localStorage.setItem(this.storage, JSON.stringify(data));
    }
  }

  static getDefaultData() {
    const settings = {
      fullScreen: false,
      enableSounds: false,
      enableMusic: false,
      volumeSounds: 0.3,
      volumeMusic: 0.3,
    };
    return settings;
  }

  getSettings() {
    return JSON.parse(window.localStorage.getItem(this.storage));
  }

  updateSettings(updatedSettings) {
    this.commit(updatedSettings);
  }

  commit(data) {
    window.localStorage.setItem(this.storage, JSON.stringify(data));
  }
}
