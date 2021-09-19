import React from "react";
import CardGrid from "./CardGrid";

interface ProductPageProps {
  data: { read: () => any };
}

export const ProductPage = ({ data }: ProductPageProps): JSX.Element => {
  const products = data.read();
  return (
    <div>
      <CardGrid data={products} />
    </div>
  );
};
