import React from "react";

interface CardImageProps {
  url: string
}

const CardImage = ({ url }: CardImageProps): JSX.Element => {
  return (
    <div className={`cardImageContainer`}>
      <img loading="lazy" className={`cardImage`} src={url} alt={"shoey"} />
    </div>
  );
};

export default CardImage;
