const Positive = require("../model/positive.model");
const Account = require("../model/account.model");
const { appSMSServer } = require("../sms/sms.server");

exports.notificationMessages = async (image, body) => {
  const text = `Someone reported positive of COVID-19,please check your PSU contact tracer account!`;

  const newMessage = {
    campus: body.campus,
    accountOwner: body.accountOwner,
    dateTested: body.dateTested,
    dateSent: body.dateSent,
    lastVisit: body.lastVisit,
    imgProof: image,
    message: body.message,
  };
  const adminNumber = body.adminNumber;
  const adminEmail = body.adminEmail;

  console.log(adminNumber);

  const newPositive = new Positive(newMessage);

  await newPositive
    .save()
    .then(async (temp) => {
      appSMSServer(adminNumber, text);
      if (await updateStatus(body.accountOwner)) {
        console.log("Sent");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateStatus = async (id) => {
  let updated = false;
  await Account.updateOne({ _id: id }, { $set: { allowed: false } }).then(
    (update) => {
      updated = true;
    }
  );

  return updated;
};

exports.getSentMessages = async (req, res, callback) => {
  const accountOwner = req.body.account;

  await Positive.find({ accountOwner })
    .sort({ dateSent: -1 })
    .populate("accountOwner")
    .then((msgs) => {
      req.body.messages = msgs;
    })
    .catch((err) => {
      req.body.messages = [];
    });

  await callback();
};

exports.countNewMessage = async (req, res, callback) => {
  const campus = req.body.campus;

  await Positive.find({ campus, seen: false })
    .sort({ dateSent: -1 })
    .then((msgs) => {
      req.body.messages = msgs;
    })
    .catch((err) => {
      req.body.messages = [];
    });

  await callback();
};

exports.getAllNewMessages = async (req, res, callback) => {
  const campus = req.body.campus;

  await Positive.find({ campus, seen: false })
    .sort({ dateSent: -1 })
    .populate("accountOwner")
    .then((msgs) => {
      req.body.messages = msgs;
    })
    .catch((err) => {
      req.body.messages = [];
    });

  await callback();
};

exports.getAllMessages = async (req, res, callback) => {
  const campus = req.body.campus;

  await Positive.find({ campus })
    .sort({ dateSent: -1 })
    .populate("accountOwner")
    .then((msgs) => {
      req.body.messages = msgs;
    })
    .catch((err) => {
      req.body.messages = [];
    });

  await callback();
};

exports.updateMessageStatus = async (req, res, callback) => {
  const accountId = req.body.accountId;

  await Positive.updateMany(
    { accountOwner: accountId },
    { $set: { seen: true } }
  )
    .then((ok) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};

exports.setMessageReply = async (req, res, callback) => {
  const _id = req.body.id;
  const reply = req.body.reply;
  const replyDate = Date.now().toString();

  await Positive.updateOne(
    { _id },
    { $set: { reply: reply, replyDate: replyDate } }
  )
    .then((ok) => {
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};
