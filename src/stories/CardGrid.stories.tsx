import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CardGrid } from '../components/CardGrid';

export default {
  title: 'Components/CardGrid',
  component: CardGrid,
} as ComponentMeta<typeof CardGrid>;

const Template: ComponentStory<typeof CardGrid> = (args) => <CardGrid {...args} />;

export const Default = Template.bind({});