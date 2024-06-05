const axios = require("axios");
const Xlock = require("../Models/XlockModel");
module.exports.CreateXlock = async (req, res) => {
  try {
    const data = req.body;
    const isExist = await Xlock.findOne({ token: data?.token });
    if (isExist) {
      res.status(200).json({
        status: false,
        message: "This token is already exist!!",
      });
    } else {
      const result = await Xlock.create(data);
      if (result) {
        res.status(200).json({
          status: true,
          message: "Xlock created successfully!",
          data: result,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to create Xlock!",
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

module.exports.getXlock = async (req, res) => {
  try {
    const { wallet, page, limit } = req.query;

    let query = {};
    let sortOption = "-createdAt";
    let result;

    // Calculate pagination parameters
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result = await Xlock.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(pageSize);
    } else {
      result = await Xlock.find({ status: "approved" })
        .sort(sortOption)
        .skip(skip)
        .limit(pageSize);
    }
    const pageArray = [];
    for(let i=1; i<= pageNumber; i++){
      pageArray.push(i)
    }
    if (result) {
      res.status(200).json({
        status: true,
        message: "Xlocks fetched successfully!",
        data: result,
        page: pageNumber,
        limit: pageSize,
        pageArray: pageArray
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

module.exports.getXlockByWallet = async (req, res) => {
  try {
    const wallet = req.params.wallet;
    const { filter, sortBy } = req.query;

    let query = {};

    // Apply filter based on the query parameter
    if (filter && filter !== "all") {
      switch (filter) {
        case "upcoming":
          query.startDate = { $gt: new Date() };
          break;
        case "live":
          query.startDate = { $lte: new Date() };
          query.endDate = { $gte: new Date() };
          break;
        case "filled":
          query.softCap = { $eq: "$hardCap" };
          break;
        case "ended":
          query.endDate = { $lt: new Date() };
          break;
        default:
          break;
      }
    }

    let sortOption = "-createdAt";

    // Apply sorting based on the query parameter
    if (sortBy && sortBy !== "all") {
      switch (sortBy) {
        case "hardCap":
          sortOption = "-hardCap";
          break;
        case "softCap":
          sortOption = "softCap";
          break;
        case "startDate":
          sortOption = "-startDate";
          break;
        case "endDate":
          sortOption = "endDate";
          break;
        default:
          break;
      }
    }
    const result = await Xlock.find({ wallet: wallet, ...query }).sort(
      sortOption
    );
    if (result) {
      res.status(200).json({
        status: true,
        message: "Xlock fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch Xlock!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getXlockById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Xlock.findById(id);
    if (result) {
      res.status(200).json({
        status: true,
        message: "Xlock fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch Xlock!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};
module.exports.updateXlockById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await Xlock.findByIdAndUpdate(id, data);
    if (result) {
      res.status(200).json({
        status: true,
        message: "Xlock updated successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to update Xlock!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};
