import React, { lazy, Suspense, useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { wrapResource } from "../utils";
import { getPageTotal, getProducts } from "../SearchResultsApi";
import "./ProductPage.css";
import { LoadingCardGrid } from "./LoadingCardGrid";

const CardGrid = lazy(() => import("./CardGrid"));

const ProductPage = (): JSX.Element => {
  const [products, setProducts] = useState(() => wrapResource(getProducts(1)));
  const [pageTotal, setPageTotal] = useState(0);

  const onPageChange = ({ selected }: { selected: number }): void => {
    const pageNumber = selected + 1; // 0 based index on pagination
    setProducts(wrapResource(getProducts(pageNumber)));
  };

  useEffect(() => {
    getPageTotal().then((meta) => setPageTotal(Math.ceil(meta.total / meta.pageSize)));
  }, []);

  return (
    <div className={`ProductPage`}>
      <Suspense fallback={<LoadingCardGrid />}>
        <CardGrid data={products} />
      </Suspense>
      <Pagination visible pageCount={pageTotal} range={4} onPageChange={onPageChange} />
    </div>
  );
};

export default ProductPage;
