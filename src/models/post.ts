import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true, maxLength: 500 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;