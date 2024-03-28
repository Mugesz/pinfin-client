import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, handleClose }) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your data has been submitted successfully.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
