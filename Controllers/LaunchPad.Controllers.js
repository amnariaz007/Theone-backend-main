const FairLaunch = require("../Models/FairLaunchModel");
const LaunchPad = require("../Models/LaunchpadModel");
const axios = require("axios");
const PrivateSale = require("../Models/PrivateSaleModel");
module.exports.CreateLaunchPad = async (req, res) => {
  try {
    const data = req.body;
    const isExist = await LaunchPad.findOne({ token: data.token });
    if (isExist) {
      res.status(200).json({
        status: false,
        message: "This token is already exist!!",
      });
    } else {
      const result = await LaunchPad.create(data);
      if (result) {
        res.status(200).json({
          status: true,
          message: "LaunchPad created successfully!",
          data: result,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Failed to create Launchpad!",
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




module.exports.getPads = async (req, res) => {
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
    let result1;
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result1 = await LaunchPad.find(query).sort(sortOption);
    } else {
      result1 = await LaunchPad.find({...query, status: "approved" }).sort(sortOption);
    }
    let result2;
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result2 = await FairLaunch.find(query).sort(sortOption);
    } else {
      result2 = await FairLaunch.find({...query, status: "approved" }).sort(sortOption);
    }
    let result3;
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result3 = await PrivateSale.find(query).sort(sortOption);
    } else {
      result3 = await PrivateSale.find({ ...query,status: "approved" }).sort(sortOption);
    }

    const result = [...result1, ...result2, ...result3];
    if (result) {
      res.status(200).json({
        status: true,
        message: "All data fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch All data!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getPadByWallet = async (req, res) => {
  try {
    const { filter, sortBy, wallet } = req.query;

    let query = {wallet: wallet};

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
    let result1;
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result1 = await LaunchPad.find(query).sort(sortOption);
    } else {
      result1 = await LaunchPad.find({...query, status: "approved", wallet: wallet }).sort(sortOption);
    }
    let result2;
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result2 = await FairLaunch.find(query).sort(sortOption);
    } else {
      result2 = await FairLaunch.find({...query, status: "approved", wallet: wallet }).sort(sortOption);
    }
    let result3;
    if (wallet && wallet === "0x000D09bCD4224CE847750B4C8cC8d4FbF39e33df") {
      result3 = await PrivateSale.find(query).sort(sortOption);
    } else {
      result3 = await PrivateSale.find({...query, status: "approved", wallet: wallet }).sort(sortOption);
    }

    const result = [...result1, ...result2, ...result3];
    if (result) {
      res.status(200).json({
        status: true,
        message: "All data fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch All data!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};



module.exports.getLaunchPad = async (req, res) => {
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
      result = await LaunchPad.find(query).sort(sortOption);
    } else {
      result = await LaunchPad.find({ ...query,status: "approved" }).sort(sortOption);
    }

    if (result) {
      res.status(200).json({
        status: true,
        message: "LaunchPads fetched successfully!",
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

module.exports.getLaunchPadByWallet = async (req, res) => {
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
    const result = await LaunchPad.find({ wallet: wallet, ...query }).sort(
      sortOption
    );
    if (result) {
      res.status(200).json({
        status: true,
        message: "LaunchPad fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch Launchpad!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getLaunchPadById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await LaunchPad.findById(id);
    if (result) {
      res.status(200).json({
        status: true,
        message: "LaunchPad fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch Launchpad!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getTokenInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(
      `https://rest.cryptoapis.io/blockchain-data/ethereum/sepolia/addresses/${id}/contract`,

      {
        headers: {
          "X-API-Key": "c33db022effbd60b1c70be64c4b80e658b12c752",
        },
      }
      
      // `https://cronos.org/explorer/api?module=token&action=getToken&contractaddress=${id} `,
      // {
      //   headers: {
      //     "X-API-Key": "c33db022effbd60b1c70be64c4b80e658b12c752",
      //   },
      // }
    );
    if (response.status) {
      res.status(200).json({
        status: true,
        message: "Token info fetched successfully!",
        data: response.data,
      });
    } else {
      res.status(200).json({
        status: false,
        message: response.message,
        data: response.data,
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.updateLaunchPadById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await LaunchPad.findByIdAndUpdate(id, data);
    if (result) {
      res.status(200).json({
        status: true,
        message: "LaunchPad updated successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to update LaunchPad!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};
