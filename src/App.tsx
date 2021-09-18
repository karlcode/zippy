import React, { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import { Hero } from "./components/Hero";
import { CardGrid } from "./components/CardGrid";
import { Convert, SearchResultsInterface } from "./SearchResultsInterface";
//
//   const searchResultsInterface = Convert.toSearchResultsInterface(json);

const mockData: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

interface ProductListData {
  productTitle: string;
  productPrice: number;
  productCurrency: number;
  productImagePath: string;
  productRetailer: string;
}

const resultsDtoToProductListData = ({ data, meta }: SearchResultsInterface): ProductListData[] => {
  return data.map((d) => ({
    productTitle: d.attributes.product_name,
    productImagePath: d.attributes.e_image_urls_og,
    productPrice: d.attributes.sale_price || NaN,
    productCurrency: Number(d.attributes.currency),
    productRetailer: d.attributes.e_retailer_display_name,
  }));
};

function App() {
  const [productData, setProductData] = useState<any>([]);

  useEffect(() => {
    getProducts()
      .then((json) => {
        return Convert.toSearchResultsInterface(json); // QuickType util for verifying JSON is valid
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
      const response = await fetch("https://api.theurge.com.au/search-results?brands=Nike");
      return response.json();
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
