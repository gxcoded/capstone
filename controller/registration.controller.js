const Temp = require("../model/temp.model");
const Account = require("../model/account.model");
const WalkIn = require("../model/walkin.model");
const Queue = require("../model/queue.model");
const Email = require("../model/email.model");
const { appMailer } = require("../mailer/mailer");
const bcrypt = require("bcrypt");
const { appSMSServer } = require("../sms/sms.server");

const encrypt = async (password) => {
  return await bcrypt.hash(password, 10);
};

const getQueueNumber = async () => {
  const queue = await Queue.findOne();
  let queueNumber = queue.number;

  await Queue.updateOne({ $set: { number: ++queueNumber } });

  return queueNumber;
};

exports.checkId = async (req, res, callback) => {
  const userId = req.body.userId;

  await Account.findOne({ idNumber: userId })
    .then((result) => {
      if (result === null) {
        req.body.exist = false;
      } else {
        req.body.exist = true;
      }
    })
    .catch((err) => {
      req.body.exist = true;
      console.log(err);
    });
  await callback();
};

exports.temp = async (image, body, tempId) => {
  const number = await getQueueNumber();
  const role = body.role;
  const email = body.email;
  const code = Math.floor(100000 + Math.random() * 900000);
  const textMessage = `${code} is your PSU Contact Tracer Verification Code`;
  let hashKey = "";

  appMailer(email, code, 2);
  appSMSServer(body.phoneNumber, textMessage);

  let tempAccount = {};
  if (role === "62cb91ba2c5804049b716d49") {
    hashKey = body.hashKey;
    tempAccount = {
      tempId,
      campus: body.campus,
      course: body.course,
      idNumber: body.idNumber,
      username: body.idNumber,
      firstName: body.firstName,
      lastName: body.lastName,
      image: image,
      gender: body.gender,
      vaxStats: body.vaxStats,
      phoneNumber: body.phoneNumber,
      email: body.email,
      address: body.address,
      verificationCode: code,
      dateAdded: Date.now(),
      role,
    };
  } else if (role === "62cb91c52c5804049b716d4b") {
    const username = `GUEST-${body.campusKey}-${number}`;
    tempAccount = {
      tempId,
      campus: body.campus,
      username,
      purpose: body.purpose,
      firstName: body.firstName,
      lastName: body.lastName,
      image: image,
      gender: body.gender,
      vaxStats: body.vaxStats,
      phoneNumber: body.phoneNumber,
      email: body.email,
      address: body.address,
      verificationCode: code,
      dateAdded: Date.now(),
      role,
    };
  }

  const newTemp = new Temp(tempAccount);

  await newTemp
    .save()
    .then(async (temp) => {
      console.log("added");
      await Email.deleteOne({ hash: hashKey });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.walkInReg = async (image, body) => {
  const number = await getQueueNumber();
  const username = `GUEST-${body.key}-${number}`;

  const walkInAccount = {
    campus: body.campus,
    addedBy: body.account,
    username,
    idNumber: username,
    role: body.role,
    purpose: body.purpose,
    firstName: body.firstName,
    lastName: body.lastName,
    image: image,
    gender: body.gender,
    vaxStats: body.vaxStats,
    phoneNumber: body.phoneNumber,
    email: body.email,
    address: body.address,
    verified: false,
    dateAdded: Date.now().toString(),
  };

  const newWalkIn = new Account(walkInAccount);

  await newWalkIn
    .save()
    .then(async (temp) => {
      console.log("added");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.findTemp = async (req, res, callback) => {
  const hash = req.body.hash;

  await Temp.find({ tempId: hash, verified: false }, { verificationCode: 1 })
    .then(async (result) => {
      if (result.length > 0 && result[0].verificationCode === req.body.code) {
        await Temp.updateOne(
          { _id: result[0]._id },
          { $set: { verified: true } }
        );
        req.body.confirmed = true;
      } else {
        req.body.confirmed = false;
      }
    })
    .catch((err) => {
      req.body.confirmed = false;
    });

  await callback();
};

exports.getTemp = async (req, res, callback) => {
  const hash = req.body.hash;

  await Temp.findOne({ tempId: hash, verified: true }, { username: 1 })
    .then((result) => {
      req.body.generatedUsername = result.username;
    })
    .catch((err) => {
      console.log(err);
      req.body.generatedUsername = null;
    });

  await callback();
};

// ===========Create Account=======================

exports.register = async (req, res, callback) => {
  const hashed = await encrypt(req.body.password);
  const token = req.body.token;

  await Temp.findOne({ tempId: token, verified: true })
    .then(async (result) => {
      const account = {
        username: result.username,
        password: hashed,
        campus: result.campus,
        course: result.course,
        idNumber: result.idNumber,
        firstName: result.firstName,
        lastName: result.lastName,
        image: result.image,
        gender: result.gender,
        vaxStats: result.vaxStats,
        phoneNumber: result.phoneNumber,
        email: result.email,
        address: result.address,
        dateAdded: Date.now(),
        role: result.role,
      };
      const newAccount = new Account(account);

      await newAccount
        .save()
        .then(async (res) => {
          await Temp.findByIdAndDelete(result._id);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  await callback();
};
// ==============Staff Registration=======================

exports.staffAccount = async (image, body, tempId) => {
  const role = body.role;
  const hash = body.hash;
  let department = null;
  let office = null;
  const password = await encrypt(body.password);

  if (body.department.length > 0) {
    department = body.department;
  }
  if (body.office.length > 0) {
    office = body.office;
  }
  const staffAccount = {
    username: body.idNumber,
    password,
    campus: body.campus,
    department,
    office,
    role,
    idNumber: body.idNumber,
    firstName: body.firstName,
    lastName: body.lastName,
    image: image,
    gender: body.gender,
    vaxStats: body.vaxStats,
    phoneNumber: body.phoneNumber,
    email: body.email,
    address: body.address,
    dateAdded: Date.now(),
  };
  const newAccount = new Account(staffAccount);

  await newAccount
    .save()
    .then(async (res) => {
      await Email.deleteOne({ hash: hash });
    })
    .catch((err) => {
      console.log(err);
    });
};
