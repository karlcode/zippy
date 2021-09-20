import React, { useState } from "react";

import "./Modal.css";
import { createPortal } from "react-dom";
import { convertToPrice } from "../utils";
import { Button } from "./Button";
import { ProductListData } from "../ProductListInterface";
import Skeleton from "react-loading-skeleton";

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
    <div className={`Modal ${visible ? "Modal_open" : ""}`} onClick={onClose} role="presentation">
      <div className={`Modal-Content ${visible ? "Modal-Content_open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={`Modal-Body`}>
          <div className={`Modal-ImageContainer`}>
            <img className={`Modal-BodyImage`} src={data.productImagePath} alt={""} />
          </div>
          <div className={`Modal-ProductContainer`}>
            <h1 className={`highlight row`}>{data.productTitle}</h1>
            <h2 className={`highlight row`}>
              <a className={`hyperlink`} href={data.retailerUrl} rel="noreferrer" target="_blank">
                {data.retailerName}
              </a>
              <span className={`rightAlign`}>{installment}</span>
            </h2>
            <span className={`row rightAlign`}>{productPrice} split into 4 easy payments</span>
            <div className={`placeholderText`}>
              <Skeleton count={5}/>
            </div>
            <div className={`Modal-ActionButton`}>
              <Button label={"Add to Cart"} primary={false} />
            </div>
          </div>
        </div>
        <button className={`Modal-CloseButton`} onClick={onClose} />
      </div>
    </div>,
    document.getElementById("root") || document.body
  );
};
