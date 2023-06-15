import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ConfirmationModal({ show, setShow, onConfirm }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Leia com atenção!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ao confirmar, uma nova busca na planilha de alocação de aulas será feita, puxando os dados mais atualizados
            da mesma e os salvando em seu navegador.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Não
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onConfirm();
              setShow(false);
            }}
          >
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
