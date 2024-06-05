const { default: mongoose } = require("mongoose");

const airdropSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    logo: {
      type: String,
      required: true,
    },
    wallet: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    socialMedia: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    tokenData: {
      type: {},
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: "airdrop",
    },
    tgePercent: {
      type: String,
      default: 0,
    },
    cycleRelease: {
      type: String,
      default: 0,
    },
    cycleSeconds: {
      type: String,
      default: 0,
    },
    allocations: {
      type: [],
      default: [],
    },
    canceled: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Airdrop = mongoose.model("Airdrop", airdropSchema);
module.exports = Airdrop;
