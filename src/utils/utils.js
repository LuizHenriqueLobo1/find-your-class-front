export function getSchedule(data, disciplineId) {
  delete data.bloco;
  const dataArray = Object.values(data);
  const schedule = [];
  for (const room of dataArray) {
    for (const [_, classItem] of room.classes.entries()) {
      for (let i = 0; i < classItem.length; i++) {
        if (classItem[i].includes(disciplineId)) {
          schedule.push({
            discipline: classItem[i],
            dayOfWeek: getDayOfWeek(i),
            time: classItem[0],
            roomName: room.roomName,
            block: room.block,
          });
        }
      }
    }
  }
  return schedule;
}

function getDayOfWeek(index) {
  const daysOfWeek = ['', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return daysOfWeek[index];
}

export function saveDataOnLocalStorage(data) {
  const parsedData = JSON.stringify(data);
  localStorage.setItem('data', parsedData);
}

export function readDataOfLocalStorage() {
  const data = localStorage.getItem('data');
  return JSON.parse(data);
}
