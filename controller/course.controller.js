const Course = require("../model/course.model");

exports.addCourse = async (req, res, next) => {
  const course = {
    campus: req.body.campus,
    description: req.body.description,
  };

  const newCourse = new Course(course);

  await newCourse
    .save()
    .then((c) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });

  await next();
};

exports.getCourse = async (req, res, callback) => {
  const campus = req.body.campus;

  await Course.find({ campus })
    .sort({ description: 1 })
    .then((course) => {
      req.body.course = course;
    })
    .catch((err) => {
      req.body.course = [];
    });

  await callback();
};

exports.updateCourseStatus = async (req, res, callback) => {
  const _id = req.body.id;
  const isOpen = req.body.isOpen;

  await Course.updateOne({ _id }, { $set: { isOpen: isOpen } })
    .then((course) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};
