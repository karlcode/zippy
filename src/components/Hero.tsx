import React from "react";

import "./Hero.css";

import companyLogo from "../assets/images/hero-image.png";
import { Button } from "./Button";

interface HeroProps {}

export const Hero = (props: HeroProps): JSX.Element => (
  <div className={`heroContainer`}>
    <div className={`heroBackground`}>
      <div className={`heroBackgroundCircle`} />
      <img className={`heroImage`} src={companyLogo} alt="The colour changing air force 1s" />
      <div className={`heroContent withGutter`}>
        <article className={`heroCopy`}>
          <h1>Nike React Sneakers</h1>
          <h2>Pay in 4 interest-free installments.</h2>
        </article>
        <div className={`heroButtonRow`}>
          <Button label="Men" primary />
          <Button label="Women" primary />
        </div>
      </div>
    </div>
  </div>
);
