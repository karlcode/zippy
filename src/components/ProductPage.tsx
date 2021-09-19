import React, { lazy, Suspense } from "react";
import { Pagination } from "./Pagination";
import { LoadingPage } from "./LoadingPage";

const CardGrid = lazy(() => import("./CardGrid"));

interface ProductPageProps {
  data: any;
}

const ProductPage = ({ data }: ProductPageProps): JSX.Element => {
  // // Suspense resource wrapper for handling data fetching states
  // const [state, setState] = useState(() => wrapResource(getProducts(1)).read());
  // const onPageChange = ({ selected }: { selected: number }) => {
  //   const resource = wrapResource(getProducts(selected)).read();
  //   setState(resource);
  // };
  const properdata = data.read();
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <CardGrid data={properdata} />
      </Suspense>
      <Pagination visible pageCount={100} range={4} onPageChange={(selectedItem) => console.log("yes")} />
    </>
  );
};

export default ProductPage;
