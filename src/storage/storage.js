const storage = window.localStorage;

export class Storage {
  static setUseDarkTheme(theme) {
    storage.setItem('useDarkTheme', theme);
  }

  static getUseDarkTheme() {
    return storage.getItem('useDarkTheme') === 'true';
  }

  static setAlwaysStartOnSearchTab(alwaysStartOnSearchTab) {
    storage.setItem('alwaysStartOnSearchTab', alwaysStartOnSearchTab);
  }

  static getAlwaysStartOnSearchTab() {
    return storage.getItem('alwaysStartOnSearchTab') === 'true';
  }

  static setCalendar(calendar) {
    storage.setItem('calendar', JSON.stringify(calendar));
  }

  static getCalendar() {
    return JSON.parse(storage.getItem('calendar')) || [];
  }
}
