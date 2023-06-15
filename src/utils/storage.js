export function saveDataOnLocalStorage(data) {
  const parsedData = JSON.stringify(data);
  localStorage.setItem('data', parsedData);
}

export function readDataOfLocalStorage() {
  const data = localStorage.getItem('data');
  return JSON.parse(data);
}
