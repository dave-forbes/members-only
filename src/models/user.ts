import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  member: string;
  fullName: string;
  url: string;
}

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  email: {
    type: String,
    required: true,
    maxLength: 100,
    unique: true,
    index: true,
    lowercase: true,
  },
  password: { type: String, required: true, maxLength: 100 },
  membership: { type: String, enum: ["member", "admin", "non-member"] },
});

UserSchema.virtual("fullName").get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual("url").get(function (this: IUser) {
  return `/profile/${this._id}`;
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
