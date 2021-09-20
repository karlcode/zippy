import React from "react";
import "./Card.css";
import Skeleton from "react-loading-skeleton";

export const LoadingCard = (): JSX.Element => {
  return (
    <>
      <div className={`CardContainer`}>
        <div className={`CardImageContainer`}>
          <Skeleton height={"100%"} />
        </div>
        <div className={`CardContent leftAlign`}>
          <h5 className={`CardContent-Title`}>
            <Skeleton />
          </h5>
          <a href={"www.google.com"} target="_blank" rel="noreferrer" className={`CardContent-Vendor hyperlink`}>
            <Skeleton />
          </a>
          <p className={`CardContent-Installment`}>
            <Skeleton />
          </p>
          <p className={`CardContent-Subtext`}>
            <Skeleton />
          </p>
        </div>
      </div>
    </>
  );
};
