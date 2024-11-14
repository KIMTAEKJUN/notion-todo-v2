import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { NotionModule } from "../notion/notion.module";
import { SlackModule } from "../slack/slack.module";

@Module({
  imports: [NotionModule, SlackModule],
  providers: [TodoService],
})
export class TodoModule {}
