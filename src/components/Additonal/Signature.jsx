import React, { useRef, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

import SignatureCanvas from "react-signature-canvas";

const Signature = ({ setSign, sigPad, show, setShow }) => {
  const [isDrawing, setIsDrawing] = useState("");

  let data = "";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const finishDrawing = (e) => {
    // console.log(e);
  };

  return (
    <div>
      {/* <button onClick={handleShow}>Open modal</button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Signature</Modal.Title>
        </Modal.Header>

        <Button className="btn" onClick={() => sigPad.current.clear()}>
          Clear
        </Button>
        <SignatureCanvas
          onEnd={finishDrawing}
          penColor="blue"
          canvasProps={{ width: 400, height: 200, className: "drawing-canvas" }}
          ref={(ref) => {
            sigPad.current = ref;
          }}
        />
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              data = sigPad.current.toDataURL();
              sigPad.current.clear();
              setSign(data);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signature;
