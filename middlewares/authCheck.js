const jwt = require("jsonwebtoken");
const { appSecret } = require("../config/config");
const { handleError } = require("../utils/requestHandlers");
const { isUserExists, get : getUser } = require("../dbServices/user");
const appURI = "/api";
const skipUrls = [
  "/auth/register",
  "/auth/send-verification-otp",
  "/auth/login",
  "/auth/forgot-password",
  "/users/social-login",
  "/auth/reset-password",
  "/mvr/save"
];

exports.isAuthenticated = async function (req, res, next) {
  const url = req.url.replace(appURI, "").split("?")[0];
  let token = req.headers["authorization"];
  if (skipUrls.indexOf(url) != -1) return next();
  try {
    let { userId,salt } = await jwt.verify(token, appSecret);
    let user = await getUser(userId);
    if (!user) throw "Invalid token,No user exists";
    if(user.salt!==salt) throw 'Invalid token,No user exists';
    req.user = user;
    next();
  } catch (err) {
    handleError({ res, err, statusCode: 401 });
  }
};
