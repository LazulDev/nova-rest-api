import { Request, Response, Router, NextFunction } from 'express';
import nodemailer from 'nodemailer';

import Nomination from '../models/nomination.model';

class NominationRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    private async createNomination( req: Request, res: Response, next: NextFunction ) {
        // console.log('body', req.body);
        const { candidate, details, referrer, involvementScore, overallTalentScore } = req.body;
        if ( overallTalentScore < 8) {
            try {
                const { user, pass } = await nodemailer.createTestAccount();
                console.log({ user, pass });
                const transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: { user, pass },
                    tls: {
                        rejectUnauthorized: false
                    }
                }, );

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `do-not-reply <${user}>`, // sender address
                    to: "msanchez.telecom@gmail.com, mscarvajal93@gmail.com", // list of receivers
                    subject: "Hello ✔", // Subject line
                    // text: "Hello world?", // plain text body
                    html: "<b>Hello world?</b>", // html body
                });

                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
                res.status(405);
                res.json({ error: 'Not enough score'});
            } catch (error)  {
                console.error('Error al enviar email: ', error);
                next(error);
            }
        } else {
            try {
                const nominationToCreate = new Nomination({ candidate, details, referrer, involvementScore, overallTalentScore });
                const resp = await nominationToCreate.save()
                res.send(resp);
            } catch (error) {
                if (error.name === 'MongoError') {
                    res.status(400)
                    res.json({
                        message: error.message,
                        stack: process.env.NODE_ENV === 'production' ? '👻' : error.stack,
                    });
                } else {
                    next(error);
                }
            }

        }
    }

    private async getNominations(req: Request, res: Response ) {
        // const { page, limit } = req.query;
        // if (page && limit) {
            const nominations = await Nomination.find();
            // const nominations = await Nomination.find({page, limit});
            res.json(nominations);
        // } else {
        //     res.status(400)
        //         .json({
        //             error: 'Page and limit are mandatory request parameters'
        //         });
        // }
    }


    routes() {
        this.router.post('', this.createNomination);
        this.router.get('/all', this.getNominations);
    }

    async sendEmail() {
         }
}

const nominationsRoutes = new NominationRoutes();
export default nominationsRoutes.router;