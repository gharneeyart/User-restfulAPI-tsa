import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from "./src/db.config.js";
import userRoute from './src/route/user.js'
dotenv.config();

const app = express();
app.use(express.json());


const port = process.env.PORT
const dbUrl = process.env.MONGODB_URL 
console.log(dbUrl);

connectDb(dbUrl);


app.get('/', (req, res) =>{
    res.json({success: true, message: 'OK'});
})

app.use("/api/v1/auth", userRoute);
app.listen(port, (req, res) =>{
    console.log(`Fragrance Hub Server listening on ${port}`);
});