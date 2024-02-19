import { Flex, Form, Switch, Typography } from 'antd';
import { useState } from 'react';
import { Storage } from '../storage/storage';

const { Text } = Typography;

export default function Settings() {
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

  return (
    <Form>
      <Flex
        style={{ width: '100%' }}
        vertical
        align="flex-start"
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
          align="center"
          justify="space-between"
          gap={15}
        >
          <Text>Sempre iniciar na aba de busca:</Text>
          <Switch
            style={{ marginTop: 3 }}
            value={alwaysStartOnSearchTab}
            onChange={changeAlwaysStartOnSearchTab}
          />
        </Flex>
      </Flex>
    </Form>
  );
}
