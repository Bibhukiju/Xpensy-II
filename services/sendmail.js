
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.sendGridApi);
const sendEmail = (to, text, subject, html) => {
  console.log(process.env.sendGridApi);
  sgMail.send(
    {
      to,
      text,
      subject,
      html,
      from: "scriptyart@gmail.com",
    },
    (err, info) => {
      if (err) {
        console.log("error occured");
        console.log(err);
      } else {
        console.log("email sent");
      }
    }
  );
};

module.exports = sendEmail;
