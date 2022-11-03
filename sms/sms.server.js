require("dotenv").config();
// const sid = process.env.TWILIO_ACCOUNT_SID;
// const token = process.env.TWILIO_AUTH_TOKEN;
// const number = process.env.TWILIO_PHONE_NUMBER;
const sid = `AC64675978a9bb6b2b9c0fceeec7fb0989`;
const token = `9c4011e458facfa6c833aff5ed8b529a`;
const number = `+14245887925`;

const smsServer = require("twilio")(sid, token);

module.exports.appSMSServer = async (mobileNumber, text) => {
  return await appSMS(mobileNumber, text);
};

const appSMS = async (mobileNumber, text) => {
  let sent = false;

  await smsServer.messages
    .create({
      from: `${number}`,
      to: `+63${mobileNumber}`,
      body: `${text}`,
    })
    .then((result) => {
      console.log("message sent");
      // console.log(result);
      sent = true;
    })
    .catch((err) => {
      console.log(err);
    });

  return sent;
};
