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

exports.checkUntracedCase = async (req, res, callback) => {
  const report = `${req.body.report}`;

  await Cases.findOne({ report })
    .then((result) => {
      if (result.dateTraced !== null) {
        req.body.traced = true;
      } else {
        req.body.traced = false;
      }
    })
    .catch((err) => {
      // console.log(err);
      req.body.traced = false;
    });
  await callback();
};

exports.getAllUntracedCase = async (req, res, callback) => {
  const campus = req.body.campus;

  await Cases.find({ campus, dateTraced: null })
    .then((result) => {
      console.log(result);
      req.body.cases = result;
    })
    .catch((err) => {
      console.log(err);
      req.body.cases = [];
    });

  await callback();
};

exports.caseUpdater = async (req, res, callback) => {
  console.log(req.body);
  let dateTraced = null;
  req.body.updated = false;

  const report = req.body.id;
  const isSet = req.body.status;

  if (isSet) {
    dateTraced = Date.now().toString();
    console.log(dateTraced);
  }

  await Cases.updateOne({ report }, { $set: { dateTraced: dateTraced } })
    .then((updated) => {
      console.log(updated);
      req.body.updated = true;
    })
    .catch((err) => {
      console.log(err);
    });

  await callback();
};
