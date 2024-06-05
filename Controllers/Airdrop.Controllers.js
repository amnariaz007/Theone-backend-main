const axios = require("axios");
const Airdrop = require("../Models/AirdropModel");
module.exports.CreateAirdrop = async (req, res) => {
  try {
    const data = req.body;
    const isExist = await Airdrop.findOne({ token: data?.token });
    if (isExist) {
      res.status(200).json({
        status: false,
        message: "This token is already exist!!",
      });
    } else {
      const result = await Airdrop.create(data);
      if (result) {
        res.status(200).json({
          status: true,
          message: "airdrop created successfully!",
          data: result,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to create airdrop!",
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getAirdrop = async (req, res) => {
  try {
    const { wallet } = req.query;
    let query = {};
    let sortOption = "-createdAt";
    let result;
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result = await Airdrop.find(query).sort(sortOption);
    } else {
      result = await Airdrop.find({ status: "approved" }).sort(sortOption);
    }

    if (result) {
      res.status(200).json({
        status: true,
        message: "Airdrops fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch Launchpads!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getAirdropByWallet = async (req, res) => {
  try {
    const wallet = req.params.wallet;

    let query = {};
    let sortOption = "-createdAt";
    let result;
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result = await Airdrop.find({ wallet: wallet, ...query }).sort(
        sortOption
      );
    } else {
      result = await Airdrop.find({wallet: wallet, status: "approved" }).sort(sortOption);
    }
    if (result) {
      res.status(200).json({
        status: true,
        message: "Airdrop fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch Airdrop!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getAirdropById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Airdrop.findById(id);
    if (result) {
      res.status(200).json({
        status: true,
        message: "Airdrop fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch Airdrop!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.updateAirdropById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await Airdrop.findByIdAndUpdate(id, data);
    if (result) {
      res.status(200).json({
        status: true,
        message: "Airdrop updated successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to update Airdrop!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};
