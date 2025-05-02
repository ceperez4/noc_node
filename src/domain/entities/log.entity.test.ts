import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('LogEntity', () => {
    const mockLog = {
        message: 'hello world',
        level: LogSeverityLevel.high,
        origin: 'log.etity.test.ts'

    }

    test('shoudl create a LogEntity', () => {
    
        const log = new LogEntity(mockLog);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(mockLog.message);
        expect(log.level).toBe(mockLog.level);
        expect(log.origin).toBe(mockLog.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    })

    test('should create a LogEntity from json', () => {
        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2025-04-17T19:08:50.775Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe("low");
        expect(log.origin).toBe('check-service.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
    })

    test('should create a LogEntity from json', () => {
  
        const log = LogEntity.fromObject(mockLog);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(mockLog.message);
        expect(log.level).toBe(mockLog.level);
        expect(log.origin).toBe(mockLog.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    })

})