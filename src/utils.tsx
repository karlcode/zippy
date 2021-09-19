/**
 * Convert number to price string with currency symbol based on locale/region
 * Default to $ but will need special logic for other currencies
 * @param price
 * @param currency
 */
export const convertToPrice = (price: number, currency: string = "AUD"): string => {
  return price ? `$${price.toFixed(2)}` : "Price not available"; //ensure there is no underflow
};

/**
 * Suspense resource wrapper for handling data fetching states
 */
export const wrapResource = (promise: Promise<any>) => {
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
