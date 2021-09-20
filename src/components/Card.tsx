import React from "react";
import "./Card.css";
import { convertToPrice } from "../utils";
import CardImage from "./CardImage";
import { ProductListData } from "../ProductListInterface";

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
    <div className={`CardContent leftAlign`}>
      <h5 className={`CardContent-Title`}>{title}</h5>
      <a href={retailerUrl} target="_blank" rel="noreferrer" className={`CardContent-Vendor hyperlink`}>
        {retailerName}
      </a>
      <p className={`CardContent-Installment`}>{installment}</p>
      <p className={`CardContent-Subtext`}>{productPrice} split into 4 easy payments</p>
    </div>
  );
};

const Card = ({ onClick, data }: CardProps): JSX.Element => {
  return (
    <>
      <div className={`CardContainer`} onClick={onClick}>
        <CardImage url={data.productImagePath} alt={data.productTitle} />
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
