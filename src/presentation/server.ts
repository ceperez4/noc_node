import { envs } from "../config/plugins/env.plugin";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const MongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const PostgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log('Server started...')
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute('emailexample@gmail.com')


        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckServiceMultiple(
                    [fsLogRepository, MongoLogRepository, PostgresLogRepository],
                    () => { console.log('success') },
                    (error) => { console.log(error) }
                ).execute('https://google.com')
            }
        );

    }
}