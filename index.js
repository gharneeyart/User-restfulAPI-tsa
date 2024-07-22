import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from "./src/db.config.js";
import userRoute from './src/route/user.js'
import productRoute from './src/route/product.js'
import cors from 'cors';
import session from 'express-session';
import passport from './src/helpers/google.config.js';
import authRoutes from './src/route/passport.js';

dotenv.config();

const app = express();
app.use(express.json());

let corsOptions = { 
    origin : ['http://localhost:5173', 'http://localhost:5174'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow cookies and credentials
} 
app.use(cors(corsOptions));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



const port = process.env.PORT
const dbUrl = process.env.MONGODB_URL 
console.log(dbUrl);

connectDb(dbUrl);


app.get('/', (req, res) =>{
    res.json({success: true, message: 'OK'});
})
app.use('/', authRoutes);
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/products", productRoute);
app.listen(port, (req, res) =>{
    console.log(`Beta-House Server listening on ${port}`);
});