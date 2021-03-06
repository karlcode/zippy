import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Hero } from "../components/Hero";

export default {
  title: "Components/Hero",
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const Default = Template.bind({});
