const Cases = require("../model/cases.model");

exports.getCases = async (req, res, callback) => {
  const campus = req.body.campus;

  await Cases.find({ campus })
    .then((result) => {
      req.body.cases = result;
    })
    .catch((err) => {
      console.log(err);
      req.body.cases = [];
    });
  await callback();
};
