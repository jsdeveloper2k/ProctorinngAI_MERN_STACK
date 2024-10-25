import mongoose from "mongoose";

const uri = 'mongodb://localhost:27017/mydatabase'; // Define the URI as a string

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
