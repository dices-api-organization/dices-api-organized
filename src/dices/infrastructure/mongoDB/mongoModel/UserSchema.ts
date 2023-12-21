import { Document, Schema, model } from 'mongoose';

export interface userSchemaInterface extends Document {
  name: string;
  password: string;
  success_rate?: number;
  games?: [{dice_1:number,dice_2:number,winOrLose:boolean,}],
  num_of_games: number,
  num_of_wins: number
}

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  success_rate: { type: Number, required: false, default: 0 },
  games:[
    {dice_1: { type: Number, required: false }, dice_2: { type: Number, required: false }, winOrLose: { type: Boolean, required: false }}
  ],
  num_of_games: { type: Number, default: 0 },
  num_of_wins: { type: Number, default: 0 }
});

export const UserModel = model<userSchemaInterface>('User', userSchema, 'users');
