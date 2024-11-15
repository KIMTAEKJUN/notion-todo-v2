import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3000;

  await app.listen(port);
  logger.log(`⚙️ Port configured to ${port}`);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
