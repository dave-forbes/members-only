import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required:true, maxLength: 100 },
  lastName: { type: String, required:true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100, unique: true, index: true, lowercase: true },
  password: { type: String, required:true, maxLength: 100 },
  membership: {type: String, enum: ["member", "admin", "non-member"]},
});

UserSchema.virtual("full-name").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", UserSchema);

export default User;