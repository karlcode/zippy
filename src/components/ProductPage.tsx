import React, { lazy, Suspense, useState } from "react";
import { Pagination } from "./Pagination";
import { wrapResource } from "../utils";
import { getProducts } from "../SearchResultsApi";
import "./ProductPage.css";
import { LoadingCardGrid } from "./LoadingCardGrid";

const CardGrid = lazy(() => import("./CardGrid"));

const ProductPage = (): JSX.Element => {
  const [products, setProducts] = useState(() => wrapResource(getProducts(1)));

  const onPageChange = ({ selected }: { selected: number }): void => {
    const pageNumber = selected + 1; // 0 based index on pagination
    setProducts(wrapResource(getProducts(pageNumber)));
  };
  return (
    <div className={`ProductPage`}>
      <Suspense fallback={<LoadingCardGrid />}>
        <CardGrid data={products} />
      </Suspense>
      <Pagination visible pageCount={100} range={4} onPageChange={onPageChange} />
    </div>
  );
};

export default ProductPage;
