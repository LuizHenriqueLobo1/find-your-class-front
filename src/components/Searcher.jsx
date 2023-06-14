import { useEffect, useState } from 'react';
import { Button, Form, Spinner, Table } from 'react-bootstrap';
import api from '../api/api';
import '../App.css';
import { getSchedule, minNumberOfSchedules, readDataOfLocalStorage, saveDataOnLocalStorage } from '../utils/utils';
import DataLoadError from './DataLoadError';
import Footer from './Footer';
import SearchResultCard from './SearchResultCard';

export default function Searcher() {
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
            parsedData.length > minNumberOfSchedules ? (
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
              <div
                style={{
                  overflowX: 'auto',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                {parsedData.map((element) => (
                  <SearchResultCard element={element} />
                ))}
              </div>
            )
          ) : (
            haveSearch && <div>Nada encontrado! 😔</div>
          )}
          <Footer />
        </>
      )}
    </div>
  );
}
