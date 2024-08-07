import { ConfigProvider, Layout, Spin, Tabs, Typography, theme } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import { useEffect, useState } from 'react';
import api from './api/api';
import Calendar from './components/Calendar';
import ErrorScreen from './components/ErrorScreen';
import Finder from './components/Finder';
import Settings from './components/Settings';
import { Storage } from './storage/storage';

const { Header, Content, Footer } = Layout;
const { Title, Link, Text } = Typography;

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorOnLoading, setErrorOnLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState();
  const [tableColumns, setTableColumns] = useState(Storage.getTableColumns());

  async function makeRequestToGetData() {
    setLoading(true);
    setErrorOnLoading(false);
    setData([]);
    const response = await api
      .get('/get-sheet-data', {
        headers: {
          token: import.meta.env.VITE_TOKEN,
        },
      })
      .then((response) => (response.data.length ? response.data : null))
      .catch((_) => null);
    if (response.length) {
      setData(response);
      setErrorOnLoading(false);
    } else {
      setErrorOnLoading(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    const calendar = Storage.getCalendar();
    if (calendar.length && !Storage.getAlwaysStartOnSearchTab()) {
      setSelectedTab(2);
    } else {
      setSelectedTab(1);
      makeRequestToGetData();
    }
  }, []);

  useEffect(() => {
    if (!data.length && selectedTab === 1) {
      makeRequestToGetData();
    }
  }, [selectedTab]);

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: Storage.getUseDarkTheme() ? darkAlgorithm : defaultAlgorithm,
        token: { colorPrimary: '#5A54F9' },
      }}
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
              <ErrorScreen getData={makeRequestToGetData} />
            ) : (
              <Tabs
                centered
                items={[
                  {
                    key: 1,
                    label: 'Buscador',
                    children: (
                      <Finder
                        data={data}
                        getDataRequest={makeRequestToGetData}
                        tableColumns={tableColumns}
                      />
                    ),
                  },
                  { key: 2, label: 'Meu calendário', children: <Calendar tableColumns={tableColumns} /> },
                  {
                    key: 3,
                    label: 'Configurações',
                    children: (
                      <Settings
                        tableColumns={tableColumns}
                        setTableColumns={setTableColumns}
                      />
                    ),
                  },
                ]}
                activeKey={selectedTab}
                onChange={(tab) => setSelectedTab(tab)}
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
                href="https://linktr.ee/luizhenriquelobo"
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
