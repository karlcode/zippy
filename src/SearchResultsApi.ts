import { SearchResultsInterface } from "./SearchResultsInterface";
import { ProductListData } from "./ProductListInterface";

export const getProducts = async (page?: number) => {
  const response = await fetch(`https://api.theurge.com.au/search-results?brands=Nike${page ? `&page=${page}` : ""}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const rawJSON = await response.json();
  /* const parsedJSON = Convert.toSearchResultsInterface(rawJSON); */
  // QuickType was unable to crawl through all the pages and ascertain the complete interface so this is a little hack
  return resultsDtoToProductListData(rawJSON as unknown as SearchResultsInterface);
};

export const getPageTotal = async () => {
  const response = await fetch(`https://api.theurge.com.au/search-results?brands=Nike`, {
    headers: {
      Accept: "application/json",
    },
  });
  const rawJSON = await response.json();
  /* const parsedJSON = Convert.toSearchResultsInterface(rawJSON); */
  // QuickType was unable to crawl through all the pages and ascertain the complete interface so this is a little hack
  return (rawJSON as unknown as SearchResultsInterface).meta.meta;
};

const resultsDtoToProductListData = ({ data, meta }: SearchResultsInterface): ProductListData[] => {
  return data.map((d) => ({
    id: d.id,
    productTitle: d.attributes.product_name || "",
    productImagePath: d.attributes.e_image_urls_og || "",
    productPrice: d.attributes.retailer_price || NaN,
    productCurrency: Number(d.attributes.currency),
    retailerName: d.attributes.e_retailer_display_name || "",
    retailerUrl: d.attributes.retailer_url || "",
    totalItems: meta.meta.total,
  }));
};
