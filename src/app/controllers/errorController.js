const get404 = (req, res, next) => {
  res.status(404).render("error", {
    pageTitle: "Page Not Found",
    errorMessage: "Page Not Found!",
    path: "/404",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
  });
};

const get403 = (req, res, next) => {
  res.status(403).render("error", {
    pageTitle: "Forbidden",
    errorMessage: "You are not allow to access this page!",
    path: "/403",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
  });
};

const get400 = (req, res, next) => {
  res.status(400).render("error", {
    pageTitle: "Invalid Input",
    errorMessage: "Input is not valid!",
    path: "/400",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
  });
};

const get500 = (req, res, next) => {
  res.status(500).render("error", {
    pageTitle: "Internal Error",
    errorMessage: "Something went wrong! Please try again later.",
    path: "/500",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
  });
};

module.exports = { get404, get403, get400, get500 };
