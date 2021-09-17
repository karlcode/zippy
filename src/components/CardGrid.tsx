import React from 'react';

import styles from './CardGrid.module.css';
import {Card} from "./Card";


interface CardGridProps {

}

export const CardGrid = (props: CardGridProps) => (
  <div className={styles.cardGridContainer}>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>

  </div>
);
