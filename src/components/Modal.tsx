import React, { useState } from "react";

import "./Modal.css";
import { createPortal } from "react-dom";
import { ProductListData } from "../App";
import { convertToPrice } from "../utils";
import { Button } from "./Button";

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
  const productPrice = convertToPrice(data.productPrice);
  const installment = convertToPrice(data.productPrice / 4);
  return createPortal(
    <div
      className={`Modal ${visible ? "Modal--open" : ""}`}
      onClick={onClose}
      aria-labelledby={""}
      aria-describedby={""}
      aria-modal
      role="presentation">
      <div className={`Modal-content ${visible ? "Modal-content--open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={`Modal-body`}>
          <div className={`Modal-imageContainer`}>
            <img className={`Modal-body-image`} src={data.productImagePath} alt={""} />
          </div>
          <div className={`Modal-productContainer`}>
            <h1 className={`highlight row`}>{data.productTitle}</h1>
            <h2 className={`highlight row`}>
              <a className={`hyperlink`} href={data.retailerUrl} rel="noreferrer" target="_blank">
                {data.retailerName}
              </a>
              <span className={`rightAlign`}>{installment}</span>
            </h2>
            <span className={`row rightAlign`}>{productPrice} split into 4 easy payments</span>
            <Button className={`Modal-actionButton`} label={"Add to Cart"} primary />
          </div>
        </div>
        <button className={`Modal-closeButton`} onClick={onClose} />
      </div>
    </div>,
    document.getElementById("root") || document.body
  );
};
