const Excuse = require("../model/excuse.model");

exports.addExcuse = async (req, res, callback) => {
  const excuse = {
    classRoom: req.body.currentRoomId,
    meeting: req.body.meeting,
    student: req.body.student,
    remarks: req.body.remarks,
  };

  const newExcuse = new Excuse(excuse);

  await newExcuse
    .save()
    .then((saved) => {
      req.body.saved = true;
    })
    .catch((err) => {
      console.log(err);
      req.body.saved = false;
    });

  await callback();
};

exports.removeExcuse = async (req, res, callback) => {
  const _id = req.body.id;

  await Excuse.deleteOne({ _id })
    .then((deleted) => {
      req.body.removed = true;
    })
    .catch((err) => {
      console.log(err);
      req.body.removed = false;
    });

  await callback();
};

exports.getMeetingExcused = async (req, res, callback) => {
  const meeting = req.body.meeting;

  await Excuse.find({ meeting })
    .populate("student")
    .sort({ _id: -1 })
    .then((result) => {
      req.body.result = result;
    })
    .catch((err) => {
      console.log(err);
      req.body.result = [];
    });

  await callback();
};

// this is for the attendance monitoring part
exports.getExcusedStudents = async (req, res, callback) => {
  const classRoom = req.body.classRoomId;

  await Excuse.find({ classRoom })
    // .populate("student")
    .sort({ _id: -1 })
    .then((result) => {
      req.body.result = result;
    })
    .catch((err) => {
      console.log(err);
      req.body.removed = [];
    });

  await callback();
};
