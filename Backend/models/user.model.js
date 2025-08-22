import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  education: String,
  degree: String,
  hobbies: [String],
  currentWorkplace: String
});

const User = model('User', userSchema);
export default User;
