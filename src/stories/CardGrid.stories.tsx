import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CardGrid } from "../components/CardGrid";

export default {
  title: "Components/CardGrid",
  component: CardGrid,
} as ComponentMeta<typeof CardGrid>;

const Template: ComponentStory<typeof CardGrid> = (args) => <CardGrid {...args} data={[1, 2, 3]} />;

export const Default = Template.bind({});
