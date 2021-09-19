import React, { lazy, Suspense } from "react";
import "./index.css";
import "./App.css";
import { Hero } from "./components/Hero";
import { Convert, SearchResultsInterface } from "./SearchResultsInterface";
import { LoadingPage } from "./components/LoadingPage";
import { wrapResource } from "./utils";
import { ProductListData } from "./ProductListInterface";

const ProductPage = lazy(() => import("./components/ProductPage"));

const resultsDtoToProductListData = ({ data, meta }: SearchResultsInterface): ProductListData[] => {
  return data.map((d) => ({
    id: d.id,
    productTitle: d.attributes.product_name,
    productImagePath: d.attributes.e_image_urls_og,
    productPrice: d.attributes.retailer_price || NaN,
    productCurrency: Number(d.attributes.currency),
    retailerName: d.attributes.e_retailer_display_name,
    retailerUrl: d.attributes.retailer_url,
  }));
};
async function getProducts() {
  const response = await fetch("https://api.theurge.com.au/search-results?brands=Nike", {
    headers: {
      Accept: "application/json",
    },
  });
  const rawJSON = await response.text();
  const parsedJSON = Convert.toSearchResultsInterface(rawJSON);
  return resultsDtoToProductListData(parsedJSON);
}

const data = wrapResource(getProducts())
function App() {
  return (
    <div className="App">
      <Hero />
      <div className={`App_products`}>
        <Suspense fallback={<LoadingPage />}>
          <ProductPage data={data} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
