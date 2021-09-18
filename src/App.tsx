import React, { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import { Hero } from "./components/Hero";
import { CardGrid } from "./components/CardGrid";
import { Convert, SearchResultsInterface } from "./SearchResultsInterface";

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

function App() {
  const [productData, setProductData] = useState<any>([]);

  useEffect(() => {
    getProducts()
      .then((json) => {
        return Convert.toSearchResultsInterface(json); // QuickType util which uses a JSON string and verifies JSON is valid
      })
      .then((results) => {
        return resultsDtoToProductListData(results);
      })
      .then((products) => {
        setProductData(products);
      })
      .catch((err) => {
        console.log("there was an issue retrieving your data");
        // Create an error state for this data
      });

    async function getProducts() {
      const response = await fetch("https://api.theurge.com.au/search-results?brands=Nike", {
        headers: {
          Accept: "application/json",
        },
      });
      return response.text();
    }
  }, []);

  return (
    <div className="App">
      <Hero />
      <div className={`App_products`}>
        <CardGrid data={productData} />
      </div>
    </div>
  );
}

export default App;
