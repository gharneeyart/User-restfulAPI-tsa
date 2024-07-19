import mongoose from 'mongoose';

export const connectDb = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,  // Useful for schema indexing in MongoDB
        useFindAndModify: false  // To prevent deprecation warnings for findAndModify()
    })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);  // Exit the process with a failure code
    });
};
