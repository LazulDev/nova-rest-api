import { Request, Response, Router } from 'express';

class IndexRoutes {

    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (req: Request, res: Response) => res.send( `
        <h1>Available Endpoints:</h1> 
        <ul type="circle" title="endpoints">
            <li>
                GET <a href="/api/v1/nomination/all">/nomination/all</a>
            </li>
            <li>
                POST <a href="/api/v1/nomination">/nomination</a>
            </li>
        </ul>
        ` ));
    }

}

const indexRoutes = new IndexRoutes();
// indexRoutes.routes();

export default indexRoutes.router;