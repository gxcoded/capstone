const Negative = require("../model/negative.model");

exports.manualNegative = async (image, body) => {
  let success = false;

  const newReport = {
    campus: body.campus,
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

exports.reportNegative = async (image, body) => {
  let success = false;

  const newReport = {
    campus: body.campus,
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

exports.getAllNegativeReports = async (req, res, callback) => {
  const campus = req.body.campus;

  await Negative.find({ campus })
    .sort({ dateSent: -1 })
    .populate("accountOwner")
    .then((report) => {
      console.log("reports");
      req.body.report = report;
    })
    .catch((err) => {
      req.body.report = [];
    });

  await callback();
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

exports.getProofDetails = async (req, res, callback) => {
  const _id = req.body.id;

  // const reply = req.body.reply;
  // const replyDate = Date.now().toString();

  await Negative.find({ _id })
    .sort({ dateSent: -1 })
    .populate("testType")
    .then((result) => {
      req.body.result = result;
    })
    .catch((err) => {
      req.body.result = [];
    });

  await callback();
};

exports.updateReportStatus = async (req, res, callback) => {
  req.body.updated = false;

  const _id = req.body.id;
  const now = Date.now().toString();

  await Negative.updateOne(
    { _id },
    { $set: { replyDate: now, seen: true } }
  ).then((update) => {
    req.body.updated = true;
  });

  callback();
};

exports.getUnAddressedReport = async (req, res, callback) => {
  const campus = req.body.campus;

  await Negative.find({ campus, replyDate: null })
    .sort({ dateSent: -1 })
    .populate("testType")
    .then((result) => {
      req.body.result = result;
    })
    .catch((err) => {
      req.body.result = [];
    });

  callback();
};
