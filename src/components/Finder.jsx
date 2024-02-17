import { Button, Flex, Form, Input, Table, Typography } from 'antd';
import { useState } from 'react';
import { getSchedule } from '../utils/utils';

const { Text } = Typography;

const { Item } = Form;

export default function Finder({ data }) {
  const [disciplineCode, setDisciplineCode] = useState('');
  const [finalData, setFinalData] = useState([]);

  function searchRoom() {
    if (disciplineCode.length) {
      const filteredData = data.flatMap((element) => element);
      const finalData = getSchedule(filteredData, disciplineCode);
      setFinalData(finalData);
    }
  }

  return (
    <Form>
      <Flex
        style={{ width: '100vw' }}
        vertical
        align="center"
        gap={5}
      >
        <Text style={{ fontSize: 16 }}>Digite o código da disciplina</Text>
        <Input
          size="large"
          placeholder="INF027, MAT222, LET102..."
          style={{ width: 210 }}
          value={disciplineCode}
          onChange={({ target }) => setDisciplineCode(target.value.toUpperCase())}
        />
        <Button
          disabled={!disciplineCode.length}
          type="primary"
          style={{ marginTop: 5 }}
          onClick={searchRoom}
          htmlType="submit"
        >
          Buscar
        </Button>
        <Table
          style={{ width: '80%', marginTop: 20 }}
          scroll={{ y: 350, x: 800 }}
          dataSource={finalData}
          bordered
          columns={[
            {
              title: 'Horários',
              dataIndex: 'time',
              key: 'time',
              align: 'center',
            },
            {
              title: 'Segunda-feira',
              dataIndex: 'Segunda-feira',
              key: 'Segunda-feira',
              align: 'center',
            },
            {
              title: 'Terça-feira',
              dataIndex: 'Terça-feira',
              key: 'Terça-feira',
              align: 'center',
            },
            {
              title: 'Quarta-feira',
              dataIndex: 'Quarta-feira',
              key: 'Quarta-feira',
              align: 'center',
            },
            {
              title: 'Quinta-feira',
              dataIndex: 'Quinta-feira',
              key: 'Quinta-feira',
              align: 'center',
            },
            {
              title: 'Sexta-feira',
              dataIndex: 'Sexta-feira',
              key: 'Sexta-feira',
              align: 'center',
            },
            {
              title: 'Sábado',
              dataIndex: 'Sábado',
              key: 'Sábado',
              align: 'center',
            },
            {
              title: 'Domingo',
              dataIndex: 'Domingo',
              key: 'Domingo',
              align: 'center',
            },
          ]}
          pagination={false}
        />
      </Flex>
    </Form>
  );
}
