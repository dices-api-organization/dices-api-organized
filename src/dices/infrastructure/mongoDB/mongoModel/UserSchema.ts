import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  success_rate: { type: Number, required: false },
  games:[
    {dice_1: { type: Number, required: false }, dice_2: { type: Number, required: false }, winOrLose: { type: Boolean, required: false }}
  ]
});

export const UserModel = model('User', userSchema, 'users');
