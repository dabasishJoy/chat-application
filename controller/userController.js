const bcrypt = require("bcrypt");
const User = require("../models/people");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next();
  }
};

exports.removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    // remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
};

exports.addUser = async (req, res, next) => {
  let newUser;

  //   hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  //create an object to add in db

  // if file exist
  if (req.files && req.files.length > 0) {
    // create object with file
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  //   save in db

  try {
    const result = await newUser.save();
    res.status(200).json({ message: "User added Successfully" });
  } catch (err) {
    res.status(500).json({
      errors: {
        coommon: {
          message: "Unknown Error",
        },
      },
    });
  }
};
