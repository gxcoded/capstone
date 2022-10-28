const AcademicYear = require("../model/academicYear.model");

exports.addAcademicYear = async (req, res, callback) => {
  const academic = {
    campus: req.body.campus,
    description: req.body.description,
  };

  const newAcademic = new AcademicYear(academic);

  await newAcademic
    .save()
    .then((result) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });
  await callback();
};

exports.getAcademicYear = async (req, res, callback) => {
  await AcademicYear.find()
    .then((result) => {
      req.body.academics = result;
    })
    .catch((err) => {
      req.body.academics = [];
    });
  await callback();
};
