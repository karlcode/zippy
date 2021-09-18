import React, { useState } from "react";

import "./Modal.css";
import { createPortal } from "react-dom";
import { ProductListData } from "../App";

interface ModalProps {
  visible: boolean;
  onClose: () => any;
  data: ProductListData;
}

type ModalHookProps<T> = [
  /** Visibility of modal */
  boolean,
  /** Type of data that modal will consume to render */
  T,
  /** Open modal */
  (data: T) => () => any,
  /** Close modal */
  () => any
];

export const useModal = <T extends object>(): ModalHookProps<T> => {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState<T>({} as T);

  const openModalWithData = (data: T) => () => {
    setVisible(true);
    setModalData(data);
  };
  const closeModal = () => {
    setVisible(false);
  };

  return [visible, modalData, openModalWithData, closeModal];
};

export const Modal = ({ visible, onClose, data }: ModalProps) => {
  return createPortal(
    <div className={`Modal ${visible ? "Modal--open" : ""}`} onClick={onClose}>
      <div className={`Modal-content ${visible ? "Modal-content--open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className={`Modal-closeButton`} onClick={onClose}>
          X
        </button>
        <div className={`Modal-header`} aria-labelledby={""}>
          {/* Probably put an a link here */}
          {data.productTitle}
        </div>
        <div className={`Modal-body`} aria-describedby={""}>
          {data.productPrice}
        </div>
      </div>
    </div>,
    document.getElementById("root") || document.body
  );
};
