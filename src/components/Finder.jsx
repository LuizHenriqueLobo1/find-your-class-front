import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { Storage } from '../storage/storage';
import { searchDiscipline } from '../utils/utils';
import ResultTable from './ResultTable';

const { Text } = Typography;

export default function Finder({ primaryColor, tableColumns }) {
  const [disciplineCode, setDisciplineCode] = useState('');
  const [finalData, setFinalData] = useState([]);

  function searchRoom() {
    const { data } = Storage.getData();
    if (disciplineCode.length) {
      const localFinalData = searchDiscipline(data, disciplineCode);
      setFinalData(localFinalData);
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
          icon={<SearchOutlined />}
          htmlType="submit"
        >
          Buscar
        </Button>
        <ResultTable
          dataSource={finalData}
          type={1}
          tableColumns={tableColumns}
          primaryColor={primaryColor}
        />
      </Flex>
    </Form>
  );
}
