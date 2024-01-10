import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PosgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(new PosgresLogDatasource());

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("server started......");

    // Mandar email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "mdavidrodriguez@unicesar.edu.co",
    //   "mdavidmontero6@gmail.com",
    // ]);

    // emailService.sendEmailWithFileSystemLogs([
    //   "mdavidrodriguez@unicesar.edu.co",
    //   "mdavidmontero6@gmail.com",
    // ]);
    // const logs = await LogRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, postgresLogRepository, mongoLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
      //   new CheckService().execute("http://localhost:3000");
    });
  }
}
