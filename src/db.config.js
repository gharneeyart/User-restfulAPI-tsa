import mongoose from 'mongoose'
//It will connect to the url 
export const connectDb = (url) => {
    mongoose.connect(url).then(()=> console.log("DB connected successfully")).catch((err)=>console.log("Error connecting to MongoDB",err.message));
};

