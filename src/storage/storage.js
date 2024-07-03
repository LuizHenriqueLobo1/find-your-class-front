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

  static setTableColumns(tableColumns) {
    storage.setItem('columns', JSON.stringify(tableColumns));
  }

  static getTableColumns() {
    return JSON.parse(storage.getItem('columns')) || [1, 2, 3, 4, 5, 6];
  }
}
