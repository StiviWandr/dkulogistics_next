import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import router from './router/router.js';
dotenv.config();
import errorMiddleware from './middlewares/error-middleware.js';

const PORT = process.env.PORT || 8000;
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(cors({
    credentials: true,
    origin: process.env.APP_URL
}));
app.use("/", router)
app.use(errorMiddleware)
const start = async () => {
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            dbName: "dku",
            UseUnifiedTopology: true
        })
        app.listen(PORT, ()=>console.log(`App is listening on PORT: ${PORT}`))
    }catch(e){
        console.log(e);
    }
}
start()