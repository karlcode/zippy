import { Convert, SearchResultsInterface } from "./SearchResultsInterface";
import { ProductListData } from "./ProductListInterface";

export const getProducts = async (page?: number) => {
  const response = await fetch(`https://api.theurge.com.au/search-results?brands=Nike${page ? `&page=${page}` : ""}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const rawJSON = await response.text();
  const parsedJSON = Convert.toSearchResultsInterface(rawJSON);
  return resultsDtoToProductListData(parsedJSON);
};

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
