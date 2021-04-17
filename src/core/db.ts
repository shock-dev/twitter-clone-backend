import mongoose from 'mongoose';
import consola from 'consola';

const connect = async (): Promise<void> => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };
    await mongoose.connect(process.env.MONGO_URL, options);
    consola.success('Connecting to mongo successfully');
  } catch (e) {
    consola.error(e);
    process.exit();
  }
};

export default connect;
