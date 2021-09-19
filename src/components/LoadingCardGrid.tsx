import React from "react";
import "./CardGrid.css";
import { CardGridHeader } from "./CardGrid";
import { LoadingCard } from "./LoadingCard";

const mockCards = [...Array(20)].map((i) => <LoadingCard />);

export const LoadingCardGrid = (): JSX.Element => {
  return (
    <div className={`cardGrid withGutter`}>
      <CardGridHeader />
      <div className={`cardGridContainer`}>{mockCards}</div>
    </div>
  );
};
