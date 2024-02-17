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
    return convertDataToTableFormat(customizeSchedules(schedules));
  } else {
    return convertDataToTableFormat(schedules);
  }
}

function convertDataToTableFormat(data) {
  const tableData = {};

  // Inicializa a estrutura da tabela
  data.forEach(({ dayOfWeek, time, discipline, block, roomName }) => {
    const [start, end] = time.split(' - ');
    const key = `${start} - ${end}`;

    if (!tableData[key]) {
      tableData[key] = {};
    }

    tableData[key][dayOfWeek] = `${discipline} | ${block} - ${roomName}`;
  });

  // Converte para um array para ser usado no Antd Table
  const tableArray = Object.keys(tableData).map((time) => ({
    key: time,
    time,
    ...tableData[time],
  }));

  // Ordena o array pela hora
  tableArray.sort((a, b) => {
    const [startA] = a.time.split(' - ');
    const [startB] = b.time.split(' - ');
    return new Date(`2022-01-01 ${startA}`) - new Date(`2022-01-01 ${startB}`);
  });

  return tableArray;
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
  return customizedSchedules;
}

function getDayOfWeek(index) {
  const daysOfWeek = ['', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return daysOfWeek[index];
}
