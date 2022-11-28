const Negative = require("../model/negative.model");

exports.reportNegative = async (image, body) => {
  let success = false;

  const newReport = {
    case: body.caseId,
    accountOwner: body.accountOwner,
    testType: body.testType,
    dateTested: body.dateTested,
    dateSent: body.dateSent,
    resultDate: body.resultDate,
    imgProof: image,
  };

  const newNegative = new Negative(newReport);

  await newNegative
    .save()
    .then(async (result) => {
      success = true;
    })
    .catch((err) => {
      console.log(err);
    });

  return success;
};

exports.getReports = async (req, res, callback) => {
  const accountOwner = req.body.accountOwner;

  await Negative.find({ accountOwner })
    .sort({ dateSent: -1 })
    .populate("accountOwner")
    .then((report) => {
      req.body.report = report;
    })
    .catch((err) => {
      req.body.report = [];
    });

  await callback();
};
