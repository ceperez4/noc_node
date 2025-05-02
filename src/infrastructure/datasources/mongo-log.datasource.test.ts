import mongoose from "mongoose"
import { envs } from "../../config/plugins/env.plugin"
import { LogModel, MongoDataBase } from "../../data/mongo"
import { MongoLogDatasource } from "./mongo-log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"

describe('MongoLogDatasource', ()=>{

    beforeAll (async()=>{
        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL

        })
    })

    afterEach(async () =>{
        await LogModel.deleteMany();

    })
    afterAll(async ()=>{
        mongoose.connection.close();
    })
    
    const logDataSource = new MongoLogDatasource();
    
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'test message',
                origin: 'mongo-log.datasource.test.ts'
            })


    test('should get logs', async ()=>{

        await logDataSource.saveLog(log);
        const logs = await logDataSource.getLogs(LogSeverityLevel.low);

        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.low)
    })
})