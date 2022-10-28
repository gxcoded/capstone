const Account = require("../model/account.model");

exports.getStudents = async (req, res, callback) => {
  const role = "62cb91ba2c5804049b716d49";

  const campus = req.body.campus;
  await Account.find({ campus: campus, role: role })
    .sort({ course: 1, lastName: 1 })
    .populate("course")
    .populate("gender")
    .then((result) => {
      req.body.studentList = result;
    })
    .catch((err) => {
      req.body.studentList = [];
    });

  await callback();
};

exports.searchStudents = async (req, res, callback) => {
  const role = "62cb91ba2c5804049b716d49";
  const campus = req.body.campus;

  await Account.find({
    $or: [
      { idNumber: { $regex: new RegExp(req.body.keyword, "i") } },
      { lastName: { $regex: new RegExp(req.body.keyword, "i") } },
    ],
    campus: campus,
    role: role,
  })
    .sort({ course: 1, lastName: 1 })
    .populate("course")
    .populate("gender")
    .then((result) => {
      req.body.studentList = result;
    })
    .catch((err) => {
      req.body.studentList = [];
    });

  await callback();
};

exports.searchClassStudents = async (req, res, callback) => {
  const role = "62cb91ba2c5804049b716d49";
  const campus = req.body.campus;
  const course = req.body.course;

  await Account.find({
    $or: [
      { idNumber: { $regex: new RegExp(req.body.keyword, "i") } },
      { lastName: { $regex: new RegExp(req.body.keyword, "i") } },
    ],
    campus: campus,
    role: role,
    course,
  })
    .sort({ course: 1, lastName: 1 })
    .populate("course")
    .populate("gender")
    .then((result) => {
      req.body.studentList = result;
    })
    .catch((err) => {
      req.body.studentList = [];
    });

  await callback();
};

exports.getStudentsByCourse = async (req, res, callback) => {
  const role = "62cb91ba2c5804049b716d49";
  const campus = req.body.campus;
  const course = req.body.course;

  await Account.find({
    campus,
    role,
    course,
  })
    .sort({ lastName: 1 })
    .populate("course")
    .populate("gender")
    .then((result) => {
      req.body.studentList = result;
    })
    .catch((err) => {
      req.body.studentList = [];
    });

  await callback();
};
