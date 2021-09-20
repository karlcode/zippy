import React, { Suspense } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import shoey from "../assets/images/nike-pegasus.png";
import CardGrid from "../components/CardGrid";
import { ProductListData } from "../ProductListInterface";
import { MetaMeta } from "../SearchResultsInterface";

export default {
  title: "Components/CardGrid",
  component: CardGrid,
} as ComponentMeta<typeof CardGrid>;

const mockObject: Omit<ProductListData, "id"> = {
  productTitle: "Nike Pegasus Trail 2 GORE-TEX",
  productPrice: 170,
  productCurrency: 1,
  productImagePath: shoey,
  retailerUrl: "www.nike.com",
  retailerName: "www.nike.com",
};
const mockData = [...Array(16)].map(() => ({
  ...mockObject,
  id: Math.random().toString(),
}));

const LazyLoadedCardGrid = (props: any) => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <CardGrid {...props} />;
    </Suspense>
  );
};

const mockMeta: MetaMeta = { pageSize: 20, response_type: "", total: 120 };

const Template: ComponentStory<typeof CardGrid> = (args) => <LazyLoadedCardGrid {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: { read: () => mockData },
  meta: mockMeta,
};
