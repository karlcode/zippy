import React from "react";
import { loadImage } from "../utils";

interface CardImageProps {
  url: string;
}

const SuspenseImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  props.src && loadImage(props.src).read();
  return <img {...props} alt={"todo"} />;
};

const CardImage = ({ url }: CardImageProps): JSX.Element => {
  return (
    <div className={`cardImageContainer`}>
      <SuspenseImage className={`cardImage`} src={url} />
    </div>
  );
};

export default CardImage;
