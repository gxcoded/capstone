const Meeting = require("../model/meetings.model");
const Log = require("../model/logs.model");

exports.addMeeting = async (req, res, callback) => {
  const now = Date.now().toString();
  const meeting = {
    classId: req.body.classId,
    room: req.body.room,
    date: now,
    start: req.body.start,
    time: req.body.time,
  };

  const newMeeting = new Meeting(meeting);

  await newMeeting
    .save()
    .then((created) => {
      req.body.created = true;
    })
    .catch((err) => {
      console.log(err);
      req.body.created = false;
    });

  await callback();
};

exports.getMeeting = async (req, res, callback) => {
  const classId = req.body.classId;

  await Meeting.findOne({ classId, end: null })
    .populate("room")
    .then((result) => {
      result !== null ? (req.body.current = result) : (req.body.current = {});
    })
    .catch((err) => [(req.body.current = {})]);

  await callback();
};

exports.updateMeetingStatus = async (req, res, callback) => {
  const id = req.body.id;
  const end = Date.now().toString();

  await Meeting.findOneAndUpdate({ _id: id }, { $set: { end: end } })
    .then((res) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};

exports.getMeetingList = async (req, res, callback) => {
  const classId = req.body.classId;

  await Meeting.find({ classId, end: { $ne: null } })
    .populate("room")
    .sort({ _id: -1 })
    .then((result) => {
      result !== null
        ? (req.body.meetingList = result)
        : (req.body.meetingList = []);
    })
    .catch((err) => (req.body.meetingList = []));

  await callback();
};

exports.updateMeetingStatus = async (req, res, callback) => {
  const id = req.body.id;
  const end = Date.now().toString();

  await Meeting.findOneAndUpdate({ _id: id }, { $set: { end: end } })
    .then((res) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};
// =========Logs==============
exports.addMeetingLog = async (req, res, callback) => {
  const now = Date.now().toString();
  console.log(req.body);
  const log = {
    campus: req.body.campus,
    room: req.body.room,
    scannedBy: req.body.scannedBy,
    accountScanned: req.body.person,
    meeting: req.body.meetingId,
    date: now,
    start: now,
    duration: {
      hour: 0,
      minutes: 0,
    },
  };
  const newLog = new Log(log);

  await newLog
    .save()
    .then((l) => {
      req.body.added = true;
    })
    .catch((err) => {
      console.log(err);
      req.body.added = false;
    });

  await callback();
};

exports.addMeetingSitIn = async (req, res, callback) => {
  const now = Date.now().toString();

  const log = {
    campus: req.body.campus,
    room: req.body.room,
    scannedBy: req.body.scannedBy,
    accountScanned: req.body.person,
    meeting: req.body.meetingId,
    isSitIn: true,
    date: now,
    start: now,
    duration: {
      hour: 0,
      minutes: 0,
    },
  };
  const newLog = new Log(log);

  await newLog
    .save()
    .then((l) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });

  await callback();
};

exports.addMeetingGuest = async (req, res, callback) => {
  const now = Date.now().toString();

  const log = {
    campus: req.body.campus,
    room: req.body.room,
    scannedBy: req.body.scannedBy,
    accountScanned: req.body.person,
    meeting: req.body.meetingId,
    isVisitor: true,
    date: now,
    start: now,
    duration: {
      hour: 0,
      minutes: 0,
    },
  };
  const newLog = new Log(log);

  await newLog
    .save()
    .then((l) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });

  await callback();
};

exports.getMeetingLogs = async (req, res, callback) => {
  const meeting = req.body.meetingId;

  await Log.find({ meeting, end: null })
    .populate("accountScanned")
    .sort("date")
    .then((result) => {
      if (result.length > 0) {
        req.body.logs = result;
      } else {
        req.body.logs = [];
      }
    })
    .catch((err) => {
      req.body.logs = [];
    });

  await callback();
};

exports.updateMeetingLog = async (req, res, callback) => {
  const id = req.body.id;
  const end = Date.now().toString();

  await Log.findOneAndUpdate({ _id: id }, { $set: { end: end } })
    .then((res) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};
