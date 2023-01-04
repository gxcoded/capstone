const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
require("dotenv").config();

apiKey.apiKey = process.env.SENDIN_BLUE_API;
const transEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: "gcodedecrypt@gmail.com",
};

exports.emailSender = async (emailAddress, subject, content) => {
  let isSent = false;

  const receivers = [
    {
      email: emailAddress,
    },
  ];
  await transEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: subject,
      htmlContent: content,
    })
    .then((response) => {
      console.log("sent");
      console.log(response);
      isSent = true;
    })
    .catch((err) => {
      console.log(err);
    });

  return isSent;
};
