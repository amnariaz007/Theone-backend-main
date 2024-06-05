const { default: mongoose } = require("mongoose");

const privateSaleSchema = new mongoose.Schema(
  {
    whitelist: {
      type: String,
    },
    currency: {
      type: String,
      required: true,
    },
    wallet: {
      type: String,
      required: true,
    },
    whitelist: {
      type: String,
      required: true,
    },
    fundRelease: {
      type: Number,
      required: true,
    },
    fundPeriod: {
      type: Number,
      required: true,
    },
    fundPeriod2: {
      type: Number,
      required: true,
    },
    softCap: {
      type: Number,
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
    title: {
      type: String,
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
      default: "privateSale",
    },
  },
  { timestamps: true }
);

const PrivateSale = mongoose.model("PrivateSale", privateSaleSchema);
module.exports = PrivateSale;
