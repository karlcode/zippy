import React, { useState } from "react";

import "./Modal.css";
import { createPortal } from "react-dom";

interface ModalProps {
  visible: boolean;
  onClose: () => any;
  modalData: any;
}

export const useModal = (): [visible: any, modalData: any, openModal: any, closeModal: any] => {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const openModalWithData = (data: any) => () => {
    setVisible(true);
    setModalData(data);
  };
  const closeModal = () => {
    setVisible(false);
  };

  return [visible, modalData, openModalWithData, closeModal];
};

export const Modal = ({ visible, onClose, modalData }: ModalProps) => {
  return createPortal(
    <div className={`Modal ${visible ? "Modal--open" : ""}`} onClick={onClose}>
      <div className={`Modal-content ${visible ? "Modal-content--open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className={`Modal-closeButton`} onClick={onClose}>
          X
        </button>
        <div className={`Modal-header`}>{modalData}</div>
        <div className={`Modal-body`}>Body</div>
      </div>
    </div>,
    document.getElementById("root") || document.body
  );
};
