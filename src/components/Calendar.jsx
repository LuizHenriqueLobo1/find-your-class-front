import { CalendarOutlined, CloseOutlined, InfoCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Select, Tag, Tooltip, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { Storage } from '../storage/storage';
import { COLORS, transformToTable } from '../utils/utils';
import ResultTable from './ResultTable';

const { Text } = Typography;

export default function Calendar({ loading, tableColumns }) {
  const [messageApi, contextHolder] = message.useMessage();

  const [disciplines, setDisciplines] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [generating, setGenerating] = useState(false);

  async function generateCalendar(disciplines) {
    setGenerating(true);
    messageApi.destroy();
    const { data } = Storage.getData();
    const filteredData = [];
    for (const discipline of disciplines) {
      for (const element of data) {
        if (element[element.day].includes(discipline)) {
          filteredData.push(element);
        }
      }
    }
    if (filteredData.length) {
      setFinalData(transformToTable(filteredData));
    }
    setGenerating(false);
  }

  async function saveCalendar() {
    messageApi.destroy();
    if (!disciplines.length || !finalData.length) {
      messageApi.error('Tivemos um problema ao tentar salvar seu calendário!');
    } else {
      Storage.setCalendar(disciplines);
      messageApi.success('Calendário salvo com sucesso!');
    }
  }

  useEffect(() => {
    const calendar = Storage.getCalendar();
    if (calendar.length) {
      setDisciplines(calendar);
      generateCalendar(calendar);
    }
  }, [loading]);

  return (
    <Form>
      {contextHolder}
      <Flex
        style={{ width: '100vw' }}
        vertical
        align="center"
        gap={5}
      >
        <Flex align="center">
          <Text style={{ fontSize: 16 }}>Adicione suas disciplinas&nbsp;</Text>
          <Tooltip title="Digite o código da disciplina e aperte 'Enter' para adicionar.">
            <InfoCircleOutlined />
          </Tooltip>
        </Flex>
        <Select
          dropdownStyle={{ display: 'none' }}
          mode="tags"
          size="large"
          placeholder="Adicione suas disciplinas para criar o calendário..."
          style={{ width: 370 }}
          suffixIcon={false}
          value={disciplines}
          onChange={(value) => {
            const currentValue = value[value.length - 1];
            const existsOnDisciplines = disciplines.indexOf(currentValue.toUpperCase());
            messageApi.destroy();
            if (existsOnDisciplines !== -1) {
              messageApi.warning('Disciplina já informada!');
            } else if (value.length > 10) {
              messageApi.warning('Limite de disciplinas atingido!');
            } else {
              setDisciplines(value.map((value) => value.toUpperCase()));
            }
          }}
          tagRender={(value) => {
            const index = disciplines.indexOf(value.label);
            return (
              <Tag
                style={{ display: 'flex' }}
                closeIcon={<CloseOutlined />}
                closable
                color={COLORS[index]}
                onClose={() => {
                  const valueIndex = disciplines.indexOf(value.label);
                  const newDisciplines = [...disciplines];
                  newDisciplines.splice(valueIndex, 1);
                  setDisciplines(newDisciplines);
                }}
              >
                {value.label}
              </Tag>
            );
          }}
        />
        <Flex gap={10}>
          <Button
            disabled={!disciplines.length}
            type="primary"
            style={{ marginTop: 5 }}
            loading={generating}
            onClick={() => generateCalendar(disciplines)}
            icon={<CalendarOutlined />}
          >
            Gerar
          </Button>
          <Button
            disabled={!finalData.length}
            type="primary"
            style={{ marginTop: 5 }}
            onClick={saveCalendar}
            icon={<SaveOutlined />}
          >
            Salvar
          </Button>
        </Flex>
        <ResultTable
          dataSource={finalData}
          loading={generating}
          type={2}
          disciplines={disciplines}
          tableColumns={tableColumns}
        />
      </Flex>
    </Form>
  );
}
