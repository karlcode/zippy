import React, { useEffect } from "react";
import "./CardGrid.css";
import { Modal, useModal } from "./Modal";
import { ProductListData } from "../ProductListInterface";
import Card from "./Card";
import { MetaMeta } from "../SearchResultsInterface";

interface CardGridProps {
  data: { read: () => ProductListData[] };
  meta: MetaMeta;
}

export const CardGridHeader = ({ meta }: { meta: MetaMeta }): JSX.Element => {
  return (
    <div className={`CardGridHeader row`}>
      <span className={`CardGridHeader-MoreLink highlight offBlack leftAlign`}>
        More from Nike -{" "}
        <a href="https://www.nike.com/" rel="noreferrer" target="_blank" className={`hyperlink`}>
          Air Max, Air Jordan, Flyknit...
        </a>
      </span>
      <span className={`CardGridHeader-ProductCount highlight grey rightAlign`}>
        {meta.total} products from 8 retailers
      </span>
    </div>
  );
};

const CardGrid = ({ data, meta }: CardGridProps): JSX.Element => {
  const [visible, modalData, openModalWithData, closeModal] = useModal<ProductListData>();
  const completeData: ProductListData[] = data.read();

  return (
    <div className={`CardGrid withGutter`}>
      <CardGridHeader meta={meta} />
      <div className={`CardGridContainer`}>
        {completeData &&
          completeData.map((item) => <Card key={item.id} onClick={openModalWithData(item)} data={item} />)}
      </div>
      {visible ?? <Modal onClose={closeModal} visible={visible} data={modalData} />}
    </div>
  );
};

export default CardGrid;
