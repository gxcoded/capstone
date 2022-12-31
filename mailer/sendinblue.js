const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey =
  "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";
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
