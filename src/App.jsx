import { Button, Card, ConfigProvider, Flex, Layout, Spin, Tabs, Typography, theme } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import { useEffect, useState } from 'react';
import api from './api/api';
import CalendarCreator from './components/CalendarCreator';
import Finder from './components/Finder';
import Settings from './components/Settings';

const { Header, Content, Footer } = Layout;
const { Title, Link, Text } = Typography;

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorOnLoading, setErrorOnLoading] = useState(false);

  function makeRequestToGetData() {
    setLoading(true);
    setErrorOnLoading(false);
    setData([]);
    api
      .get('/get-sheet-data', {
        headers: {
          token: import.meta.env.VITE_TOKEN,
        },
      })
      .then((response) => {
        setData(response.data.data);
        setErrorOnLoading(false);
        setLoading(false);
      })
      .catch((_) => {
        setErrorOnLoading(true);
        setLoading(false);
      });
  }

  useEffect(() => {
    makeRequestToGetData();
  }, []);

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{ algorithm: defaultAlgorithm, token: { colorPrimary: '#5A54F9' } }}
    >
      <Spin spinning={loading}>
        <Layout style={{ height: '100vh', width: '100vw' }}>
          <Header
            style={{
              background: '#5A54F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Title
              level={3}
              style={{ margin: 0, padding: 0, color: '#fff' }}
            >
              Find Your Class
            </Title>
          </Header>
          <Content>
            {errorOnLoading ? (
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
                      onClick={makeRequestToGetData}
                    >
                      Recarregar
                    </Button>
                  </Flex>
                </Card>
              </Flex>
            ) : (
              <Tabs
                style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                items={[
                  { key: 'finder', label: 'Buscador', children: <Finder data={data} /> },
                  { key: 'calendarCreator', label: 'Criar calendário', children: <CalendarCreator />, disabled: true },
                  { key: 'settings', label: 'Configurações', children: <Settings />, disabled: true },
                ]}
              />
            )}
          </Content>
          <Footer
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: 'auto',
              padding: '10px 0',
            }}
          >
            <Text style={{ fontSize: 16 }}>
              Created by&nbsp;
              <Link
                type="primary"
                style={{ color: '#5A54F9', fontSize: 16, textDecoration: 'underline' }}
                href="https://github.com/luizhenriquelobo1"
                target="_blank"
              >
                Luiz Henrique Lobo
              </Link>
            </Text>
          </Footer>
        </Layout>
      </Spin>
    </ConfigProvider>
  );
}

export default App;
