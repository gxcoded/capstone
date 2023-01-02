const Account = require("../model/account.model");
const Email = require("../model/email.model");
const { appMailer } = require("../mailer/mailer");
const bcrypt = require("bcrypt");

const encrypt = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.getSingleAccount = async (req, res, callback) => {
  const id = req.body.id;

  await Account.findOne({ _id: id })
    .populate("campus")
    .populate("course")
    .populate("gender")
    .populate("vaxStats")
    .populate("role")
    .then((result) => {
      if (result !== null) {
        req.body.details = result;
      } else {
        req.body.details = {};
      }
    });
  await callback();
};

exports.getNurseAccount = async (req, res, callback) => {
  const campus = req.body.campus;
  const role = `637ef41babeb211183ca4824`;

  await Account.findOne({ campus, role }).then((result) => {
    if (result !== null) {
      req.body.details = result;
    } else {
      req.body.details = {};
    }
  });
  await callback();
};

exports.manualAccountRequest = async (req, res, callback) => {
  const campus = req.body.campus;
  const idNumber = req.body.idNumber;

  await Account.findOne({ _id: id })
    .populate("campus")
    .populate("course")
    .populate("gender")
    .populate("vaxStats")
    .populate("role")
    .then((result) => {
      if (result !== null) {
        req.body.details = result;
      } else {
        req.body.details = {};
      }
    });
  await callback();
};

exports.updatePassword = async (req, res, callback) => {
  const id = req.body.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  await Account.findOne({ _id: id }).then(async (result) => {
    if (result !== null) {
      if (await bcrypt.compare(oldPassword, result.password)) {
        const updatedPassword = await encrypt(newPassword);

        await Account.updateOne(
          { _id: id },
          { $set: { password: updatedPassword } }
        ).then((update) => {
          req.body.updated = true;
        });
      } else {
        req.body.updated = false;
      }
    } else {
      req.body.updated = false;
    }
  });
  await callback();
};

//Forgot password
exports.resetPassword = async (req, res, callback) => {
  const id = req.body.id;

  const newPassword = await bcrypt.hash(req.body.password, 10);

  await Account.updateOne({ _id: id }, { $set: { password: newPassword } })
    .then(async (result) => {
      await Email.deleteOne({ account: id })
        .then((d) => {
          req.body.updated = true;
        })
        .catch((err) => {
          req.body.updated = false;
        });
    })
    .catch((err) => {
      req.body.updated = false;
    });
  await callback();
};
//verify account--Guest
exports.finalizeVerification = async (req, res, callback) => {
  const id = req.body.id;

  const password = await bcrypt.hash(req.body.password, 10);

  await Account.updateOne(
    { _id: id },
    { $set: { password: password, verified: true } }
  )
    .then(async (result) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });
  await callback();
};

exports.checkUser = async (req, res, callback) => {
  const email = req.body.email;

  await Account.findOne({ email })
    .then(async (result) => {
      if (result === null) {
        req.body.info = {};
      } else {
        req.body.info = result;
      }
    })
    .catch((err) => {
      req.body.info = {};
    });

  await callback();
};

exports.checkUsername = async (req, res, callback) => {
  const username = req.body.username;

  await Account.findOne({ username: username, verified: false })
    .then(async (result) => {
      if (result === null) {
        req.body.codeHash = {};
      } else {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        appMailer(result.email, code, 2);
        const codeHash = await encrypt(code);
        req.body.codeHash = { codeHash, id: result._id };
      }
    })
    .catch((err) => {
      req.body.codeHash = {};
    });

  await callback();
};

exports.updateAccountInfo = async (req, res, callback) => {
  const id = req.body.id;
  const course = req.body.course;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const vaxStats = req.body.vaxStats;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const address = req.body.address;

  if (req.body.course.length > 1) {
    await Account.updateOne(
      { _id: id },
      {
        $set: {
          course: course,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          vaxStats: vaxStats,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
        },
      }
    )
      .then(async (result) => {
        req.body.isUpdated = true;
      })
      .catch((err) => {
        req.body.isUpdated = false;
      });
  } else {
    await Account.updateOne(
      { _id: id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          vaxStats: vaxStats,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
        },
      }
    )
      .then(async (result) => {
        req.body.isUpdated = true;
      })
      .catch((err) => {
        req.body.isUpdated = false;
      });
  }
  await callback();
};

exports.statusChecker = async (req, res, callback) => {
  const _id = req.body.id;
  req.body.allowed = false;

  await Account.findOne({ _id, allowed: true })
    .then((result) => {
      // console.log(result);
      result !== null && (req.body.allowed = true);
    })
    .catch((err) => {
      console.log(err);
    });
  await callback();
};

// status update on Trace All UI
exports.statusUpdater = async (req, res, callback) => {
  req.body.updated = false;

  const _id = req.body.id;
  await Account.findOne({ _id })
    .then(async (result) => {
      if (result !== null) {
        await Account.updateOne(
          { _id: result._id },
          { $set: { allowed: !result.allowed } }
        )
          .then((updated) => {
            req.body.updated = true;
          })
          .catch((err) => {
            console.log("update Error");
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  await callback();
};
// =========Nurse Information===================

exports.getNurseInfo = async (req, res, callback) => {
  const campus = req.body.campus;
  const role = "637ef41babeb211183ca4824";

  await Account.findOne({ campus, role }).then((result) => {
    if (result !== null) {
      req.body.details = result;
    } else {
      req.body.details = {};
    }
  });
  await callback();
};

exports.updateProfilePic = async (image, body) => {
  let updated = false;

  const _id = body.id;

  await Account.updateOne({ _id }, { $set: { image: image } })
    .then((res) => {
      updated = true;
    })
    .catch((err) => {
      console.log(err);
    });

  return updated;
};

exports.updateStaticInfo = async (req, res, callback) => {
  const firstName = req.body.firstName;
  const _id = req.body.id;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.number;

  await Account.updateOne(
    { _id },
    {
      $set: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      },
    }
  )
    .then((res) => {
      req.body.updated = true;
    })
    .catch((err) => {
      console.log(err);
      req.body.updated = false;
    });
  await callback();
};
