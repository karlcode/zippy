import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CardGrid } from "../components/CardGrid";

import shoey from "../assets/images/nike-pegasus.png";
import {ProductListData} from "../App";

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

const Template: ComponentStory<typeof CardGrid> = (args) => <CardGrid {...args} data={mockData} />;

export const Default = Template.bind({});
