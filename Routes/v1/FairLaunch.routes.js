const express = require("express");
const { getFairLaunch, CreateFairLaunch, getFairLaunchByWallet, getFairLaunchById, updateFairLaunchById  } = require("../../Controllers/FairLaunch.Controllers");
const router = express.Router();

// sign up routes

router.route('/').get(getFairLaunch).post(CreateFairLaunch)
router.route('/user/:wallet').get(getFairLaunchByWallet)

router.route('/:id').get(getFairLaunchById).patch(updateFairLaunchById)

module.exports = router;
