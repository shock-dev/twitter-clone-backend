import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    location: { type: String },
    password: { type: String, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    confirmed_hash: { type: String, required: true },
    about: { type: String },
    website: { type: String }
})

export default model("users", userSchema);
