const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("../models/index");
const User = db.user
const { passwordHash, passwordCompare } = require("../helper/hashing");
const { jwtSign } = require("../helper/jwt");
const {
  findUserByEmail,
  findUserByNumber,
} = require("../services/user.services");

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

exports.signUp = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      phone_number,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone_number 
    ) {
      return res.status(409).json({
        message: "Please Fill All Fields",
      });
    }
    if (password != confirmPassword) {
      return res.status(409).json({
        message: "The entered passwords do not match!",
      });
    }

    const isExisting = await findUserByEmail(email);
    if (isExisting) {
      return res.status(409).json({
        message: "Email Already existing",
      });
    }
    const sameNumber = await findUserByNumber(phone_number);
    if (sameNumber) {
      return res.status(409).json({
        message: "Phone Number Already existing",
      });
    }
    const hashedPassword = await passwordHash(password);

    const user = new User({
     first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
      emailtoken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });
    const new_user = await user.save();

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
      to: user.email,
      subject: "Verify your email",
      html: `<h2> Dear ${user.first_name} ${user.last_name}, </h2> 
              <h2> Thank you for choosing PISHON  </h2> 
             <h4> Please verify your mail to continue..... </h4>
            <a href="${process.env.CLIENT_URL}/api/verify-email?token=${user.emailtoken}">Verify Your Email</a>   `,
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
      message: "Verfication link is sent to your email",
      new_user,
    };
    return res.status(201).json(user_info);
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
    try {
      const token = req.query.token;
      const user = await User.findOne({ where : {emailtoken: token}  });
      if (user) {
        user.emailtoken = null;
        user.isVerified = true;
        await user.save();
        const user_info = {
          message: "Email Verfication Successful",
        };
        return res.status(201).json(user_info);
      }
      if (user.isVerified !== "false") {
        return res.status(401).json({ error: "Email Already Verified" });
      } else {
        const no_verify = {
          message: "Email Verfication Not Successful",
        };
        return res.status(409).json(no_verify);
      }
    } catch (error) {
      next(error);
    }
  };
  
  exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(409).json({
          message: "Please Fill All Fields",
        });
      }
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(400).json({
          message: "Invalid Email",
        });
      }
      const isMatch = await passwordCompare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
  
      const payload = {
        id: user._id,
      };
  
      const token = jwtSign(payload);
      res.cookie("access_token", token);
      const dataInfo = {
        status: "success",
        message: "Login success",
        access_token: token,
      };
      return res.status(200).json(dataInfo);
    } catch (error) {
      next(error);
    }
  }; 

  exports.forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) { 
        return res.status(409).json({
          message: "Input your email",
        });
      }
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(400).json({
          message: "Invalid Email",
        });
      }
  
      const secret = process.env.JWT_SECRET + user.password;
      const payload = { where : {email: user.email,
        id: user.id}
       
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  
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
        to: user.email,
        subject: "Reset your password",
        html: `<h2> Dear ${user.first_name} ${user.last_name}, </h2> 
                <h2> Thank you for using PISHON  </h2> 
               <h4> Please click on the link to continue..... </h4>
               <a href="${process.env.CLIENT_URL}/api/resetpassword/${user.id}/${token}">Reset Your Password</a>`,
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
        message: "Reset password link is sent to your email",
      };
      return res.status(201).json(user_info);
    } catch (error) {
      next(error);
    }
  };

  exports.resetPasswordpage = async (req, res, next) => {
    try {
      const { id, token } = req.params;
      
      const user = await User.findOne({ where : {id: id} });
     
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const secret = process.env.JWT_SECRET + user.password;
      const payload = jwt.verify(token, secret);
      res.render("reset-password", { email: user.email  });
    } catch (error) {
      next(error);
    }
  };
  
  exports.resetPassword = async (req, res, next) => {
    try {
      const { id, token } = req.params;
      const { password, confirmPassword } = req.body;
      const user = await User.findOne({ where : {id: id  }  });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const secret = process.env.JWT_SECRET + user.password;
      const payload = jwt.verify(token, secret);
      if (!payload) {
        throw new Error();
      }
      req.user = payload;
  
      if (!password || !confirmPassword) {
        return res.status(409).json({
          message: "Please Fill All Fields",
        });
      }
      if (password != confirmPassword) {
        return res.status(409).json({
          message: "The entered passwords do not match!",
        });
      }
      const hashedPassword = await passwordHash(password);
      if (user) {
        user.password = hashedPassword;
        await user.save();
        const user_info = {
          message: "Reset Password Successful",
        };
        return res.status(201).json(user_info);
      } else {
        const no_reset = {
          message: "Reset Password Not Successful",
        };
        return res.status(409).json(no_reset);
      }
    } catch (error) {
      next(error);
    }
  };
  
  // exports.findUser = async (req, res, next) => {
  //   try {
      
  //     const id = req.params.id;
  //     const find_user = await User.findById({ _id: id });
  //     const user_find = {
  //       message: "User Found",
  //       find_user,
  //     };
  //     return res.status(200).json(user_find);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // exports.findUsers = async (req, res
  //   ) => {
  //     try {
  //       let { page, size, sort } = req.query;
    
        
  //       if (!page) {
  //         page = 1;
  //       }
    
  //       if (!size) {
  //         size = 10;
  //       }
  //       const limit = parseInt(size);
  //       const users = await Client.find().sort(
  //         {  _id: 1 }).limit(limit)
    
  //       res.send({
  //         page,
  //         size,
  //         Info: users,
  //       });
  //     }
  //     catch (error) {
  //       res.sendStatus(500);
  //     }
      
  //   };

  // exports.logOut = async (req, res) => {
  //   res.clearCookie("access_token");
  //   const logout = {
  //     message: "Logout Successful",
  //   };
  //   return res.status(201).json(logout);
  // };
  
 
  
  
   
