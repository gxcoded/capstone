const Account = require("../model/account.model");
const Logs = require("../model/logs.model");

exports.searchAccount = async (req, res, callback) => {
  await Account.find({
    $or: [
      { firstName: { $regex: new RegExp(req.body.text, "i") } },
      { lastName: { $regex: new RegExp(req.body.text, "i") } },
    ],
    campus: req.body.campus,
  })
    .populate("role")
    .then((result) => {
      req.body.result = result;
    })
    .catch((err) => {
      req.body.result = [];
    });

  await callback();
};

exports.searchContacts = async (req, res, callback) => {
  // let data = [];
  // const range = req.body.range;
  const id = req.body.id;

  await Logs.find({ $or: [{ accountScanned: id }, { scannedBy: id }] })
    .populate("room")
    .populate("scannedBy")
    .then((result) => {
      console.log(result);
      req.body.contacts = result;
      // result.forEach((r) => {
      //   Number(r.date) >= Number(range) && data.push(r);
      // });

      // req.body.contacts = data;
    })
    .catch((err) => {
      console.log(err);
      req.body.contacts = [];
    });

  await callback();
};

exports.possibleInteractions = async (req, res, callback) => {
  const date = Number(req.body.currentDate);
  let array = [];
  const limit = date + 86400000;
  const campus = req.body.campus;
  // console.log(date);
  // console.log(limit);

  await Logs.find({ campus })
    .populate("accountScanned")
    .populate("scannedBy")
    .populate("room")
    .then((result) => {
      result.forEach((data) => {
        if (Number(data.date) >= date && Number(data.date) <= limit) {
          array.push(data);
        }
      });
      req.body.result = array;
    })
    .catch((err) => {
      req.body.result = array;
    });
  await callback();
};

exports.wideRangeInteractions = async (req, res, callback) => {
  // const limit = date + 86400000;

  console.log(req.body);

  const starting = Number(req.body.starting);
  const ending = Number(req.body.ending);
  let array = [];
  const campus = req.body.campus;
  // console.log(date);
  // console.log(limit);

  await Logs.find({ campus })
    .populate("accountScanned")
    .populate("scannedBy")
    .populate("room")
    .then((result) => {
      // console.log(result);

      result.forEach((data) => {
        if (Number(data.date) >= ending && Number(data.date) <= starting) {
          array.push(data);
        }
      });
      req.body.result = array;
    })
    .catch((err) => {
      req.body.result = array;
    });
  await callback();
};
// 1140
// 1000
