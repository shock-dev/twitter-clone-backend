import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false
  },
  confirmed_hash: {
    type: String,
    required: true,
    select: false
  },
  location: { type: String },
  about: { type: String },
  website: { type: String }
});

export default model<IUser>('User', userSchema);
