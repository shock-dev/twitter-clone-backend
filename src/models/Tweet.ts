import { model, Schema } from 'mongoose';

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxlength: 280
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default model('Tweet', tweetSchema);
