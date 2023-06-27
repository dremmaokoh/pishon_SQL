const nodemailer = require("nodemailer");
const db = require("../models/index");
const Contact = db.contact


const transporter = nodemailer.createTransport({
  service: process.env.MAIL,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.contactUs = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      message
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !message 
    ) {
      return res.status(409).json({
        message: "Please Fill All Fields",
      });
    }


    const contact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      message
    });
    const new_contact = await contact.save();

    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to rake our messages");
          resolve(success);
        }
      });
    });

    const mailOptions = {
      from: ' "PISHON" <process.env.USER_MAIL>',
      to: process.env.USER_MAIL,
      subject: "CUSTOMER'S INFORMATION AND REQUEST",
      html: `<h2> ${user.firstName} ${user.lastName}, 
                 ${user.email} ${user.phoneNumber}. </h2> 
             <h3> ${user.message}  </h3>  `
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(err);
        } else {
          console.log("Email Sent");
          resolve(info);
        }
      });
    });

    const user_info = {
      message: "Done",
      new_contact,
    };
    return res.status(201).json(user_info);
  } catch (error) {
    next(error);
  }
};