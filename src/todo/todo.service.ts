import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { NotionService } from "../notion/notion.service";
import { SlackService } from "../slack/slack.service";
import { handleError } from "../errors/error";
import { getDateStr, getLastWorkday, isWeekend } from "../utils/date";

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    private readonly notionService: NotionService,
    private readonly slackService: SlackService,
  ) {}

  @Cron("30 8 * * 1-5")
  async runDailyTodo(): Promise<void> {
    if (isWeekend()) {
      this.logger.log("🛏️ 주말에는 실행하지 않습니다.");
      return;
    }

    try {
      const lastWorkday = getLastWorkday();
      const todayDateStr = getDateStr();
      const lastWorkdayStr = getDateStr(lastWorkday);

      const { pendingTodos, inProgressTodos } = await this.notionService.getYesterdayUncompletedTodos();

      const formatTodos = (todos: string[]) => todos.map((todo, i) => `  ${i + 1}. ${todo}`).join("\n");

      this.logger.log(`🚀 진행 전 작업 개수: ${pendingTodos.length}`);
      this.logger.log(`🚀 진행 전 작업:\n${formatTodos(pendingTodos)}`);
      this.logger.log(`📝 진행 중인 작업 개수: ${inProgressTodos.length}`);
      this.logger.log(`📝 진행 중인 작업:\n${formatTodos(inProgressTodos)}`);

      await this.notionService.createDailyTodo();

      await this.slackService.sendNotification({
        todayMessage: `📅 *금일 [${todayDateStr}]의 TODO가 생성되었습니다.*`,
        beforeDayMessage: `🛵 *전날 [${lastWorkdayStr}]의 미완료 항목이 이전되었습니다.*`,
        todos: {
          pendingTodos,
          inProgressTodos,
        },
      });

      this.logger.log("✅ 모든 작업이 완료되었습니다.");
    } catch (error) {
      this.logger.error("🚨 오류 발생:", error);
      handleError(error);
      throw error;
    }
  }
}
