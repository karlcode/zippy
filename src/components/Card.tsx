import React from 'react';
import styles from "./Card.module.css"
import shoey from '../assets/images/random.png';

interface CardProps {

}

interface CardContentProps {
  title: string;
  price: number;
}

export const CardImage = (): React.ReactElement => {
  return (
      <div className={styles.cardImageContainer}>
        <img className={styles.cardImage} src={shoey} alt={"shoey"}/>
      </div>
  )
}

export const CardContent = ({title, price}: CardContentProps): React.ReactElement => {
  const installment = (Number(price)/4).toFixed(2); //Ensure this does not underflow
  return (
      <div className={styles.cardContent}>
        <h5>{title}</h5>
        <a href="https://www.nike.com/">www.nike.com</a>
        <p>${installment}</p>
        <p>${price} split into 4 easy payments</p>
      </div>
  )
}

export const Card = (): JSX.Element => {
  return (
    <>
      <div className={styles.cardContainer}>
        <CardImage/>
        <CardContent title={"HAHA"} price={40} />
      </div>
    </>
  );
};
