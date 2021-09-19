import React from "react";
import "./Card.css";
import CardImage from "./CardImage";
import { CardContent } from "./Card";
import shoey from "../assets/images/nike-pegasus.png";

export const LoadingCard = (): JSX.Element => {
  return (
    <>
      <div className={`cardContainer`}>
        <CardImage url={shoey} />
        <CardContent title={"LOL"} price={123} retailerName={"LOL"} retailerUrl={"LOL"} />
        {/*  make a fake card content*/}
      </div>
    </>
  );
};
