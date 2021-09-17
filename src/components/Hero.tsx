import React from 'react';

import styles from './Hero.module.css';

import companyLogo from '../assets/images/hero-image.png';
import {Button} from "./Button";


interface HeroProps {

}

export const Hero = (props: HeroProps) => (
  <div className={styles.heroContainer}>
    <div className={styles.heroBackgroundCircle}></div>
    <img className={styles.heroImage} src={companyLogo} alt="The colour changing air force 1s"/>
    <div className={styles.heroCopy}>
      <h1>Nike React Sneakers</h1>
      <h2>Pay in 4 interest-free installments.</h2>
      <div className={styles.heroButtonRow}>
        <Button label="Men"/>
        <Button label="Women"/>
      </div>
    </div>
  </div>
);
