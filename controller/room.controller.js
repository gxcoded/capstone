const Room = require("../model/rooms.model");

exports.addRoom = async (req, res, next) => {
  const room = {
    campus: req.body.campus,
    // building: req.body.building,
    description: req.body.description,
  };

  const newRoom = new Room(room);

  await newRoom
    .save()
    .then((c) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });

  await next();
};

exports.getRooms = async (req, res, callback) => {
  const campus = req.body.campus;

  await Room.find({ campus })
    // .populate("building")
    .sort({ description: 1 })
    .then((rooms) => {
      req.body.rooms = rooms;
    })
    .catch((err) => {
      req.body.rooms = [];
    });

  await callback();
};

exports.searchRooms = async (req, res, callback) => {
  const campus = req.body.campus;
  const key = req.body.key;

  if (key.length > 0) {
    await Room.find({
      campus,
      description: { $regex: new RegExp(req.body.key, "i") },
    })
      //   .populate("building")
      .sort({ description: 1 })
      .then((rooms) => {
        if (rooms.length > 0) {
          req.body.rooms = rooms;
        } else {
          req.body.rooms = [];
        }
      })
      .catch((err) => {
        req.body.rooms = [];
      });
  } else {
    req.body.rooms = [];
  }

  await callback();
};

exports.updateRoomDescription = async (req, res, callback) => {
  const id = req.body.id;
  const description = req.body.description;

  await Room.updateOne({ _id: id }, { $set: { description: description } })
    .then((result) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });
  await callback();
};

exports.updateRoomStatus = async (req, res, callback) => {
  const _id = req.body.id;
  const isOpen = req.body.isOpen;

  await Room.updateOne({ _id }, { $set: { isOpen: isOpen } })
    .then((updated) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};

exports.updateRoomScanControl = async (req, res, callback) => {
  console.log(req.body);
  const _id = req.body.id;
  const allowStudentsAndGuests = req.body.isAllowed;

  await Room.updateOne(
    { _id },
    { $set: { allowStudentsAndGuests: allowStudentsAndGuests } }
  )
    .then((updated) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};
