export function searchDiscipline(data, disciplineId) {
  // Filtra os elementos baseado no código da disciplina
  const filteredData = data.filter((item) => {
    const { day } = item;
    return item[day].includes(disciplineId);
  });

  return transformToTable(filteredData);
}

export function transformToTable(data) {
  // Organiza os dados para a tabela
  const finalData = [];
  for (let i = 0; i < data.length; i++) {
    if (!finalData.find(({ time }) => time === data[i].time)) {
      finalData.push(data[i]);
    } else {
      const index = finalData.findIndex(({ time }) => time === data[i].time);
      finalData[index][data[i].day] = data[i][data[i].day];
    }
  }

  // Ordena do horário mais cedo para o mais tarde
  finalData.sort((a, b) => {
    const [startA] = a.time.split(' - ');
    const [startB] = b.time.split(' - ');
    return new Date(`2024-01-01 ${startA}`) - new Date(`2024-01-01 ${startB}`);
  });

  return finalData;
}
