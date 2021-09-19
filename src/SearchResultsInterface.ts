// To parse this data:
//
//   import { Convert, SearchResultsInterface } from "./file";
//
//   const searchResultsInterface = Convert.toSearchResultsInterface(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface SearchResultsInterface {
  data: Datum[];
  meta: SearchResultsInterfaceMeta;
}

export interface Datum {
  type: Type;
  id: string;
  attributes: Attributes;
}

export interface Attributes {
  availability: Availability;
  color?: string;
  converted_currency: string;
  converted_retailer_price: number;
  converted_sale_price: number;
  currency: Currency;
  e_brand_formatted: EBrandFormatted;
  e_cat_l1: ECatL1[];
  e_cat_l2: string[];
  e_categories: string[];
  e_categories_path: string[];
  e_color: string;
  e_color_parent: string;
  e_friendly_id: string;
  e_friendly_ids: string[];
  e_gender_list: EGenderList[];
  e_image_urls_detail_jpg: Array<string[]>;
  e_image_urls_detail_ratio: number[];
  e_image_urls_detail_webp: Array<string[]>;
  e_image_urls_og: string;
  e_image_urls_search_jpg: Array<string[]>;
  e_image_urls_search_webp: Array<string[]>;
  e_is_free_returns: boolean;
  e_is_free_shipping: boolean;
  e_item_code: string;
  e_material?: string;
  e_product_name: string;
  e_retailer_display_domain: ERetailerDisplayDomain;
  e_retailer_display_name: EBrandFormatted;
  e_retailer_facet_name: EBrandFormatted;
  e_retailer_industry: ERetailerIndustry;
  e_retailer_short_id: ERetailerShortID;
  e_subcat: string[];
  friendly_alternates: FriendlyAlternates;
  friendly_canonical: string;
  gender?: Gender;
  hreflangs: Hreflang[];
  item_code: string;
  long_description: string;
  product_name: string;
  retailer_code: RetailerCode;
  retailer_price: number;
  retailer_url: string;
  sku_code: string;
  updated_at: Date;
  e_affiliate_url?: string;
  e_free_shipping_currency?: Currency;
  e_free_shipping_over?: number[];
  e_is_on_sale?: boolean;
  e_payment_options?: string[];
  e_retailer_type?: string;
  e_returns_link?: string;
  e_returns_period?: number[];
  e_sales?: string[];
  e_shipping_link?: string;
  sale_price?: number;
  e_shipping_deals?: string[];
}

export enum Availability {
  InStock = "in-stock",
}

export enum Currency {
  Aud = "AUD",
  Usd = "USD",
}

export enum EBrandFormatted {
  JDSports = "JD Sports",
  Nike = "Nike",
  Stylerunner = "Stylerunner",
  Ssense = "SSENSE",
}

export enum ECatL1 {
  Clothing = "clothing",
  Shoes = "shoes",
  Bags = "bags",
}

export enum EGenderList {
  Female = "female",
  Male = "male",
  Unisex = "unisex",
}

export enum ERetailerDisplayDomain {
  JdSportsCOMAu = "jd-sports.com.au",
  NikeCOM = "nike.com",
  StylerunnerCOM = "stylerunner.com",
  SsenseCOM = "ssense.com",
}

export enum ERetailerIndustry {
  Fashion = "fashion",
}

export enum ERetailerShortID {
  Jdspo = "jdspo",
  Nke = "nke",
  Str = "str",
  Ss = "ss",
}

export interface FriendlyAlternates {
  "en-au": string;
  "en-gb": string;
  "en-nz": string;
  "en-us": string;
  "en-za": string;
}

export enum Gender {
  Female = "female",
  Unisex = "unisex",
  WomenS = "women's",
}

export enum Hreflang {
  EnAu = "en-au",
  EnUs = "en-us",
  EnZz = "en-zz",
  EnDe = "en-de",
  EnEs = "en-es",
  EnIt = "en-it",
  EnNl = "en-nl",
}

export enum RetailerCode {
  EnauJdSports = "enau-jd-sports",
  EnauNike = "enau-nike",
  EnauStylerunner = "enau-stylerunner",
  EnusNike = "enus-nike",
}

export enum Type {
  Product = "product",
}

