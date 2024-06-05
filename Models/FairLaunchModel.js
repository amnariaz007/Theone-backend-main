const { default: mongoose } = require("mongoose");
const fairLaunchSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Please Provide a name"],
      trim: true,
    },
    currency: {
      type: String,
      required: true,
    },
    wallet: {
      type: String,
      required: true,
    },
    freeOption: {
      type: String,
      required: true,
    },
    totalSellAmount: {
      type: Number,
      required: true,
    },
    liquidityLockup: {
      type: Number,
      required: true,
    },
    routerType: {
      type: String,
      required: true,
    },
    softCap: {
      type: Number,
      required: true,
    },
    maxOwner: {
      type: Number,
      required: true,
    },
    liquidity: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    socialSites: {
      type: [],
      default: [],
    },
    tokenInfo: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    id: {
      type: String,
      default: "fairLaunch",
    },
  },
  { timestamps: true }
);

const FairLaunch = mongoose.model("FairLaunch", fairLaunchSchema);
module.exports = FairLaunch;