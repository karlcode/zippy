import React from "react";

const CardImage = ({ url }: { url: string }): JSX.Element => {
  return (
    <div className={`cardImageContainer`}>
      <img className={`cardImage`} src={url} alt={"shoey"} />
    </div>
  );
};

export default CardImage;
