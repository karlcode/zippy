import React, { lazy, Suspense, useState } from "react";
import "./index.css";
import "./App.css";
import { Hero } from "./components/Hero";
import { Convert, SearchResultsInterface } from "./SearchResultsInterface";
import { ProductPage } from "./components/ProductPage";

export interface ProductListData {
  id: string;
  productTitle: string;
  productPrice: number;
  productCurrency: number;
  productImagePath: string;
  retailerName: string;
  retailerUrl: string;
}

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

const wrapAsync = (promise: Promise<any>) => {
  let status = "pending";
  let result: any;
  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (rej) => {
      status = "error";
      result = rej;
    }
  );
  return {
    read: () => {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

function App() {
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

  return (
    <div className="App">
      <Hero />
      <div className={`App_products`}>
        <Suspense fallback={<div>Loading</div>}>
          <ProductPage data={wrapAsync(getProducts())} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
