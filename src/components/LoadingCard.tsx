import React from "react";
import "./Card.css";
import Skeleton from "react-loading-skeleton";

export const LoadingCard = (): JSX.Element => {
  return (
    <>
      <div className={`cardContainer`}>
        <div className={`cardImageContainer`}>
          <Skeleton height={"100%"} />
        </div>
        <div className={`cardContent leftAlign`}>
          <h5 className={`cardContent_title`}>
            <Skeleton />
          </h5>
          <a href={""} target="_blank" rel="noreferrer" className={`cardContent_vendor hyperlink`}>
            <Skeleton />
          </a>
          <p className={`cardContent_installment`}>
            <Skeleton />
          </p>
          <p className={`cardContent_subtext`}>
            <Skeleton />
          </p>
        </div>
      </div>
    </>
  );
};
