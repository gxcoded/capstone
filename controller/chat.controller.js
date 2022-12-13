const Chat = require("../model/chat.model");

exports.addChat = async (req, res, callback) => {
  const chat = {
    sender: req.body.sender,
    text: req.body.text,
    receiver: req.body.receiver,
    dateSent: Date.now().toString(),
  };

  const newChat = new Chat(chat);

  await newChat
    .save()
    .then((ok) => {
      req.body.added = true;
    })
    .catch((err) => {
      req.body.added = false;
    });
  await callback();
};

exports.getChat = async (req, res, callback) => {
  const sender = req.body.sender;
  const receiver = req.body.sender;

  await Chat.find({ $or: [{ sender }, { receiver }] })
    .sort({ dateSent: 1 })
    .populate("sender")
    .populate("receiver")
    .then((result) => {
      req.body.thread = result;
    })
    .catch((err) => {
      req.body.thread = [];
    });
  await callback();
};

exports.newChatCounter = async (req, res, callback) => {
  const receiver = req.body.account;

  await Chat.find({ receiver, seen: false })
    .then((result) => {
      req.body.count = `${result.length}`;
    })
    .catch((err) => {
      req.body.count = "0";
    });
  await callback();
};
