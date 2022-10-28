const Subject = require("../model/subject.model");

exports.addSubject = async (req, res, callback) => {
  if (req.body.currentId.length > 0) {
    await Subject.updateOne(
      { _id: req.body.currentId },
      {
        $set: {
          courseCode: req.body.courseCode,
          courseDescription: req.body.courseDescription,
        },
      }
    )
      .then((updated) => {
        req.body.saved = true;
      })
      .catch((err) => {
        req.body.saved = false;
      });
  } else {
    const subject = {
      campus: req.body.campus,
      // academic: req.body.academic,
      course: req.body.course,
      semester: req.body.semester,
      yearLevel: req.body.yearLevel,
      courseCode: req.body.courseCode,
      courseDescription: req.body.courseDescription,
    };

    const newSubject = new Subject(subject);

    await newSubject
      .save()
      .then((okay) => {
        req.body.saved = true;
      })
      .catch((err) => {
        req.body.saved = false;
      });
  }

  await callback();
};

exports.getSubjects = async (req, res, callback) => {
  await Subject.find({
    campus: req.body.campus,
    // academic: req.body.academic,
    course: req.body.course,
    semester: req.body.semester,
    yearLevel: req.body.yearLevel,
  })
    .sort({ courseCode: 1 })
    .then((result) => {
      if (result !== null) {
        req.body.subjects = result;
      } else {
        req.body.subjects = [];
      }
    })
    .catch((err) => {
      console.log(err);
      req.body.subjects = [];
    });
  await callback();
};

exports.deleteSubject = async (req, res, callback) => {
  const id = req.body.id;

  await Subject.deleteOne({ _id: id })
    .then((result) => {
      req.body.deleted = true;
    })
    .catch((err) => {
      req.body.deleted = false;
    });
  await callback();
};
