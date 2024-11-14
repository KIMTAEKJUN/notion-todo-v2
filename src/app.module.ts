import config from "./config";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { TodoModule } from "./todo/todo.module";
import { ScheduleModule } from "@nestjs/schedule";
import { SlackModule } from "./slack/slack.module";
import { NotionModule } from "./notion/notion.module";
import { AppErrorFilter } from "./errors/app-error.filter";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    ScheduleModule.forRoot(),
    SlackModule,
    NotionModule,
    TodoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppErrorFilter,
    },
  ],
})
export class AppModule {}
