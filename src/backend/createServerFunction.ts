import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import { dicesRouter } from '../dices/infrastructure/routes/Routes';
import express from 'express';
import { auth } from './middleware/auth';


let createServerFunction = () =>{

    const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/', dicesRouter);
//app.use('/play', auth, dicesRouter)

return app
}

export default createServerFunction;