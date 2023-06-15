export const minNumberOfSchedules = 6;

export function getSchedule(data, disciplineId) {
  delete data.bloco;
  const dataArray = Object.values(data);
  const schedules = [];
  for (const room of dataArray) {
    for (const [_, classItem] of room.classes.entries()) {
      for (let i = 0; i < classItem.length; i++) {
        if (classItem[i].includes(disciplineId)) {
          schedules.push({
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
  if (schedules.length <= minNumberOfSchedules) {
    return customizeSchedules(schedules);
  } else {
    return schedules;
  }
}

function customizeSchedules(schedules) {
  const customizedSchedules = [];
  const tempData = {};
  for (const data of schedules) {
    const key = data.dayOfWeek;
    if (tempData[key]) {
      tempData[key].time = `${tempData[key].time.split(' - ')[0]} - ${data.time.split(' - ')[1]}`;
    } else {
      tempData[key] = { ...data };
    }
  }
  for (const key in tempData) {
    customizedSchedules.push(tempData[key]);
  }
  return sortSchedulesByDayOfWeek(customizedSchedules);
}

function sortSchedulesByDayOfWeek(schedules) {
  schedules.sort((a, b) => {
    const daysOfWeek = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const dayA = daysOfWeek.indexOf(a.dayOfWeek);
    const dayB = daysOfWeek.indexOf(b.dayOfWeek);
    return dayA - dayB;
  });
  return schedules;
}

function getDayOfWeek(index) {
  const daysOfWeek = ['', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return daysOfWeek[index];
}
