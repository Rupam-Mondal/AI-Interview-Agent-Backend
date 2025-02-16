import express from 'express';
import { ConnectDb } from './Config/Dbconfig.js';

const app = express();

app.get('/ping' , (req , res) => {
    return res.json({
        success:true,
        message:"Ping"
    });
});

app.listen(3000 , () => {
    console.log("Server is Running");
    ConnectDb();
});