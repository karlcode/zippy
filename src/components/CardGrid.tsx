import React, { lazy, Suspense } from "react";

import "./CardGrid.css";
import { Modal, useModal } from "./Modal";
import { LoadingCard } from "./LoadingCard";
import { ProductListData } from "../ProductListInterface";

interface CardGridProps {
  data: ProductListData[];
}

const Card = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return import("./Card");
});

export const CardGridHeader = () => {
  return (
    <div className={`cardGridHeader row`}>
      <span className={`cardGridHeader_moreLink highlight offBlack leftAlign`}>
        More from Nike -{" "}
        <a href="https://www.nike.com/" className={`hyperlink`}>
          Air Max, Air Jordan, Flyknit...
        </a>
      </span>
      <span className={`cardGridHeader_productCount highlight grey rightAlign`}>120 products from 8 retailers</span>
    </div>
  );
};

const CardGrid = ({ data }: CardGridProps): JSX.Element => {
  const [visible, modalData, openModalWithData, closeModal] = useModal<ProductListData>();
  return (
    <div className={`cardGrid withGutter`}>
      <CardGridHeader />
      <div className={`cardGridContainer`}>
        <Suspense fallback={<LoadingCard />}>
          {data && data.map((item) => <Card key={item.id} onClick={openModalWithData(item)} data={item} />)}
        </Suspense>
      </div>
      <Modal onClose={closeModal} visible={visible} data={modalData} />
    </div>
  );
};

export default CardGrid;
