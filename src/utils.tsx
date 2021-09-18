/**
 * Convert number to price string with currency symbol based on locale/region
 * Default to $ but will need special logic for other currencies
 * @param price
 * @param currency
 */
export const convertToPrice = (price: number, currency: string = "AUD"): string => {
  return `$${price.toFixed(2)}`; //ensure there is no underflow
}