export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    message: string,
    level: LogSeverityLevel,
    origin: string,
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel; //Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, createdAt = new Date(), origin } = options
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    /************************************************************* */
    /************************************************************* */
    public static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json);
        if (!message) {
            throw new Error('Message is required')
        }
        if (!level) {
            throw new Error('Level is required')
        }
  
        const log = new LogEntity({
            message,
            level,
            createdAt: new Date(createdAt),
            origin
        })
        return log

    }

    /************************************************************* */
    /************************************************************* */
    public static fromObject = (object: {[key:string]: any}): LogEntity => {
        const { message, level, createdAt, origin } = object;
        if (!message) {
            throw new Error('Message is required')
        }
        if (!level) {
            throw new Error('Level is required')
        }

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        })
        return log

    }
}