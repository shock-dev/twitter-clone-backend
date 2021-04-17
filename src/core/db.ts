import mongoose from 'mongoose';
import consola from 'consola';

const connectDb = async (): Promise<void> => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };
    await mongoose.connect(process.env.MONGO_URL, options);
  } catch (e) {
    consola.error(e);
  }
};

export default connectDb;
