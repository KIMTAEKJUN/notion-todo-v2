import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  notion: {
    apiKey: process.env.NOTION_API_KEY!,
    databaseId: process.env.NOTION_DATABASE_ID!,
  },
  slack: {
    token: process.env.SLACK_TOKEN!,
    channel: process.env.SLACK_CHANNEL || "#todo-notifications",
  },
}));
