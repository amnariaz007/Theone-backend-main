const axios = require('axios');
const FairLaunch = require('../Models/FairLaunchModel');
module.exports.CreateFairLaunch = async (req, res) => {
  try {
    const data = req.body;
   const isExist = await FairLaunch.findOne({token: data.token})
   if(isExist){
    res.status(200).json({
      status: false,
      message: "This token is already exist!!",
    });
   }else{
    const result = await FairLaunch.create(data)
    if (result) {
      res.status(200).json({
        status: true,
        message: "FairLaunch created successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to create FairLaunch!",
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

module.exports.getFairLaunch = async (req, res) => {
  try {
    const { filter, sortBy, wallet } = req.query;

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

    let result;
    
      result = await FairLaunch.find(query).sort(sortOption);
    
    if (result) {
      res.status(200).json({
        status: true,
        message: "FairLaunchs fetched successfully!",
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




module.exports.getFairLaunchByWallet = async (req, res) => {
  try {
    const wallet = req.params.wallet
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
    const result = await FairLaunch.find({wallet: wallet, ...query}).sort(sortOption)
    if (result) {
      res.status(200).json({
        status: true,
        message: "FairLaunch fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch FairLaunch!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getFairLaunchById = async (req, res) => {
  try {
    const id = req.params.id
    const result = await FairLaunch.findById(id)
    if (result) {
      res.status(200).json({
        status: true,
        message: "FairLaunch fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch FairLaunch!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.updateFairLaunchById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await FairLaunch.findByIdAndUpdate(id, data);
    if (result) {
      res.status(200).json({
        status: true,
        message: "FairLaunch updated successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to update FairLaunch!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};