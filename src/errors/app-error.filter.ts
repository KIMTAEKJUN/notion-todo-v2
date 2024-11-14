import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { AppError } from "./error";

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppErrorFilter.name);

  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.statusCode || 500;

    this.logger.error(`❌ Error ${status}\n메시지: ${exception.message}`);

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: "AppError",
      timestamp: new Date().toISOString(),
    });
  }
}
