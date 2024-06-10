import { Model, Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  icType: {
    type: String,
    required: false,
  },
  icNumber: {
    type: String,
  },
  phone: {
    type: Number,
  },
  birth: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel: Model<any> = model("users", UserSchema);

export default UserModel;
