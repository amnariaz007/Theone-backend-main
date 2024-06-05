const { default: mongoose } = require("mongoose");
const launchPadCommentSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
    },
    name: {
      type: String,
    },
    launchPadId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    replies: {
      type: [],
      default: [],
    },
    liked: {
      type: [],
      default: [],
    },
    disLiked: {
      type: [],
      default: [],
    },
  },
  { timestamps: true }
);

const LaunchPadComment = mongoose.model(
  "LaunchPadComment",
  launchPadCommentSchema
);
module.exports = LaunchPadComment;
