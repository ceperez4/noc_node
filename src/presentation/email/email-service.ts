import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugin'

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];
}
interface Attachments{
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
        tls:{
            rejectUnauthorized: false,
        },
    });

    constructor(){}

    /********************************************************* */
    /********************************************************* */
    async sendEmail(options: SendMailOptions): Promise<boolean> {
        
        const { to, subject, htmlBody,attachments=[] } = options;

        try {
   
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachments
            })
              
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }

    }

    /********************************************************* */
    /********************************************************* */
    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        `;
        const attachments: Attachments[]= [
            {filename:'logs-all.log',path:'./logs/logs-all.log'},
            {filename:'logs-high.log',path:'./logs/logs-high.log'},
            {filename:'logs-medium.log',path:'./logs/logs-medium.log'},
        ]
        return await this.sendEmail({
            to,
            htmlBody,
            subject,
            attachments
        })
    }

}