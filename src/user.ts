import { Schema, Document, model } from "mongoose";
import Task from "./task";

interface IUser extends Document {
  name: string;
  email: string;
  tasks: {
    id: string;
    name: string;
    description: string;
    createDate: string;
    dueDate: string;
    tags: string[];
  }[];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tasks: [
    {
      id: String,
      name: String,
      description: String,
      createDate: String,
      dueDate: String,
      tags: [String],
    },
  ],
});

export const User = model<IUser>("user", UserSchema);
