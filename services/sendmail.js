// 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
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
