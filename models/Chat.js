import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  type: { type: String, enum: ["private", "group"], default: "private" },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
}, { timestamps: true });

ChatSchema.index({ users: 1 });

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);