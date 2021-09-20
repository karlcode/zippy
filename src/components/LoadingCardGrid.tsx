import React from "react";
import "./CardGrid.css";
import { CardGridHeader } from "./CardGrid";
import { LoadingCard } from "./LoadingCard";

const mockCards = [...Array(20)].map((i, index) => <LoadingCard key={index} />);
const mockMetadata = { pageSize: 20, response_type: "", total: 120 };

export const LoadingCardGrid = (): JSX.Element => {
  return (
    <div className={`CardGrid withGutter`}>
      <CardGridHeader meta={mockMetadata} />
      <div className={`CardGridContainer`}>{mockCards}</div>
    </div>
  );
};
