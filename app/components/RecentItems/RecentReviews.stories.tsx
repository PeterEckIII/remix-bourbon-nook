import type { Meta, StoryObj } from "@storybook/react";

import RecentReviews from "./RecentReviews";

const meta: Meta<typeof RecentReviews> = {
  title: "Components/RecentItems/RecentReviews",
  component: RecentReviews,
};

export default meta;

type Story = StoryObj<typeof RecentReviews>;

export const Primary: Story = {
  args: {},
};
