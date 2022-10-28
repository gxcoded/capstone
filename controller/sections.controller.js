const Section = require("../model/sections.model");

exports.addSections = async (req, res, callback) => {
  const section = {
    yearLevel: req.body.yearLevel,
    description: req.body.description,
  };

  const newSection = new Section(section);

  await newSection
    .save()
    .then((result) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });
  await callback();
};

exports.getSections = async (req, res, callback) => {
  const yearLevel = req.body.yearLevel;
  await Section.find({ yearLevel })
    .then((result) => {
      req.body.sections = result;
    })
    .catch((err) => {
      req.body.sections = [];
    });
  await callback();
};
