const nodemailer = require("nodemailer");

/**
 * Mail sender - sends emails using 'nodemailer'
 *
 * @param {String} to - receiver email
 * @param {String} subject - email subject
 * @param {String} text
 * @param {String} html
 *
 * @returns {Promise}
 */

//MM-18
module.exports = async (to, subject, text = "", html = "") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILING_EMAIL,
      pass: process.env.MAILING_PASSWORD,
    },
  });
  const mailOptions = { from: "MyMenu <automail@mymenu.com>", to, subject, text, html };

  const result = await transporter.sendMail(mailOptions);
  logger.info("Sent email result: ", result);
  logger.info("An Email has been sent to " + to + " with a subject of: " + subject);
};
