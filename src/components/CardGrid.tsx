import React from "react";

import "./CardGrid.css";
import { Card } from "./Card";
import { Modal, useModal } from "./Modal";

interface CardGridProps {
  data: any[];
}

export const CardGridHeader = () => {
  return (
    <div className={`cardGridHeader`}>
      <span className={`cardGridHeader_moreLink highlight offBlack`}>
        More from Nike -{" "}
        <a href="https://www.nike.com/" className={`hyperlink`}>
          Air Max, Air Jordan, Flyknit...
        </a>
      </span>
      <span className={`cardGridHeader_productCount highlight grey`}>120 products from 8 retailers</span>
    </div>
  );
};

export const CardGrid = ({ data }: CardGridProps) => {
  const [visible, modalData, openModalWithData, closeModal] = useModal();
  return (
    <div className={`cardGrid withGutter`}>
      <CardGridHeader />
      <div className={`cardGridContainer`}>
        {data.map((item) => (
          <Card key={item} onClick={openModalWithData(item)} data={item} />
        ))}
      </div>
      <Modal onClose={closeModal} visible={visible} modalData={modalData} />
    </div>
  );
};
