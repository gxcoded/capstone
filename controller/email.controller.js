const { appMailer } = require("../mailer/mailer");
const Email = require("../model/email.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const URLBase = process.env.BASE_URL;

exports.sendEmail = async (req, res, callback) => {
  const hash = await bcrypt.hash(req.body.email, 10);
  const campus = req.body.campus;
  const email = req.body.email;
  const idNumber = req.body.idNumber;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateSent = Date.now();
  let url = "";
  const emailProps = {
    campus,
    hash,
    idNumber,
    firstName,
    lastName,
    email,
    dateSent,
  };

  if (req.body.type === 1) {
    url = `${URLBase}/staff-sign-up?campus=${campus}&hash=${hash}`;
  } else {
    url = `${URLBase}/student-sign-up?campus=${campus}&hash=${hash}`;
  }

  req.body.emailSent = appMailer(email, url, 1);

  const newEmail = new Email(emailProps);

  await newEmail
    .save()
    .then((result) => {
      req.body.sent = true;
    })
    .catch((err) => {
      req.body.sent = false;
    });

  await callback();
};

exports.sendResetLink = async (req, res, callback) => {
  if (Object.keys(req.body.info).length > 0) {
    const body = req.body.info;

    const hash = await bcrypt.hash(body.email, 10);

    const account = body._id;
    const email = body.email;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const dateSent = Date.now();

    const emailProps = {
      account,
      hash,
      firstName,
      lastName,
      email,
      dateSent,
    };
    const url = `${URLBase}/password-reset-link?hash=${hash}`;
    appMailer(email, url, 3);

    const newEmail = new Email(emailProps);

    await newEmail
      .save()
      .then((result) => {
        req.body.sent = true;
      })
      .catch((err) => {
        req.body.sent = false;
      });
  } else {
    req.body.sent = false;
  }

  await callback();
};

exports.getLink = async (req, res, callback) => {
  const hash = req.body.hash;

  await Email.findOne({ hash: hash })
    .populate("campus")
    .then((result) => {
      req.body.data = result;
    })
    .catch((err) => {
      req.body.data = {};
    });
  await callback();
};

exports.checkResetLink = async (req, res, callback) => {
  const hash = req.body.hash;

  await Email.findOne({ hash })
    .populate("account")
    .then((result) => {
      console.log(result);
      req.body.data = result;
    })
    .catch((err) => {
      req.body.data = {};
    });
  await callback();
};
