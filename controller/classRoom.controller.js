const ClassRoom = require("../model/classRoom.model");

exports.getClassRoomStudents = async (req, res, callback) => {
  const classId = req.body.classId;

  await ClassRoom.find({ classId })
    .populate("student")
    .then((result) => {
      result.length > 0
        ? (req.body.classStudents = result)
        : (req.body.classStudents = []);
    })
    .catch((err) => {
      req.body.classStudents = [];
    });
  await callback();
};

exports.addClassRoomStudent = async (req, res, callback) => {
  const classStudent = {
    classId: req.body.classId,
    student: req.body.studentId,
  };
  const newClassRoom = new ClassRoom(classStudent);

  await newClassRoom
    .save()
    .then((added) => {
      req.body.studentAdded = true;
    })
    .catch((err) => {
      req.body.studentAdded = false;
    });
  await callback();
};

exports.removeClassRoomStudent = async (req, res, callback) => {
  const id = req.body.id;

  await ClassRoom.deleteOne({ student: id })
    .then((deleted) => {
      req.body.removed = true;
    })
    .catch((err) => {
      req.body.removed = false;
    });
  await callback();
};
