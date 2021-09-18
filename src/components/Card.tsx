import React from "react";
import "./Card.css";
import shoey from "../assets/images/nike-pegasus.png";
import { convertToPrice } from "../utils";
import { ProductListData } from "../App";

interface CardProps {
  onClick: () => any;
  data: ProductListData;
}

interface CardContentProps {
  title: string;
  price: number;
  retailerName: string;
  retailerUrl: string;
}

export const CardImage = ({ url }: { url: string }): React.ReactElement => {
  return (
    <div className={`cardImageContainer`}>
      <img className={`cardImage`} src={url} alt={"shoey"} />
    </div>
  );
};

export const CardContent = ({ title, price, retailerUrl, retailerName }: CardContentProps): React.ReactElement => {
  const installment = convertToPrice(price / 4);
  const productPrice = convertToPrice(price);
  return (
    <div className={`cardContent`}>
      <h5 className={`cardContent_title`}>{title}</h5>
      <a href={retailerUrl} className={`cardContent_vendor hyperlink`}>
        {retailerName}
      </a>
      <p className={`cardContent_installment`}>{installment}</p>
      <p className={`cardContent_subtext`}>{productPrice} split into 4 easy payments</p>
    </div>
  );
};

export const Card = ({ onClick, data }: CardProps): JSX.Element => {
  return (
    <>
      <div className={`cardContainer`} onClick={onClick}>
        <CardImage url={data.productImagePath} />
        <CardContent title={data.productTitle} price={data.productPrice} retailerName={data.retailerName} retailerUrl={data.retailerUrl} />
      </div>
    </>
  );
};
