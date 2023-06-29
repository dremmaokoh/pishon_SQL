const db = require("../models/index");
const User = db.user;
const Contact = db.contact


exports.findUser = async (req, res, next) => {
    try {
      
      const id = req.params.id;
      const find_user = await User.findOne({ where:  {id: id} });
      if (user.role !== 'admin') {
        return res
          .status(403)
          .json({ message: 'Not authorized to perform this role' });
      }
      const user_find = {
        message: "User Found",
        find_user,
      };
      return res.status(200).json(user_find);
    } catch (error) {
      next(error);
    }
  };

  
      exports.findUsers = async (req, res) => {
        try {
          const allEnquiries = await User.findAll({
            where: { isVerified: 'true' },
            order: [['createdAt', 'DESC']],
          });
          if (user.role !== 'admin') {
            return res
              .status(403)
              .json({ message: 'Not authorized to perform this role' });
          }
          return res.status(200).json({count: allEnquiries.length, allEnquiries });
        } catch (error) {
          return res.status(500).send({ message: error });
        }
      };

      exports.findEnquiries = async (req, res) => {
        try {
          const allEnquiries = await Contact.findAll({
            where: { isVerified: 'true' },
            order: [['createdAt', 'DESC']],
          });
          if (user.role !== 'admin') {
            return res
              .status(403)
              .json({ message: 'Not authorized to perform this role' });
          }
          return res.status(200).json({count: allEnquiries.length, allEnquiries });
        } catch (error) {
          return res.status(500).send({ message: error });
        }
      };

   