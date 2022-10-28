const Account = require("../model/account.model");

const teaching = "62cb8add107251b0d1d0b641";
const nonTeaching = "62cb8ae9107251b0d1d0b643";

exports.getStaffAccounts = async (req, res, callback) => {
  const campus = req.body.campus;

  await Account.find({
    $and: [
      { campus: campus },
      { $or: [{ role: teaching }, { role: nonTeaching }] },
    ],
  })
    .populate("campus")
    .populate("gender")
    .populate("vaxStats")
    .populate("role")
    .sort({ lastName: 1 })
    .then((result) => {
      if (result !== null) {
        req.body.staffList = result;
      } else {
        req.body.staffList = [];
      }
    });
  await callback();
};

exports.getNonTeachingAccounts = async (req, res, callback) => {
  const campus = req.body.campus;

  await Account.find({
    $and: [{ campus: campus }, { role: nonTeaching }],
  })
    .populate("campus")
    .populate("gender")
    .populate("vaxStats")
    .populate("role")
    .sort({ lastName: 1 })
    .then((result) => {
      if (result !== null) {
        req.body.staffList = result;
      } else {
        req.body.staffList = [];
      }
    });
  await callback();
};

exports.searchStaffs = async (req, res, callback) => {
  const campus = req.body.campus;

  await Account.find({
    $and: [
      {
        $or: [
          { idNumber: { $regex: new RegExp(req.body.keyword, "i") } },
          { lastName: { $regex: new RegExp(req.body.keyword, "i") } },
        ],
      },
      { $or: [{ role: teaching }, { role: nonTeaching }] },
    ],
    campus: campus,
  })
    .sort({ course: 1, lastName: 1 })
    .populate("course")
    .populate("gender")
    .then((result) => {
      req.body.staffList = result;
    })
    .catch((err) => {
      req.body.staffList = [];
    });

  await callback();
};

exports.searchTeaching = async (req, res, callback) => {
  const campus = req.body.campus;

  await Account.find({
    $and: [
      {
        $or: [
          { idNumber: { $regex: new RegExp(req.body.keyword, "i") } },
          { lastName: { $regex: new RegExp(req.body.keyword, "i") } },
        ],
      },
      { $or: [{ role: teaching }, { role: teaching }] },
    ],
    campus: campus,
  })
    .sort({ course: 1, lastName: 1 })
    .populate("course")
    .populate("gender")
    .then((result) => {
      req.body.staffList = result;
    })
    .catch((err) => {
      req.body.staffList = [];
    });

  await callback();
};

exports.updateStaffInfo = async (req, res, callback) => {
  const body = req.body;
  let department = null;
  let office = null;

  if (body.department.length > 0) {
    department = body.department;
  }
  if (body.office.length > 0) {
    office = body.office;
  }
  await Account.updateOne(
    { _id: body.id },
    {
      $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        address: body.address,
        phoneNumber: body.phoneNumber,
        email: body.email,
        vaxStats: body.vaxStatus,
        department,
        office,
      },
    }
  )
    .then((result) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });
  await callback();
};
