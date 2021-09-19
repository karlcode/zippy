import React, {lazy, useState} from "react";

import "./CardGrid.css";
import { Modal, useModal } from "./Modal";
import { ProductListData } from "../ProductListInterface";
import Card from "./Card";

interface CardGridProps {
  data: { read: () => ProductListData[] };
}

export const CardGridHeader = () => {
  return (
    <div className={`cardGridHeader row`}>
      <span className={`cardGridHeader_moreLink highlight offBlack leftAlign`}>
        More from Nike -{" "}
        <a href="https://www.nike.com/" rel="noreferrer" target="_blank" className={`hyperlink`}>
          Air Max, Air Jordan, Flyknit...
        </a>
      </span>
      <span className={`cardGridHeader_productCount highlight grey rightAlign`}>120 products from 8 retailers</span>
    </div>
  );
};

const CardGrid = ({ data }: CardGridProps): JSX.Element => {
  const [visible, modalData, openModalWithData, closeModal] = useModal<ProductListData>();

  const completeData: ProductListData[] = data.read();
  return (
    <div className={`cardGrid withGutter`}>
      <CardGridHeader />
      <div className={`cardGridContainer`}>
        {completeData &&
          completeData.map((item) => <Card key={item.id} onClick={openModalWithData(item)} data={item} />)}
      </div>
      <Modal onClose={closeModal} visible={visible} data={modalData} />
    </div>
  );
};

export default CardGrid;
