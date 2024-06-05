const express = require("express");
const {
  CreateLaunchPadComment,
  getLaunchPadComments,
  likeLaunchpadComment,
  dislikeLaunchpadComment,
} = require("../../Controllers/LaunchPadComment.Controllers");
const router = express.Router();

// sign up routes
router.route("/").post(CreateLaunchPadComment);
router.route("/launchPadComments/:id").get(getLaunchPadComments);
router.route("/liked/:id").patch(likeLaunchpadComment);
router.route("/disliked/:id").patch(dislikeLaunchpadComment);
// router.route("/:id").get(getFairLaunchById).patch(updateFairLaunchById);

module.exports = router;
