const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const launchPadSchema = new mongoose.Schema(
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
    listingOption: {
      type: String,
      required: true,
    },
    listingRate: {
      type: Number,
      required: true,
    },
    affiliateProgram: {
      type: Boolean,
      required: true,
    },
    presaleRate: {
      type: Number,
      required: true,
    },
    whitelist: {
      type: String,
      required: true,
    },
    refundType: {
      type: String,
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
    hardCap: {
      type: Number,
      required: true,
    },
    minBuyEth: {
      type: Number,
      required: true,
    },
    maxBuyEth: {
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
    vestingContributor: {
      type: Boolean,
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
    affiliateProgram: {
      type: Boolean,
    },
    affiliateValue: {
      type: Number,
    },
    vestingCycle: {
      type: Number,
      default: 0,
    },
    vestingPresale: {
      type: Number,
      default: 0,
    },
    vestingPresaleRelease: {
      type: Number,
      default: 0,
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
      default: "launchPad",
    },
  },
  { timestamps: true }
);

const LaunchPad = mongoose.model("LaunchPad", launchPadSchema);
module.exports = LaunchPad;
