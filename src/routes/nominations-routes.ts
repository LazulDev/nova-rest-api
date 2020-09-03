import { Request, Response, Router, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import Nomination from '../models/nomination.model';
type ApiError = {
    message: string,
    code: string,
    stack?: string,
};
class NominationRoutes {

    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
        dotenv.config();
    }
    private async createNomination( req: Request, res: Response, next: NextFunction ) {
        const { candidate, details, referrer, involvementScore, overallTalentScore } = req.body;

        if ( overallTalentScore < 8 ) {
            try {
                // GMAIL transport config
                // {
                //     service: process.env.EMAIL_SERVICE || 'gmail',
                //     auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
                //     tls: {
                //         rejectUnauthorized: false
                //     }
                // }
                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE || 'gmail',
                    auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                
                let info = await transporter.sendMail({
                    from: `do-not-reply <${ process.env.EMAIL }>`, // sender address
                    to: `${referrer}, ${candidate}`, // list of receivers
                    subject: 'Nomination\'s info',
                    html: `
                    <h1>We are sorry to say that</h1>
                    <h3>Your nomination has been rejected</h3>
                    <p>The nominee overall score is not enough</p>
                    `,
                });
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                const error: ApiError = {
                    message: 'Not enough score',
                    code: '002'
                };
                res.status(405);
                res.json(error);
            } catch (error)  {
                const errorResponse: ApiError = {
                    message: 'An error has occurred while sending email',
                    code: '004',
                    stack: process.env.NODE_ENV === 'production' ? '👻' : error.stack,
                }
                res.status(500).json(errorResponse)
                next(error);
            }
        } else {
            try {
                const nominationToCreate = new Nomination({ candidate, details, referrer, involvementScore, overallTalentScore });
                const resp = await nominationToCreate.save()
                res.send(resp);
            } catch (error) {
                if (error.name === 'MongoError') {
                    const errorMesage: ApiError = {
                        message: error.message,
                        code: '001',
                        stack: process.env.NODE_ENV === 'production' ? '👻' : error.stack,
                    }
                    res.status(400);
                    res.json( errorMesage );
                } else {
                    next(error);
                }
            }

        }
    }

    private async getNominations(req: Request, res: Response ) {
        const nominations = await Nomination.find();
        res.json(nominations);
    }

    private async deleteNominationByCandidate( req : Request, res: Response ) {
        console.log(req)
        const candidate = req.query['candidate'];
        console.log('candidate', candidate)
        if ( !candidate ) {
            const errorResponse: ApiError = {
                message: 'Candidate email is a mandatory query param',
                code: '003'
            }
            res.status(400)
            res.json(errorResponse)
        } else {
            const response = await Nomination.findOneAndDelete({candidate});
            if (response) {
                res.end();
            } else {
                const errorResponse: ApiError = {
                    message: 'Candidate not found in DB',
                    code: '003'
                }
                res.status(404)
                res.json(errorResponse);
            }
        }
    }


    routes() {
        this.router.post('', this.createNomination);
        this.router.get('/all', this.getNominations);
        this.router.delete('/', this.deleteNominationByCandidate);
    }

}

const nominationsRoutes = new NominationRoutes();
export default nominationsRoutes.router;