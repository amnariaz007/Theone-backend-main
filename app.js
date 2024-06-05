const express = require("express");
const app = express();
const cors = require("cors");
const launchPadRoute = require("./Routes/v1/LaunchPad.routes");
const fairLaunchRoute = require("./Routes/v1/FairLaunch.routes");
const privateSaleRoute = require("./Routes/v1/PrivateSale.routes");
const airdropRoute = require("./Routes/v1/Airdrop.routes");
const xlockRoute = require("./Routes/v1/Xlock.routes");
const commentRoute = require("./Routes/v1/LaunchPadComment.routes");
//global middlewares
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: '*'
  
}));

// // Handle preflight requests
// app.options('*', cors());

// other routes
// user route
app.use("/api/v1/launchPad", launchPadRoute);
app.use("/api/v1/fairLaunch", fairLaunchRoute);
app.use("/api/v1/privateSale", privateSaleRoute);
app.use("/api/v1/airdrop", airdropRoute);
app.use("/api/v1/xlock", xlockRoute);
app.use("/api/v1/comments", commentRoute);
// root route
app.use("/", async (req, res) => {
  res.send("Route is working v2!");
});

module.exports = app;
