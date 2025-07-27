const adminAuth = (req, res, next) => {
  console.log("Admin auth getting checked");
  const token = "xyz";
  const isAdminAutorized = token == "xyz";

  if (!isAdminAutorized) {
    res.send(401).send("Unautorized User");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
