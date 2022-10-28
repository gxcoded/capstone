const YearLevel = require("../model/yearLevel.model");

exports.addYearLevel = async (req, res, callback) => {
  const yearLevel = {
    description: req.body.description,
  };

  const newYearLevel = new YearLevel(yearLevel);

  await newYearLevel
    .save()
    .then((result) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });
  await callback();
};

exports.getYearLevels = async (req, res, callback) => {
  await YearLevel.find()
    .then((result) => {
      req.body.yearLevels = result;
    })
    .catch((err) => {
      req.body.yearLevels = [];
    });
  await callback();
};
