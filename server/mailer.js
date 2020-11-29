"use strict";
const nodemailer = require("nodemailer");
// require("dotenv").config();

var transporter;

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // console.log(process.env.EMAIL_USER);
  // console.log(process.env.EMAIL_PASS);

  // let transporter = nodemailer.createTransport({
  //   host: "smtp-relay.sendinblue.com",
  //   port: 587,
  //   secure: false,
  // auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS
  //   }
  // });
  
  // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: '"Libor" <libor@centrum.cz>', // sender address
  //   to: "libor@seznam.cz", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>" // html body
  // });

}

main().then(console.log("Nodemailer Active...")).catch(console.error);

async function sendMail(mailOptions) {
  let info = await transporter.sendMail(mailOptions);

  const myPromise = new Promise(function(resolve, reject) {
  
    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    console.log(info);

    if (info.messageId) {
      resolve(info)
    } else {
      reject(info);
    }
  });
}

module.exports.sendMail = sendMail;