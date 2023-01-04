const Notification = require("../model/notifications.model");
const { appSMSServer } = require("../sms/sms.server");

exports.sendNotification = async (req, res, callback) => {
  const contacts = req.body.contacts;
  const message = req.body.message;
  const report = req.body.reportId;

  contacts.forEach(async (contact) => {
    const notification = {
      account: contact._id,
      text: message,
      report,
      dateSent: Date.now().toString(),
    };
    await appSMSServer(contact.phoneNumber, message);

    const newNotification = new Notification(notification);

    await newNotification
      .save()
      .then((okay) => {
        console.log(okay);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  await callback();
};

exports.getMyNotifications = async (req, res, callback) => {
  const account = req.body.id;

  // console.log(account);
  await Notification.find({ account })
    .sort({ dateSent: -1 })
    .then((result) => {
      req.body.notifications = result;
    })
    .catch((err) => {
      req.body.notifications = [];
    });
  await callback();
};

exports.updateNotificationStatus = async (req, res, callback) => {
  const account = req.body.id;

  await Notification.updateMany({ account }, { $set: { seen: true } })
    .then((result) => {
      // console.log(result);
      req.body.updated = true;
    })
    .catch((err) => {
      req.body.updated = false;
    });

  await callback();
};

module.exports.notificationServer = async (accountId, message) => {
  return await notify(accountId, message);
};

const notify = async (accountId, message) => {
  let success = false;

  const notification = {
    account: accountId,
    text: message,
    dateSent: Date.now().toString(),
  };

  const newNotification = new Notification(notification);

  await newNotification
    .save()
    .then((okay) => {
      success = true;
    })
    .catch((err) => {
      console.log(err);
    });

  return success;
};
