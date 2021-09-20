import React from "react";
import { loadImage } from "../utils";
import "./Card.css"

interface CardImageProps {
  url: string;
  alt: string;
}

const SuspenseImage = (props: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element => {
  props.src && loadImage(props.src).read();
  return <img {...props} alt={props.alt} />;
};

const CardImage = ({ url, alt }: CardImageProps): JSX.Element => {
  return (
    <div className={`CardImageContainer`}>
      <SuspenseImage className={`CardImage`} src={url} alt={alt} />
    </div>
  );
};

export default CardImage;
