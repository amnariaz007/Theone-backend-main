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
   
    },
    wallet: {
      type: String,
   
    },
    freeOption: {
      type: String,
   
    },
    totalSellAmount: {
      type: Number,
   
    },
    liquidityLockup: {
      type: Number,
   
    },
    routerType: {
      type: String,
   
    },
    softCap: {
      type: Number,
   
    },
    maxOwner: {
      type: Number,
   
    },
    liquidity: {
      type: Number,
   
    },
    startDate: {
      type: Date,
   
    },
    endDate: {
      type: Date,
   
    },
    logo: {
      type: String,
   
    },
    website: {
      type: String,
   
    },
    socialSites: {
      type: [],
      default: [],
    },
    tokenInfo: {
      type: Object,
   
    },
    description: {
      type: String,
   
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
