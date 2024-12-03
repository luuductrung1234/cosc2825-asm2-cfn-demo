const express = require("express");
const jwt = require("jsonwebtoken");

const authRoutes = express.Router();

// GET /callback
authRoutes.get("/callback", (req, res, next) => {
  if (!req.query.access_token) {
    return res.render("callback", {
      pageTitle: "Callback",
      path: "/",
    });
  }

  const decoded = jwt.decode(req.query.access_token);
  const exp = decoded.exp;
  res.cookie("jwt", req.query.access_token, {
    httpOnly: true,
    expires: new Date(exp * 1000),
  });
  res.redirect("/");
});

authRoutes.get("/logout", (req, res, next) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = authRoutes;
