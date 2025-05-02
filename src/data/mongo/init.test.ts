import mongoose from "mongoose";
import { MongoDataBase } from "./init";

describe('init.ts MongoDB', ()=>{

    afterAll(()=>{
        mongoose.connection.close();
    })
    test('should connect to MongoDB', async()=>{
        const conected = await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
            
        });
        expect(conected).toBe(true);
    })
    test('should throw an error', async ()=>{
        try{
            const conected = await MongoDataBase.connect({
                dbName:'test',
                mongoUrl:'test'
            });
            expect(true).toBe(false);
        }catch(error){

        }

    })
});