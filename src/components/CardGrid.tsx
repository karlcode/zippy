import React from 'react';

import './CardGrid.css';
import {Card} from "./Card";


interface CardGridProps {

}

export const CardGridHeader = () => {
    return (
      <div className={`cardGridHeader`}>
        <span className={`cardGridHeader_moreLink highlight offBlack`}>More from Nike</span>
        <span className={`cardGridHeader_productCount highlight grey`}>Shop 100 products from 80 retailers</span>
      </div>
    )
}

export const CardGrid = (props: CardGridProps) => (
  <div className={`cardGrid withGutter`}>
    <CardGridHeader/>
    <div className={`cardGridContainer`}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>
  </div>
);
