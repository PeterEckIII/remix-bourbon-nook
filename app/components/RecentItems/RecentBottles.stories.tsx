import type { Meta, StoryObj } from "@storybook/react";

import RecentBottles from "./RecentBottles";

const meta: Meta<typeof RecentBottles> = {
  title: "Components/RecentItems/RecentBottles",
  component: RecentBottles,
};

export default meta;

type Story = StoryObj<typeof RecentBottles>;

export const Primary: Story = {
  args: {},
};
