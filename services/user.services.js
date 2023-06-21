const db = require("../models/index");
const User = db.user

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email }
  });
  if (!user) {
    return false;
  }
  return user;
};

exports.findUserByNumber = async (phone_number) => {
  const user = await User.findOne({
    where: { phone_number }
  });
  if (!user) {
    return false;
  }
  return user;
};
