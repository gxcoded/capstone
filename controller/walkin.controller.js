const Account = require("../model/account.model");

exports.walkIns = async (req, res, callback) => {
  const campus = req.body.campus;
  const addedBy = req.body.addedBy;

  await Account.find({ campus: campus, addedBy: addedBy, verified: false })
    .sort({ _id: -1 })
    .then((result) => {
      if (result.length > 0) {
        req.body.walkIns = result;
      } else {
        req.body.walkIns = [];
      }
    })
    .catch((err) => {
      req.body.walkIns = [];
    });

  await callback();
};
