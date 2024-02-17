import { Flex, Form, Switch, Typography } from 'antd';
import { useState } from 'react';
import { Storage } from '../storage/storage';

const { Text } = Typography;

export default function Settings() {
  const [darkTheme, setDarkTheme] = useState(Storage.getUseDarkTheme());

  async function changeTheme(value) {
    Storage.setUseDarkTheme(value);
    setDarkTheme(value);
    await new Promise((resolve) => setTimeout(resolve, 100));
    location.reload();
  }

  return (
    <Form>
      <Flex
        style={{ width: '100vw' }}
        vertical
        align="center"
        gap={5}
      >
        <Flex
          align="center"
          justify="center"
          gap={5}
        >
          <Text>Tema escuro:</Text>
          <Switch
            style={{ marginTop: 3 }}
            value={darkTheme}
            onChange={changeTheme}
          />
        </Flex>
      </Flex>
    </Form>
  );
}
