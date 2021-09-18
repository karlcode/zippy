
import {convertToPrice} from "./utils";

test('convertToPrice', () => {
  expect(convertToPrice(100)).toBe("$100.00")
  expect(convertToPrice(99.99)).toBe("$99.99")
  expect(convertToPrice(99.123456789)).toBe("$99.12")
});
