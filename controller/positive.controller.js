const Positive = require("../model/positive.model");
const Account = require("../model/account.model");
const Case = require("../model/cases.model");
const Restrict = require("../model/restricted.model");
const { appSMSServer } = require("../sms/sms.server");

exports.notificationMessages = async (image, body) => {
  const text = `Someone reported positive of COVID-19, please check your PSU contact tracer account!`;

  const newMessage = {
    campus: body.campus,
    accountOwner: body.accountOwner,
    dateTested: body.dateTested,
    testType: body.testType,
    dateSent: body.dateSent,
    resultDate: body.resultDate,
    imgProof: image,
    message: body.message,
  };

  const adminNumber = body.adminNumber;
  const adminEmail = body.adminEmail;

  console.log("admin" + adminNumber);

  const newPositive = new Positive(newMessage);

  await newPositive
    .save()
    .then(async (temp) => {
      await appSMSServer(adminNumber, text);
      const newCase = {
        campus: temp.campus,
        report: temp._id,
      };

      const anotherCase = new Case(newCase);

      await anotherCase
        .save()
        .then(async (cs) => {
          const restrict = {
            caseId: cs._id,
            account: body.accountOwner,
          };

          const newRestrict = new Restrict(restrict);

          await newRestrict
            .save()
            .then((rs) => {
              console.log("Restricted");
            })
            .catch((err) => {
              console.log("restricted Error " + err);
            });
        })
        .catch((err) => {
          console.log("Case Error " + err);
        });
      if (await updateStatus(body.accountOwner)) {
        console.log(temp._id);
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

exports.getValidProof = async (req, res, callback) => {
  // const days = `1209600000`;
  // const now = Date.now().toString();
  // console.log(now);
  // const total = Number(days) + Number(now);

  // console.log(total);

  const _id = req.body.id;

  // const reply = req.body.reply;
  // const replyDate = Date.now().toString();

  await Positive.find({ _id })
    .sort({ dateSent: -1 })
    .populate("testType")
    .then((result) => {
      req.body.result = result;
    })
    .catch((err) => {
      req.body.result = [];
    });

  await callback();
};
