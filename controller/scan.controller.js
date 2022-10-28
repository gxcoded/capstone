const Account = require("../model/account.model");
const WalkIn = require("../model/walkin.model");

exports.getScannedAccount = async (req, res, callback) => {
  const campus = req.body.campus;
  const key = req.body.key.text;

  await Account.findOne({ _id: key, campus: campus })
    .populate("role")
    .then((result) => {
      if (result !== null) {
        req.body.result = result;
      } else {
        req.body.result = {};
      }
    })
    .catch((err) => {
      req.body.result = {};
    });

  await callback();
};

exports.getManualAccount = async (req, res, callback) => {
  const campus = req.body.campus;
  const idNumber = req.body.idNumber;

  await Account.findOne({ campus: campus, username: idNumber })
    .populate("role")
    .then(async (result) => {
      if (result !== null) {
        req.body.result = result;
      } else {
        req.body.result = {};
      }
    })
    .catch((err) => {
      req.body.result = {};
    });

  await callback();
};
