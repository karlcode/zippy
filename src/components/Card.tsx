import React from 'react';
import "./Card.css"
import shoey from '../assets/images/nike-pegasus.png';
import {convertToPrice} from "../utils";

interface CardProps {

}

interface CardContentProps {
  title: string;
  price: number;
}

export const CardImage = (): React.ReactElement => {
  return (
      <div className={`cardImageContainer`}>
        <img className={`cardImage`} src={shoey} alt={"shoey"}/>
      </div>
  )
}

export const CardContent = ({title, price}: CardContentProps): React.ReactElement => {
  const installment = convertToPrice(price/4)
  const productPrice = convertToPrice(price)
  return (
      <div className={`cardContent`}>
        <h5 className={`cardContent_title`}>{title}</h5>
        <a href="https://www.nike.com/" className={`cardContent_vendor hyperlink`}>www.nike.com</a>
        <p className={`cardContent_installment`}>{installment}</p>
        <p className={`cardContent_subtext`}>{productPrice} split into 4 easy payments</p>
      </div>
  )
}

export const Card = (): JSX.Element => {
  return (
    <>
      <div className={`cardContainer`}>
        <CardImage/>
        <CardContent title={"Nike Pegasus Trail 2 GORE-TEX"} price={170} />
      </div>
    </>
  );
};
