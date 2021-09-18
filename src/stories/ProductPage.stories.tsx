import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "../App";

export default {
  title: "Components/ProductPage",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;

export const Default = Template.bind({});
