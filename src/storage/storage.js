const storage = window.localStorage;

export class Storage {
  static setUseDarkTheme(theme) {
    storage.setItem('useDarkTheme', theme);
  }

  static getUseDarkTheme() {
    return storage.getItem('useDarkTheme') === 'true';
  }
}
