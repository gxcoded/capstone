const Account = require("../model/account.model");
const bcrypt = require("bcrypt");

exports.login = async (req, res, callback) => {
  const username = req.body.username;
  const password = req.body.password;

  await Account.findOne({ username: username, verified: true }).then(
    async (result) => {
      if (result !== null) {
        if (await bcrypt.compare(password, result.password)) {
          req.body.data = result;
        } else {
          req.body.data = {};
        }
      } else {
        req.body.data = {};
      }

      await callback();
    }
  );
};
