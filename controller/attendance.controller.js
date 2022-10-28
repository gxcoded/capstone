const Logs = require("../model/logs.model");

exports.getAttendanceLog = async (req, res, callback) => {
  const id = req.body.id;

  await Logs.find({ meeting: id })
    .populate("accountScanned")
    .then((result) => {
      req.body.attendanceLog = result;
    })
    .catch((err) => {
      req.body.attendanceLog = [];
    });
  await callback();
};

exports.getAllAttendance = async (req, res, callback) => {
  const id = req.body.id;

  await Logs.find({ meeting: id })
    .then((result) => {
      req.body.all = result;
    })
    .catch((err) => {
      req.body.all = [];
    });
  await callback();
};
