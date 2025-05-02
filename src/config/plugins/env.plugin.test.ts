import 'dotenv/config';
import { envs } from './env.plugin';


describe('envs.plugin.ts',()=>{

    test('should return env options', ()=>{

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'cris18enrique@gmail.com',
            MAILER_SECRET_KEY: 'ynufzpdgvskmwgau',
            PROD: false,
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://prueba_usr:prueba_passs@localhost:27017/',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'prueba_usr',
            MONGO_PASS: 'prueba_passs'
        })
    })

    test('should return error if not found env',async ()=>{
        jest.resetModules();
        process.env.PORT = 'ABC'
        try{
            await import('./env.plugin');
            expect(true).toBe(false)
        }catch(error){
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})

