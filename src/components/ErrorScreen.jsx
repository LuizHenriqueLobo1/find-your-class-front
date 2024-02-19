import { Button, Card, Flex, Typography } from 'antd';

const { Title } = Typography;

export default function ErrorScreen({ getData }) {
  return (
    <Flex
      style={{ width: '100%', height: '100%' }}
      align="center"
      justify="center"
    >
      <Card
        title={
          <Title
            style={{ margin: 0 }}
            level={4}
          >
            Atenção!
          </Title>
        }
        style={{ width: 400, textAlign: 'center' }}
      >
        Tivemos um problema ao tentar carregar os dados, clique no botão abaixo para tentar novamente!
        <Flex
          style={{ width: '100%', marginTop: 20 }}
          justify="center"
        >
          <Button
            type="primary"
            onClick={getData}
          >
            Recarregar
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
