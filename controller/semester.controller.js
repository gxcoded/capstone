const Semester = require("../model/semester.model");

exports.addSemester = async (req, res, callback) => {
  const semester = {
    description: req.body.description,
  };

  const newSemester = new Semester(semester);

  await newSemester
    .save()
    .then((result) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });
  await callback();
};

exports.getSemesters = async (req, res, callback) => {
  await Semester.find()
    .then((result) => {
      req.body.semesters = result;
    })
    .catch((err) => {
      req.body.semesters = [];
    });
  await callback();
};
