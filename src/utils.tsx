interface Resource {
  read: () => any;
}

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
export const wrapResource = (promise: Promise<any>): Resource => {
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

const imageCache = new Map<string, any>();

/**
 * Suspense for img src load
 * Taken from dev.to/sergiodxa/use-react-suspense-to-wait-for-an-image-to-load-17k5
 * */
export const loadImage = (source: string): Resource => {
  let resource = imageCache.get(source);
  if (resource) return resource;
  resource = wrapResource(
    new Promise((res, rej) => {
      const img = document.createElement("img");
      img.src = source;
      img.addEventListener("load", () => res(source));
      img.addEventListener("error", () => rej(new Error("Couldn't load image")));
    })
  );
  imageCache.set(source, resource);
  return resource;
};
