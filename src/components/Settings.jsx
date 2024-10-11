import { ColorPicker, Divider, Flex, Select, Switch, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Storage } from '../storage/storage';

const { Text, Link } = Typography;

export default function Settings({
  useDarkTheme,
  setUseDarkTheme,
  primaryColor,
  setPrimaryColor,
  tableColumns,
  setTableColumns,
}) {
  const [alwaysStartOnSearchTab, setAlwaysStartOnSearchTab] = useState(Storage.getAlwaysStartOnSearchTab());

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
            value={useDarkTheme}
            onChange={(value) => {
              Storage.setUseDarkTheme(value);
              setUseDarkTheme(value);
            }}
          />
        </Flex>
        <Flex
          style={{ width: '100%', marginTop: 3 }}
          align="center"
          justify="space-between"
        >
          <Text>Sempre iniciar na aba de busca:</Text>
          <Switch
            value={alwaysStartOnSearchTab}
            onChange={changeAlwaysStartOnSearchTab}
          />
        </Flex>
        <Flex
          style={{ width: '100%', marginTop: 3 }}
          align="center"
          justify="space-between"
        >
          <Text>Cor primária:</Text>
          <ColorPicker
            showText
            size="small"
            value={primaryColor}
            onChangeComplete={(color) => {
              const hexColor = '#' + color.toHex();
              Storage.setPrimaryColor(hexColor);
              setPrimaryColor(hexColor);
            }}
            disabledAlpha
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
            Esta aplicação utiliza os dados da planilha de alocação das aulas do semestre 2024.2 disponibilizada pelo
            IFBA.
          </Text>
          <Link
            type="primary"
            style={{ color: primaryColor, textDecoration: 'underline' }}
            href="https://docs.google.com/spreadsheets/d/1gkE905DLcylUjtVySqsYR-z9MpIXBT1x"
            target="_blank"
          >
            Ir para planilha
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
