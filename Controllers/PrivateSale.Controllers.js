const axios = require('axios');
const PrivateSale = require('../Models/PrivateSaleModel');
module.exports.CreatePrivateSale = async (req, res) => {
  try {
    const data = req.body;
   const isExist = await PrivateSale.findOne({title: data?.title})
   console.log(isExist)
   if(isExist){
    res.status(200).json({
      status: false,
      message: "This token is already exist!!",
    });
   }else{
    const result = await PrivateSale.create(data)
    if (result) {
      res.status(200).json({
        status: true,
        message: "Private Sale created successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to create Private Sale!",
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

module.exports.getPrivateSale = async (req, res) => {
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
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result = await PrivateSale.find(query).sort(sortOption);
    } else {
      result = await PrivateSale.find({ ...query, status: "approved" }).sort(sortOption);
    }

    if (result) {
      res.status(200).json({
        status: true,
        message: "PrivateSales fetched successfully!",
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




module.exports.getPrivateSaleByWallet = async (req, res) => {
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
    const result = await PrivateSale.find({wallet: wallet, ...query}).sort(sortOption)
    if (result) {
      res.status(200).json({
        status: true,
        message: "PrivateSale fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch PrivateSale!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getPrivateSaleById = async (req, res) => {
  try {
    const id = req.params.id
    const result = await PrivateSale.findById(id)
    if (result) {
      res.status(200).json({
        status: true,
        message: "PrivateSale fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch PrivateSale!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.updatePrivateSaleById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await PrivateSale.findByIdAndUpdate(id, data);
    if (result) {
      res.status(200).json({
        status: true,
        message: "PrivateSale updated successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to update PrivateSale!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};