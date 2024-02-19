import { CalendarOutlined, InfoCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Select, Tooltip, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { Storage } from '../storage/storage';
import { transformToTable } from '../utils/utils';
import ResultTable from './ResultTable';

const { Text } = Typography;

export default function Calendar() {
  const [messageApi, contextHolder] = message.useMessage();

  const [disciplines, setDisciplines] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [generating, setGenerating] = useState(false);

  async function generateCalendar(customDisciplines) {
    setGenerating(true);
    message.destroy();
    const response = await api
      .post(
        '/get-sheet-data-to-calendar',
        { disciplines: customDisciplines || disciplines },
        {
          headers: {
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )
      .then((response) => (response.status === 200 && response.data ? transformToTable(response.data) : []))
      .catch((_) => []);
    if (response.length) {
      setFinalData(response);
      setGenerating(false);
    }
  }

  async function saveCalendar() {
    message.destroy();
    if (!disciplines.length || !finalData.length) {
      message.error('Tivemos um problema ao tentar salvar seu calendário!');
    } else {
      Storage.setCalendar(disciplines);
      message.success('Calendário salvo com sucesso!');
    }
  }

  useEffect(() => {
    const calendar = Storage.getCalendar();
    if (calendar.length) {
      setDisciplines(calendar);
      generateCalendar(calendar);
    }
  }, []);

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
          style={{ minWidth: 370 }}
          suffixIcon={false}
          value={disciplines}
          onChange={(value) => {
            if (value.length <= 10) {
              setDisciplines(value.map((value) => value.toUpperCase()));
            } else {
              messageApi.destroy();
              messageApi.warning('Limite de disciplinas atingido!');
            }
          }}
        />
        <Flex gap={10}>
          <Button
            disabled={!disciplines.length}
            type="primary"
            style={{ marginTop: 5 }}
            loading={generating}
            onClick={() => generateCalendar(null)}
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
        />
      </Flex>
    </Form>
  );
}
