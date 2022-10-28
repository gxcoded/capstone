const sgMailer = require("@sendgrid/mail");
require("dotenv").config();

module.exports.appMailer = (emailAddress, url, type) => {
  const API_KEY = process.env.SEND_GRID_API;
  sgMailer.setApiKey(API_KEY);

  let message = "";
  let subject = "";

  if (type === 1) {
    message = `<h5>Please click the link to view the registration Page.</h5>
                <a href='${url}'>${url}</a>`;
    subject = "PSU Contact Tracer Registration";
  } else if (type === 3) {
    message = `<h5>We received a request that you want to reset your password, Please click the link to view the password reset Page. If you did not requested for it, just ignore this message.</h5>
                <a href='${url}'>${url}</a>`;
    subject = "PSU Contact Tracer Password Reset";
  } else {
    message = `<h5>${url} is your PSU Contact Tracer Verification Code.</h5>`;
    subject = "PSU Contact Tracer Registration";
  }

  // const mailer = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "gcodedecrypt@gmail.com",
  //     pass: "aampntlfwzabjjwu",
  //   },
  // });

  const mailProperties = {
    from: "psumailer@gmail.com",
    to: `${emailAddress}`,
    subject: subject,
    html: message,
  };

  sgMailer
    .send(mailProperties)
    .then((okay) => {
      console.log("Email Sent");
    })
    .catch((err) => {
      console.log(err.message);
    });

  // mailer.sendMail(mailProperties, (err, info) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Email Sent!: " + info);
  //   }
  // });
};
