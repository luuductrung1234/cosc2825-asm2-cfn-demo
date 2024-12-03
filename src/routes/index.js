const adminRoutes = require("./adminRoute");
const shopRoutes = require("./shopRoute");
const errorRoutes = require("./errorRoute");
const authRoutes = require("./authRoute");

function route(app) {
  app.use("/admin", adminRoutes); // the path must start with "/admin"
  app.use(shopRoutes);
  app.use(authRoutes);
  app.use(errorRoutes);
}

module.exports = route;