export interface SearchResultsInterfaceMeta {
  aggregations: Aggregations;
  meta: MetaMeta;
}

export interface Aggregations {
  brands: null;
  categories: null;
  colors: null;
  countries: null;
  max_price: number;
  offers: null;
  payments: null;
  retailers: null;
  sales: null;
}

export interface MetaMeta {
  pageSize: number;
  response_type: string;
  total: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toSearchResultsInterface(json: string): SearchResultsInterface {
    return cast(JSON.parse(json), r("SearchResultsInterface"));
  }

  public static searchResultsInterfaceToJson(value: SearchResultsInterface): string {
    return JSON.stringify(uncast(value, r("SearchResultsInterface")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ""): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  SearchResultsInterface: o(
    [
      { json: "data", js: "data", typ: a(r("Datum")) },
      { json: "meta", js: "meta", typ: r("SearchResultsInterfaceMeta") },
    ],
    false
  ),
  Datum: o(
    [
      { json: "type", js: "type", typ: r("Type") },
      { json: "id", js: "id", typ: "" },
      { json: "attributes", js: "attributes", typ: r("Attributes") },
    ],
    false
  ),
  Attributes: o(
    [
      { json: "availability", js: "availability", typ: r("Availability") },
      { json: "color", js: "color", typ: u(undefined, "") },
      { json: "converted_currency", js: "converted_currency", typ: "" },
      { json: "converted_retailer_price", js: "converted_retailer_price", typ: 0 },
      { json: "converted_sale_price", js: "converted_sale_price", typ: 0 },
      { json: "currency", js: "currency", typ: r("Currency") },
      { json: "e_brand_formatted", js: "e_brand_formatted", typ: r("EBrandFormatted") },
      { json: "e_cat_l1", js: "e_cat_l1", typ: a(r("ECatL1")) },
      { json: "e_cat_l2", js: "e_cat_l2", typ: a("") },
      { json: "e_categories", js: "e_categories", typ: a("") },
      { json: "e_categories_path", js: "e_categories_path", typ: a("") },
      { json: "e_color", js: "e_color", typ: "" },
      { json: "e_color_parent", js: "e_color_parent", typ: "" },
      { json: "e_friendly_id", js: "e_friendly_id", typ: "" },
      { json: "e_friendly_ids", js: "e_friendly_ids", typ: a("") },
      { json: "e_gender_list", js: "e_gender_list", typ: a(r("EGenderList")) },
      { json: "e_image_urls_detail_jpg", js: "e_image_urls_detail_jpg", typ: a(a("")) },
      { json: "e_image_urls_detail_ratio", js: "e_image_urls_detail_ratio", typ: a(3.14) },
      { json: "e_image_urls_detail_webp", js: "e_image_urls_detail_webp", typ: a(a("")) },
      { json: "e_image_urls_og", js: "e_image_urls_og", typ: "" },
      { json: "e_image_urls_search_jpg", js: "e_image_urls_search_jpg", typ: a(a("")) },
      { json: "e_image_urls_search_webp", js: "e_image_urls_search_webp", typ: a(a("")) },
      { json: "e_is_free_returns", js: "e_is_free_returns", typ: true },
      { json: "e_is_free_shipping", js: "e_is_free_shipping", typ: true },
      { json: "e_item_code", js: "e_item_code", typ: "" },
      { json: "e_material", js: "e_material", typ: u(undefined, "") },
      { json: "e_product_name", js: "e_product_name", typ: "" },
      { json: "e_retailer_display_domain", js: "e_retailer_display_domain", typ: r("ERetailerDisplayDomain") },
      { json: "e_retailer_display_name", js: "e_retailer_display_name", typ: r("EBrandFormatted") },
      { json: "e_retailer_facet_name", js: "e_retailer_facet_name", typ: r("EBrandFormatted") },
      { json: "e_retailer_industry", js: "e_retailer_industry", typ: r("ERetailerIndustry") },
      { json: "e_retailer_short_id", js: "e_retailer_short_id", typ: r("ERetailerShortID") },
      { json: "e_subcat", js: "e_subcat", typ: a("") },
      { json: "friendly_alternates", js: "friendly_alternates", typ: r("FriendlyAlternates") },
      { json: "friendly_canonical", js: "friendly_canonical", typ: "" },
      { json: "gender", js: "gender", typ: u(undefined, r("Gender")) },
      { json: "hreflangs", js: "hreflangs", typ: a(r("Hreflang")) },
      { json: "item_code", js: "item_code", typ: "" },
      { json: "long_description", js: "long_description", typ: "" },
      { json: "product_name", js: "product_name", typ: "" },
      { json: "retailer_code", js: "retailer_code", typ: r("RetailerCode") },
      { json: "retailer_price", js: "retailer_price", typ: 0 },
      { json: "retailer_url", js: "retailer_url", typ: "" },
      { json: "sku_code", js: "sku_code", typ: "" },
      { json: "updated_at", js: "updated_at", typ: Date },
      { json: "e_affiliate_url", js: "e_affiliate_url", typ: u(undefined, "") },
      { json: "e_free_shipping_currency", js: "e_free_shipping_currency", typ: u(undefined, r("Currency")) },
      { json: "e_free_shipping_over", js: "e_free_shipping_over", typ: u(undefined, a(0)) },
      { json: "e_is_on_sale", js: "e_is_on_sale", typ: u(undefined, true) },
      { json: "e_payment_options", js: "e_payment_options", typ: u(undefined, a("")) },
      { json: "e_retailer_type", js: "e_retailer_type", typ: u(undefined, "") },
      { json: "e_returns_link", js: "e_returns_link", typ: u(undefined, "") },
      { json: "e_returns_period", js: "e_returns_period", typ: u(undefined, a(0)) },
      { json: "e_sales", js: "e_sales", typ: u(undefined, a("")) },
      { json: "e_shipping_link", js: "e_shipping_link", typ: u(undefined, "") },
      { json: "sale_price", js: "sale_price", typ: u(undefined, 3.14) },
      { json: "e_shipping_deals", js: "e_shipping_deals", typ: u(undefined, a("")) },
    ],
    false
  ),
  FriendlyAlternates: o(
    [
      { json: "en-au", js: "en-au", typ: "" },
      { json: "en-gb", js: "en-gb", typ: "" },
      { json: "en-nz", js: "en-nz", typ: "" },
      { json: "en-us", js: "en-us", typ: "" },
      { json: "en-za", js: "en-za", typ: "" },
    ],
    false
  ),
  SearchResultsInterfaceMeta: o(
    [
      { json: "aggregations", js: "aggregations", typ: r("Aggregations") },
      { json: "meta", js: "meta", typ: r("MetaMeta") },
    ],
    false
  ),
  Aggregations: o(
    [
      { json: "brands", js: "brands", typ: null },
      { json: "categories", js: "categories", typ: null },
      { json: "colors", js: "colors", typ: null },
      { json: "countries", js: "countries", typ: null },
      { json: "max_price", js: "max_price", typ: 0 },
      { json: "offers", js: "offers", typ: null },
      { json: "payments", js: "payments", typ: null },
      { json: "retailers", js: "retailers", typ: null },
      { json: "sales", js: "sales", typ: null },
    ],
    false
  ),
  MetaMeta: o(
    [
      { json: "pageSize", js: "pageSize", typ: 0 },
      { json: "response_type", js: "response_type", typ: "" },
      { json: "total", js: "total", typ: 0 },
    ],
    false
  ),
  Availability: ["in-stock"],
  Currency: ["AUD", "USD"],
  EBrandFormatted: ["JD Sports", "Nike", "Stylerunner", "SSENSE"],
  ECatL1: ["clothing", "shoes", "bags"],
  EGenderList: ["female", "male", "unisex"],
  ERetailerDisplayDomain: ["jd-sports.com.au", "nike.com", "stylerunner.com", "ssense.com"],
  ERetailerIndustry: ["fashion"],
  ERetailerShortID: ["jdspo", "nke", "str", "ss"],
  Gender: ["female", "unisex", "women's"],
  Hreflang: ["en-au", "en-us", "en-zz", "en-de", "en-es", "en-it", "en-nl"],
  RetailerCode: ["enau-jd-sports", "enau-nike", "enau-stylerunner", "enus-nike", "enus-ssense"],
  Type: ["product"],
};
