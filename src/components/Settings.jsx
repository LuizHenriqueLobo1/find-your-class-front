import { Flex, Form, Switch, Typography } from 'antd';

const { Text } = Typography;

export default function Settings() {
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
          <Switch style={{ marginTop: 3 }} />
        </Flex>
      </Flex>
    </Form>
  );
}
