const Log = require("../model/logs.model");
const PersonalLog = require("../model/personalLog.model");

exports.addLog = async (req, res, callback) => {
  const now = Date.now().toString();

  const log = {
    campus: req.body.campus,
    room: req.body.room,
    scannedBy: req.body.scannedBy,
    accountScanned: req.body.person,
    date: now,
    start: now,
    duration: {
      hour: 0,
      minutes: 0,
    },
  };

  await Log.findOneAndUpdate(
    { accountScanned: log.accountScanned, end: null },
    {
      $set: { end: now },
    }
  )
    .then((okay) => {
      console.log("okay");
    })
    .catch((err) => {
      console.log("cant update");
    });

  await PersonalLog.findOneAndUpdate(
    { accountOwner: log.accountScanned, end: null },
    {
      $set: { end: now },
    }
  )
    .then((okay) => {
      console.log("okay");
    })
    .catch((err) => {
      console.log("cant update");
    });

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

exports.getLogs = async (req, res, callback) => {
  const campus = req.body.campus;
  const id = req.body.id;

  await Log.find({ campus: campus, scannedBy: id, end: null, meeting: null })
    .populate("campus")
    .populate("room")
    .populate("scannedBy")
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

exports.getEntranceLogs = async (req, res, callback) => {
  const campus = req.body.campus;
  const entrance = req.body.entrance;

  await Log.find({ campus: campus, room: entrance, end: null })
    .populate("campus")
    .populate("room")
    .populate("scannedBy")
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

exports.tracker = async (req, res, callback) => {
  const id = req.body.id;

  await Log.findOne({ $or: [{ accountScanned: id }, { scannedBy: id }] })
    .populate("room")
    .sort({ date: -1 })
    .then((log) => {
      if (log !== null) {
        req.body.location = log;
      } else {
        req.body.location = {};
      }
    })
    .catch((err) => {
      console.log(err);
      req.body.location = {};
    });
  await callback();
};

exports.updateLog = async (req, res, callback) => {
  const minute = compute(req.body.start);
  const hour = Math.floor(minute / 60);

  const id = req.body.id;
  const end = Date.now().toString();

  await Log.findOneAndUpdate(
    { _id: id },
    { $set: { end: end, duration: { hour: hour, minutes: minute } } }
  )
    .then((res) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};

const compute = (value) => {
  const now = Number(Date.now());
  const val = Number(value);

  return Math.floor((now - val) / 60000);
};

exports.timeOut = async (req, res, callback) => {
  // const minute = compute(req.body.start);
  // const hour = Math.floor(minute / 60);

  const account = req.body.account;
  const room = req.body.room;
  const end = Date.now().toString();

  await Log.findOneAndUpdate(
    { accountScanned: account, room, end: null },
    { $set: { end: end } }
  )
    .then((res) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};
