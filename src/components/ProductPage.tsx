import React, { lazy, Suspense, useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { wrapResource } from "../utils";
import { getProductMetadata, getProducts } from "../SearchResultsApi";
import "./ProductPage.css";
import { LoadingCardGrid } from "./LoadingCardGrid";
import { ErrorBoundary } from "./ErrorBoundary";
import { MetaMeta } from "../SearchResultsInterface";

const CardGrid = lazy(() => import("./CardGrid"));

const ProductPage = (): JSX.Element => {
  const [products, setProducts] = useState(() => wrapResource(getProducts(1)));
  const [metadata, setMetadata] = useState({} as MetaMeta);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const storedPage = localStorage.getItem("currentPage");
    const initialValue = JSON.parse(storedPage || "0");
    return initialValue || 0;
  });
  const [pageTotal, setPageTotal] = useState(0);

  const onPageChange = ({ selected }: { selected: number }): void => {
    const pageNumber = selected + 1;
    setCurrentPage(selected);
    setProducts(wrapResource(getProducts(pageNumber)));
  };

  useEffect(() => {
    getProductMetadata().then((meta) => {
      setPageTotal(Math.ceil(meta.total / meta.pageSize));
      setMetadata(meta);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  return (
    <div className={`ProductPage`}>
      <ErrorBoundary fallback={<h2>Sorry, there was a problem loading our products</h2>}>
        <Suspense fallback={<LoadingCardGrid />}>
          <CardGrid data={products} meta={metadata} />
        </Suspense>
        <Pagination visible pageCount={pageTotal} range={4} onPageChange={onPageChange} currentPage={currentPage} />
      </ErrorBoundary>
    </div>
  );
};

export default ProductPage;
