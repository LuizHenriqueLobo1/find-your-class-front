import dayjs from 'dayjs';

const storage = window.localStorage;

export class Storage {
  static setData(data) {
    storage.setItem('data', JSON.stringify({ data, createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss') }));
  }

  static getData() {
    return JSON.parse(storage.getItem('data')) || null;
  }

  static setUseDarkTheme(theme) {
    storage.setItem('useDarkTheme', theme);
  }

  static getUseDarkTheme() {
    return storage.getItem('useDarkTheme') === 'true';
  }

  static setAlwaysStartOnSearchTab(alwaysStartOnSearchTab) {
    storage.setItem('alwaysStartOnSearchTab', alwaysStartOnSearchTab);
  }

  static setPrimaryColor(color) {
    storage.setItem('primaryColor', color);
  }

  static getPrimaryColor() {
    return storage.getItem('primaryColor') || '#5A54F9';
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
