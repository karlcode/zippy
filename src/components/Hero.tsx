import React from "react";
import "./Hero.css";
import companyLogo from "../assets/images/hero-image.png";
import { Button } from "./Button";

interface HeroProps {}

export const Hero = (props: HeroProps): JSX.Element => (
  <div className={`HeroContainer`}>
    <div className={`HeroBackground`}>
      <div className={`HeroBackground-Circle`} />
      <img className={`HeroBackground-Image`} src={companyLogo} alt="The colour changing air force 1s" />
    </div>
    <div className={`HeroContent withGutter`}>
      <article className={`HeroCopy`}>
        <h1>Nike React Sneakers</h1>
        <h2>Pay in 4 interest-free installments.</h2>
      </article>
      <div className={`HeroButtonRow`}>
        <Button label="Men" primary />
        <Button label="Women" primary />
      </div>
    </div>
  </div>
);
