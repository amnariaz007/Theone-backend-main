const express = require("express");
const { getAirdrop, CreateAirdrop, getAirdropByWallet, getAirdropById, updateAirdropById } = require("../../Controllers/Airdrop.Controllers");
const router = express.Router();

// sign up routes
router.route('/').get(getAirdrop).post(CreateAirdrop)
router.route('/user/:wallet').get(getAirdropByWallet)
router.route('/:id').get(getAirdropById).patch(updateAirdropById)

module.exports = router;
