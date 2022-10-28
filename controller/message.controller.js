const Message = require("../model/message.model");

const defaultMessage = `This Message if from PSU, you have been identified as a close contact of someone who has tested positive for COVID-19.  As a close contact, it is recommended that you get tested at least 5 days after the last date of contact with the person with COVID-19, regardless of vaccination status. If you develop symptoms, it is recommended to get tested immediately and stay home and away from all activities until the test result is known. Thank you for your cooperation.`;

exports.addMessage = async (req, res, callback) => {
  const message = {
    campus: req.body.campus,
    text: req.body.text,
  };

  await Message.findOne({ campus: message.campus }).then(async (msg) => {
    if (msg === null) {
      const newMessage = new Message(message);

      await newMessage
        .save()
        .then((saved) => {
          req.body.success = true;
        })
        .catch((err) => {
          console.log(err);
          req.body.success = false;
        });
    } else {
      await Message.updateOne(
        { campus: message.campus },
        { $set: { text: message.text } }
      )
        .then((r) => {
          req.body.success = true;
        })
        .catch((err) => {
          req.body.success = false;
        });
    }
  });

  await callback();
};

exports.getMessage = async (req, res, callback) => {
  const campus = req.body.campus;
  console.log(campus);
  await Message.findOne({ campus })
    .then((text) => {
      console.log(text);
      text !== null
        ? (req.body.text = text)
        : (req.body.text = { campus, text: defaultMessage });
    })
    .catch((err) => {
      console.log(err);
      req.body.text = {};
    });

  await callback();
};
