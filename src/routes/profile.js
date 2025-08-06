const express = require("express");
const { userAuth } = require("../Middleware/auth");
const { validateEditProfile } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("Error" + err.message);
  }
});

// profileRouter.put("/profile/edit", userAuth, async (req, res) => {
//   try {
//     console.log("Edit profile body:", req.body);

//     const validationResult = validateEditProfile(req.body);
//     if (!validationResult.isValid) {
//       return res.status(400).json({ message: validationResult.message });
//     }

//     const loggedInUser = req.user;

//     Object.keys(req.body).forEach((key) => {
//       if (key !== "_id" && key !== "email" && key !== "password") {
//         loggedInUser[key] = req.body[key];
//       }
//     });

//     await loggedInUser.save();

//     res.json({
//       message: `${loggedInUser.firstName}, your profile updated successfully`,
//       data: loggedInUser,
//     });
//   } catch (err) {
//     console.error("Edit Profile Error:", err);
//     res.status(400).json({ message: err.message || "Something went wrong." });
//   }
// });

module.exports = profileRouter;
