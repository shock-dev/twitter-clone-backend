import { model, Schema } from 'mongoose';

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default model('Tweet', tweetSchema);
