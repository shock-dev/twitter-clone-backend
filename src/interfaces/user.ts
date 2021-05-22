import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string
  fullname: string
  username: string
  password: string
  confirmed: boolean
  confirmed_hash: string | boolean
  location?: string
  about?: string
  website?: string
}
