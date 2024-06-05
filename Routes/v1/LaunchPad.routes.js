const express = require("express");
const {
  getLaunchPad,
  CreateLaunchPad,
  getLaunchPadById,
  getLaunchPadByWallet,
  getTokenInfo,
  updateLaunchPadById,
  getPads,
  getPadByWallet,
} = require("../../Controllers/LaunchPad.Controllers");
const router = express.Router();

// sign up routes
router.route("/").get(getLaunchPad).post(CreateLaunchPad);
router.route("/all").get(getPads);
router.route("/all/wallet").get(getPadByWallet);
router.route("/getTokenInfo/:id").get(getTokenInfo);
router.route("/user/:wallet").get(getLaunchPadByWallet);
router.route("/:id").get(getLaunchPadById).patch(updateLaunchPadById);

module.exports = router;
