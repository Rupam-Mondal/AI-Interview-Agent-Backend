import express from 'express';
import { ConnectDb } from './Config/Dbconfig.js';
import UserRouter from './Routes/UserRouter.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/ping' , (req , res) => {
    return res.json({
        success:true,
        message:"Ping"
    });
});

app.use('/user', UserRouter);

app.listen(3000 , () => {
    console.log("Server is Running");
    ConnectDb();
});