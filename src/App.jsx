import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import api from './api/api';
import './App.css';
import DataLoadError from './components/DataLoadError';
import Footer from './components/Footer';
import { getSchedule, readDataOfLocalStorage, saveDataOnLocalStorage } from './utils/utils.js';

function App() {
  const [disciplineId, setDisciplineId] = useState('');
  const [rawData, setRawData] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorOnLoading, setErrorOnLoading] = useState(false);
  const [haveSearch, setHaveSearch] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const data = readDataOfLocalStorage();
    if (data) {
      setRawData(data);
      setErrorOnLoading(false);
      setLoading(false);
    } else {
      api
        .get('/get-sheet-data', {
          headers: {
            token: import.meta.env.VITE_TOKEN,
          },
        })
        .then((response) => {
          saveDataOnLocalStorage(response.data.data);
          setRawData(response.data.data);
          setErrorOnLoading(false);
          setLoading(false);
        })
        .catch((_) => {
          setErrorOnLoading(true);
          setLoading(false);
        });
    }
  }

  function searchRoom() {
    if (disciplineId.length) {
      setHaveSearch(true);
      const filteredData = rawData.flatMap((element) => element);
      const finalData = getSchedule(filteredData, disciplineId);
      setParsedData(finalData);
    }
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <Spinner variant="primary" />
      ) : errorOnLoading ? (
        <DataLoadError />
      ) : (
        <>
          <Form
            style={{ marginTop: '10px' }}
            onSubmit={(event) => {
              event.preventDefault();
              searchRoom();
            }}
          >
            <Form.Group onSubmit={() => searchRoom()}>
              <Form.Label htmlFor="input">Digite o código da sua disciplina</Form.Label>
              <Form.Control
                onChange={(event) => setDisciplineId(event.target.value.toUpperCase())}
                type="text"
                id="input"
                value={disciplineId}
                placeholder="INF027, MAT222, LET102..."
              />
            </Form.Group>
            <Form.Group style={{ margin: '15px 0', textAlign: 'center' }}>
              <Button
                disabled={!disciplineId.length}
                onClick={() => searchRoom()}
              >
                Buscar
              </Button>
            </Form.Group>
          </Form>
          {parsedData.length ? (
            <Table
              responsive
              borderless
              hover
            >
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Bloco</th>
                  <th>Sala</th>
                  <th>Horário</th>
                  <th>Dia</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.map((element) => (
                  <tr>
                    <td>{element.discipline}</td>
                    <td>{element.block}</td>
                    <td>{element.roomName}</td>
                    <td>{element.time}</td>
                    <td>{element.dayOfWeek}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            haveSearch && <div>Nada encontrado! 😔</div>
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
