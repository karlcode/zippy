import React from "react";
import "./Card.css";
import { convertToPrice } from "../utils";
import CardImage from "./CardImage";
import {ProductListData} from "../ProductListInterface";

interface CardProps {
  onClick?: () => any;
  data: ProductListData;
}

interface CardContentProps {
  title: string;
  price: number;
  retailerName: string;
  retailerUrl: string;
}

export const CardContent = ({ title, price, retailerUrl, retailerName }: CardContentProps): JSX.Element => {
  const installment = convertToPrice(price / 4);
  const productPrice = convertToPrice(price);
  return (
    <div className={`cardContent leftAlign`}>
      <h5 className={`cardContent_title`}>{title}</h5>
      <a href={retailerUrl} target="_blank" rel="noreferrer" className={`cardContent_vendor hyperlink`}>
        {retailerName}
      </a>
      <p className={`cardContent_installment`}>{installment}</p>
      <p className={`cardContent_subtext`}>{productPrice} split into 4 easy payments</p>
    </div>
  );
};

const Card = ({ onClick, data }: CardProps): JSX.Element => {
  return (
    <>
      <div className={`cardContainer`} onClick={onClick}>
        <CardImage url={data.productImagePath} />
        <CardContent
          title={data.productTitle}
          price={data.productPrice}
          retailerName={data.retailerName}
          retailerUrl={data.retailerUrl}
        />
      </div>
    </>
  );
};

export default Card;
