import fs from "node:fs"
import path from "node:path"
import { FileSystemDataSource } from "./file-system.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"


describe('fileSystem Datasource', () => {

    const logPath = path.join(__dirname, '../../../logs')


    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    })

    test('should create log files if they do ot exist', () => {
        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
    })

    test('should save a log in logs-all.log', () =>{
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test',
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
    })

    test('should save a log in logs-all.log and medium', () =>{
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test',
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    })

    test('should save a log in logs-all.log and error', () =>{
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test',
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    })

  
})