const express = require("express");
const { getPrivateSale, CreatePrivateSale, getPrivateSaleByWallet, getPrivateSaleById, updatePrivateSaleById } = require("../../Controllers/PrivateSale.Controllers");
const router = express.Router();

// sign up routes
router.route('/').get(getPrivateSale).post(CreatePrivateSale)
router.route('/user/:wallet').get(getPrivateSaleByWallet)
router.route('/:id').get(getPrivateSaleById).patch(updatePrivateSaleById)

module.exports = router;
