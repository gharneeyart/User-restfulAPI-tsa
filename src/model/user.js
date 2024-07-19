import mongoose from 'mongoose'
const { Schema } = mongoose; 

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
          },
        lastName: {
            type: String,
            required: true,
            trim: true,
          },
        
          email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
          },
          password: {
            type: String,
            required: true,
          },
          image:{
            type: String
        },
        imagePublicId:{
            type: String
        },
          createdAt: {
            type: Date,
            default: Date.now,
          }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', userSchema)
