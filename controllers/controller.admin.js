const db = require("../models/index");
const User = db.user;
const Contact = db.contact;


exports.switchToAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'User is already an admin' });
    }
    user.role = 'admin';
    await user.save();
    res.status(200).json({ message: 'User role changed to admin' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findUser = async (req, res, next) => {
    try {
      
      const id = req.params.id;

      
      const find_user = await User.findOne({ where:  {id: id} });
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      
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

   exports.findVerifiedUsers = async (req, res) => {
        try {
          const { email } = req.body;
          const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to perform this role' });
    }
          const allEnquiries = await User.findAll({
            where: { isVerified: 'true' },
            order: [['createdAt', 'DESC']],
          });

          return res.status(200).json({count: allEnquiries.length, allEnquiries });
        } catch (error) {
          return res.status(500).send({ message: error.message });
        }
      };

      exports.findAllUsers = async (req, res) => {
        try {
          const { email } = req.body;
          const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to perform this role' });
    }
          const allEnquiries = await User.findAll({
            order: [['createdAt', 'DESC']],
          });

          return res.status(200).json({count: allEnquiries.length, allEnquiries });
        } catch (error) {
          return res.status(500).send({ message: error.message });
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

   