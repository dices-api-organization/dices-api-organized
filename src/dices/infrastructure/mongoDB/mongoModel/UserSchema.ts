import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

export const UserModel = model('User', userSchema, 'users');