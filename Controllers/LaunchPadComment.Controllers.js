const axios = require("axios");
const LaunchPadComment = require("../Models/LaunchPadCommentModel");
module.exports.CreateLaunchPadComment = async (req, res) => {
  try {
    const data = req.body;
    const result = await LaunchPadComment.create(data);
    if (result) {
      res.status(200).json({
        status: true,
        message: "Commented successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to comment!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getLaunchPadComments = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await LaunchPadComment.find({ launchPadId: id });

    if (result) {
      res.status(200).json({
        status: true,
        message: "Comments fetched successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Failed to fetch Comments!",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.likeLaunchpadComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { wallet } = req.body;
    const comment = await LaunchPadComment.findById(id);

    if (!comment) {
      return res.status(404).json({
        status: false,
        message: "Comment not found!",
      });
    }

    if (!comment.liked.includes(wallet)) {
      comment.liked.push(wallet);

      // Remove wallet from disLiked array if it exists
      const index = comment.disLiked.indexOf(wallet);
      if (index !== -1) {
        comment.disLiked.splice(index, 1);
      }

      const result = await comment.save();

      res.status(200).json({
        status: true,
        message: "Comment liked successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "User has already liked this comment!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.dislikeLaunchpadComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { wallet } = req.body;
    const comment = await LaunchPadComment.findById(id);

    if (!comment) {
      return res.status(404).json({
        status: false,
        message: "Comment not found!",
      });
    }

    if (!comment.disLiked.includes(wallet)) {
      comment.disLiked.push(wallet);

      // Remove wallet from liked array if it exists
      const index = comment.liked.indexOf(wallet);
      if (index !== -1) {
        comment.liked.splice(index, 1);
      }

      const result = await comment.save();

      res.status(200).json({
        status: true,
        message: "Comment disliked successfully!",
        data: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "User has already disliked this comment!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
