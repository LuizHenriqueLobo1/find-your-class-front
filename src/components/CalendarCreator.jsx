import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Select, Tooltip, Typography, message } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

export default function CalendarCreator() {
  const [messageApi, contextHolder] = message.useMessage();

  const [disciplines, setDisciplines] = useState([]);

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
        <Button
          disabled={!disciplines.length}
          type="primary"
          style={{ marginTop: 5 }}
          htmlType="submit"
          onClick={() => {
            console.log(disciplines);
          }}
        >
          Gerar calendário
        </Button>
      </Flex>
    </Form>
  );
}
