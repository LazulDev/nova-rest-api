import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
import indexRoutes from './routes/index-routes';
import nominationsRoutes from './routes/nominations-routes';

class Server {

    app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    
    private config() {
        // Mongoose config
        const MONGO_URI = 'mongodb://localhost/novarestapi';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
        .then( () => console.log('DB is connected...'));

        // Settings
        this.app.set( 'port', process.env.PORT || 3000 );
        // Middlewares
        this.app.use( morgan( 'tiny' ) );
        this.app.use( express.json() );
        this.app.use( express.urlencoded( {extended: false} ) );
        this.app.use( helmet() );
        this.app.use( compression() );
        this.app.use( cors() );
    }

    private routes() {
        this.app.use( indexRoutes );
        this.app.use('/api/v1/nomination', nominationsRoutes );
    }

    start(){
        this.app.listen(this.app.get('port'));
        console.log(`Server listening on port ${ this.app.get('port')}`);
    }

}

const server = new Server();
server.start();