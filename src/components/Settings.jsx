import { Divider, Flex, Select, Switch, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Storage } from '../storage/storage';

const { Text, Link } = Typography;

export default function Settings({ tableColumns, setTableColumns }) {
  const [darkTheme, setDarkTheme] = useState(Storage.getUseDarkTheme());
  const [alwaysStartOnSearchTab, setAlwaysStartOnSearchTab] = useState(Storage.getAlwaysStartOnSearchTab());

  async function changeTheme(value) {
    Storage.setUseDarkTheme(value);
    setDarkTheme(value);
    await new Promise((resolve) => setTimeout(resolve, 100));
    location.reload();
  }

  function changeAlwaysStartOnSearchTab(value) {
    Storage.setAlwaysStartOnSearchTab(value);
    setAlwaysStartOnSearchTab(value);
  }

  useEffect(() => {
    Storage.setTableColumns(tableColumns);
  }, [tableColumns]);

  return (
    <Flex
      style={{ marginTop: 12 }}
      justify="center"
    >
      <Flex
        style={{ width: '300px' }}
        vertical
        gap={8}
      >
        <Flex
          style={{ width: '100%' }}
          align="center"
          justify="space-between"
        >
          <Text>Tema escuro:</Text>
          <Switch
            style={{ marginTop: 3 }}
            value={darkTheme}
            onChange={changeTheme}
          />
        </Flex>
        <Flex
          style={{ width: '100%' }}
          align="center"
          justify="space-between"
        >
          <Text>Sempre iniciar na aba de busca:</Text>
          <Switch
            style={{ marginTop: 3 }}
            value={alwaysStartOnSearchTab}
            onChange={changeAlwaysStartOnSearchTab}
          />
        </Flex>
        <Divider style={{ margin: '10px 0' }} />
        <Flex
          vertical
          style={{ width: '100%' }}
        >
          <Text style={{ marginBottom: 10 }}>Colunas de dias da tabela:</Text>
          <Select
            value={tableColumns}
            onChange={(values) => setTableColumns(values)}
            showSearch={false}
            mode="multiple"
            options={[
              { value: 1, label: 'Segunda-feira' },
              { value: 2, label: 'Terça-feira' },
              { value: 3, label: 'Quarta-feira' },
              { value: 4, label: 'Quinta-feira' },
              { value: 5, label: 'Sexta-feira' },
              { value: 6, label: 'Sábado' },
            ]}
          />
        </Flex>
        <Divider style={{ margin: '10px 0' }} />
        <Flex
          style={{ width: '100%' }}
          align="center"
          justify="center"
          vertical
          gap={10}
        >
          <Text style={{ textAlign: 'center' }}>
            Esta aplicação utiliza os dados da planilha de alocação das aulas do semestre 2024.1 disponibilizada pelo
            IFBA.
          </Text>
          <Link
            type="primary"
            style={{ color: '#5A54F9', textDecoration: 'underline' }}
            href="https://docs.google.com/spreadsheets/d/1cCxv5gzbj5uAFJtyF6h-pxK4RXYurShUsLqO2ye6Ark"
            target="_blank"
          >
            Ir para planilha
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
