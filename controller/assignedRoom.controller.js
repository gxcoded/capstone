// const { request } = require("express");
const AssignedRoom = require("../model/assignedRoom.model");

exports.assignRoom = async (req, res, callback) => {
  const assign = {
    campus: req.body.campus,
    account: req.body.account,
    room: req.body.room,
  };

  await AssignedRoom.findOne({
    account: assign.account,
  }).then(async (result) => {
    if (result !== null) {
      await AssignedRoom.updateOne(
        {
          account: assign.account,
        },
        { $set: { room: assign.room } }
      )
        .then((r) => {
          req.body.saved = true;
        })
        .catch((err) => {
          req.body.saved = false;
        });
    } else {
      const newAssignedRoom = new AssignedRoom(assign);

      await newAssignedRoom
        .save()
        .then((saved) => {
          req.body.saved = true;
        })
        .catch((err) => {
          req.body.saved = false;
        });
    }
  });

  await callback();
};

exports.getAssignedRooms = async (req, res, callback) => {
  const campus = req.body.campus;

  await AssignedRoom.find({ campus })
    .populate("room")
    .then((data) => {
      req.body.assigned = data;
    })
    .catch((err) => {
      req.body.assigned = [];
    });

  await callback();
};

exports.checkAssignedRoom = async (req, res, callback) => {
  const account = req.body.account;
  console.log(req.body);
  await AssignedRoom.findOne({ account })
    .populate("room")
    .then((data) => {
      req.body.assigned = data;
      console.log(data);
    })
    .catch((err) => {
      req.body.assigned = {};
    });

  await callback();
};
