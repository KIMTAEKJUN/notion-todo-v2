import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SlackModule } from "./slack/slack.module";
import { NotionModule } from "./notion/notion.module";

@Module({
  imports: [SlackModule, NotionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
