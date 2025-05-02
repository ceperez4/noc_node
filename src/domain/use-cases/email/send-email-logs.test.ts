import { EmailService } from "../../../presentation/email/email-service"
import { LogEntity } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"
import { SendEmailLogs } from "./send-email-logs"

describe('sendEmail UseCase', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }
    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    beforeEach(()=>{
        jest.clearAllMocks();
    })
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );

    test('should call sedEmail and SaveLog', async () => {

        const result = await sendEmailLogs.execute('ceperez4.espe.edu.ec');
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(
            expect.any(LogEntity)
        )

        expect(mockLogRepository.saveLog).toBeCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email sent",
            "origin": "send-email-logs.ts",
        })
    })

    
    test('should log in case of error', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

        const result = await sendEmailLogs.execute('ceperez4.espe.edu.ec');
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(
            expect.any(LogEntity)
        )

        expect(mockLogRepository.saveLog).toBeCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-email-logs.ts",
        })
    })
})