import { Button } from 'react-bootstrap';

export default function DataLoadError() {
  return (
    <div
      style={{ fontSize: '16pt', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      key="danger"
      variant="danger"
    >
      Erro ao carregar os dados! 😔
      <Button
        style={{ width: '60%', marginTop: '15px' }}
        onClick={() => window.location.reload()}
      >
        Recarregar
      </Button>
    </div>
  );
}
