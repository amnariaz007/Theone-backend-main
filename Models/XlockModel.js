const { default: mongoose } = require("mongoose");

const xlockSchema = new mongoose.Schema(
  {
    anotherOwner: {
      type: Boolean,
      default: false,
    },
    vestingContributor: {
      type: Boolean,
      default: false,
    },
    wallet: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    ownerAddress: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    tgePercent: {
      type: Number,
    },
    cycleRelease: {
      type: Number,
    },
    cycleDays: {
      type: Number,
    },
    lockTime: {
      type: Date,
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
  },
  { timestamps: true }
);

const Xlock = mongoose.model("Xlock", xlockSchema);
module.exports = Xlock;
