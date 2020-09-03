import { Request, Response, Router, NextFunction } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument  from '../../swagger.json';
class IndexRoutes {

    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
        if ( process.env.NODE_ENV !== 'production') {
            this.swaggerUiSetUp();
        }
    }

    routes() {
        this.router.get('/', (req: Request, res: Response, next: NextFunction ) => {
            console.log('process.env.NODE_ENV', process.env.NODE_ENV)
            if ( process.env.NODE_ENV == 'production') {
                res.status(403).send(`
                <h1>Forbidden</h1>
                <p>You don't have permission to access / on this server.</p>
                `);
                
            } else {
                res.redirect( '/api-docs');
            }

        });
    }

    private swaggerUiSetUp() {
        const options = {
            swaggerDefinition: swaggerDocument,
            apis: []
        };
        const specs = swaggerJsdoc(options);
        this.router.use('/api-docs', swaggerUi.serve);
        this.router.get(
        '/api-docs',
        swaggerUi.setup(specs, {
            explorer: true
        })
        );
    }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.router;