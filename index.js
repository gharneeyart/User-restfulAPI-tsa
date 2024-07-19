import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from "./src/db.config.js";
import userRoute from './src/route/user.js'
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());

let corsOptions = { 
    origin : ['http://localhost:5173', 'http://localhost:5174', 'https://fragrance-hub-eight.vercel.app'], 
} 
app.use(cors(corsOptions));

const port = process.env.PORT
const dbUrl = process.env.MONGODB_URL 
console.log(dbUrl);

connectDb(dbUrl);


app.get('/', (req, res) =>{
    res.json({success: true, message: 'OK'});
})

app.use("/api/v1/auth", userRoute);
app.listen(port, (req, res) =>{
    console.log(`Beta-House Server listening on ${port}`);
});