import { Card } from 'react-bootstrap';

export default function SearchResultCard({ element }) {
  return (
    <Card style={{ width: '260px', height: '320px' }}>
      <Card.Header style={{ textAlign: 'center' }}>
        <Card.Title>
          <h4>{element.dayOfWeek}</h4>
          <Card.Text>{element.time}</Card.Text>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{element.block}</Card.Text>
        <Card.Text>{element.roomName}</Card.Text>
      </Card.Body>
      <Card.Footer style={{ textAlign: 'center', background: '#FFF' }}>
        <Card.Text>{element.discipline}</Card.Text>
      </Card.Footer>
    </Card>
  );
}
