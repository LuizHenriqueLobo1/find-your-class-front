import { ConfigProvider, Layout, Spin, Tabs, Typography, theme } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import api from './api/api';
import Calendar from './components/Calendar';
import Finder from './components/Finder';
import Settings from './components/Settings';
import { Storage } from './storage/storage';

const { Header, Content, Footer } = Layout;
const { Title, Link, Text } = Typography;

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const [selectedTab, setSelectedTab] = useState();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [haveMoreRecords, setHaveMoreRecords] = useState(true);

  const [useDarkTheme, setUseDarkTheme] = useState(Storage.getUseDarkTheme());
  const [primaryColor, setPrimaryColor] = useState(Storage.getPrimaryColor());
  const [tableColumns, setTableColumns] = useState(Storage.getTableColumns());

  async function makeRequestToGetData() {
    if (haveMoreRecords) {
      setLoading(true);
      const response = await api
        .get(`/get-sheet-data?page=${page}&pageSize=${1000}`, {
          headers: {
            token: import.meta.env.VITE_TOKEN,
          },
        })
        .then((response) => (response.data.length ? response.data : null))
        .catch((_) => null);
      if (response) {
        setData((prevData) => [...prevData, ...response]);
        setPage((prevPage) => prevPage + 1);
      } else {
        if (data.length) Storage.setData(data);
        setLoading(false);
        setHaveMoreRecords(false);
      }
    }
  }

  useEffect(() => {
    const calendar = Storage.getCalendar();
    if (calendar.length && !Storage.getAlwaysStartOnSearchTab()) {
      setSelectedTab(2);
    } else {
      setSelectedTab(1);
    }
  }, []);

  useEffect(() => {
    const savedData = Storage.getData();
    if (
      !savedData ||
      !savedData.data.length ||
      dayjs(savedData.createdAt).startOf('day').isBefore(dayjs().startOf('day'))
    ) {
      makeRequestToGetData();
    } else {
      setData(savedData.data);
    }
  }, [page]);

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: useDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: { colorPrimary: primaryColor },
      }}
    >
      <Spin
        style={{ maxHeight: '100vh' }}
        spinning={loading}
        size="large"
      >
        <Layout style={{ height: '100vh', width: '100vw' }}>
          <Header
            style={{
              background: primaryColor,
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
          <Content style={{ height: '100vh', overflowY: 'auto' }}>
            <Tabs
              centered
              items={[
                {
                  key: 1,
                  label: 'Buscador',
                  children: (
                    <Finder
                      primaryColor={primaryColor}
                      tableColumns={tableColumns}
                    />
                  ),
                },
                {
                  key: 2,
                  label: 'Meu calendário',
                  children: (
                    <Calendar
                      loading={loading}
                      tableColumns={tableColumns}
                    />
                  ),
                },
                {
                  key: 3,
                  label: 'Configurações',
                  children: (
                    <Settings
                      useDarkTheme={useDarkTheme}
                      setUseDarkTheme={setUseDarkTheme}
                      primaryColor={primaryColor}
                      setPrimaryColor={setPrimaryColor}
                      tableColumns={tableColumns}
                      setTableColumns={setTableColumns}
                    />
                  ),
                },
              ]}
              activeKey={selectedTab}
              onChange={(tab) => setSelectedTab(tab)}
            />
          </Content>
          <Footer
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: 'auto',
              padding: '10px 0',
              zIndex: 1,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              Created by&nbsp;
              <Link
                type="primary"
                style={{ color: primaryColor, fontSize: 16, textDecoration: 'underline' }}
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
