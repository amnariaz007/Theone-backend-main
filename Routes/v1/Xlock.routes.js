const express = require("express");
const { getXlock, CreateXlock, getXlockByWallet, getXlockById, updateXlockById } = require("../../Controllers/Xlock.Controllers");
const router = express.Router();

// sign up routes
router.route('/').get(getXlock).post(CreateXlock)
router.route('/user/:wallet').get(getXlockByWallet)
router.route('/:id').get(getXlockById).patch(updateXlockById)

module.exports = router;
