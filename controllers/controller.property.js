const db = require("../models/index");
const User = db.user;
const Property = db.property;
const cloudinary = require("../utils/cloudinary");

exports.addProperty = async (req, res, next) => {
  try {
    const { propertyName, propertyType, offeringAmount, propertyPicture , amenities, pricePerShare, location, minimumInvestment,estimatedROI,holdingPeriod, bathroom,bedroom, beds, yearBuilt, averageRevenuePerMonth } =
      req.body;

      // if (!propertyName || ! propertyType || ! propertyPicture || !estimatedROI || !holdingPeriod  ) {
      //   res.status(400).send({
      //     message: 'Content can not be empty!',
      //   });
      //   return;
      // }

    const id = req.user.id;

    /* Finding the user by the id. */
     const checkUser = await User.findOne({ where : {id: id} });
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
     }

     if (checkUser.role !== 'admin') {
       return res.status(404).json({ message: "Unauthorized to sell Property" });
     }
    const result = await cloudinary.uploader.upload(req.file.path);

    const new_property = await Property.create({
      propertyName,
      propertyType,
      offeringAmount,
      pricePerShare,
      location,
      propertyPicture: result.secure_url,
      minimumInvestment,
      estimatedROI,
      holdingPeriod,
      bathroom,
      bedroom,
      beds,
      yearBuilt,
      averageRevenuePerMonth,
      amenities,
      owner_id: req.user.id   
    });

    return res.status(201).json(new_property);
  } catch (error)  {
    next(error);
  }
};

exports.findProperty = async (req, res, next) => {
  try {
    const id = req.params.id;
    const find_Property = await Property.findOne({ where : {id: id} });
    const property_find = {
      message: "Property Found",
      find_Property,
    };
    return res.status(200).json(property_find);
  } catch (error) {
    next(error);
  }
};

exports.findPropertys = async (req, res, next) => {
  try {
    
    const all_propertys = await User.findAll({
      where: { isVerified: 'true' },
      order: [['createdAt', 'DESC']],
    });
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to perform this role' });
    }
    return res.status(200).json({count: all_propertys.length, all_propertys });
  } catch (error) {
    return res.status(500).send({ message: error });
    
}
};


// exports.findlatestProperty = async (req, res
//   ) => {
//     try {
//       let { page, size, sort } = req.query;
  
//       // If the page is not applied in query
//       if (!page) {
//         page = 1;
//       }
  
//       if (!size) {
//         size = 10;
//       }
//       const limit = parseInt(size);
//       const latest = await Property.find().sort(
//         {  id: -1 }).limit(limit)
  
//       res.send({
//         page,
//         size,
//         Info: latest,
//       });
//     }
//     catch (error) {
//       res.sendStatus(500);
//     }
    
//   };


// exports.similarField = async (req, res, next) => {
//   try {
//     const propertyType = req.params.propertyType;
//     const { page, limit } = req.query;
//     const similar_field = await Property.findOne({ where : {propertyType: propertyType} })
//       .sort({ createdAt: 1 })
//       .skip((page - 1) * limit)
//       .limit(limit * 1);
//     return res
//       .status(200)
//       .json({ count: similar_field.length, data: similar_field });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.updateProperty = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const { propertyName, propertyType, offeringAmount, propertyPicture, pricePerShare, location } =
//       req.body;
//     const new_Property = await Property.findByIdAndUpdate(
//       { _id: id },
//       { ...req.body },
//       {
//         new: true,
//       }
//     );
//     const Property_update = {
//       message: "Updated successfully",
//       new_Property,
//     };
//     return res.status(200).json(Property_update);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteProperty = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const delete_Property = await Property.findByIdAndDelete({ _id: id });
//     const Property_delete = {
//       message: "Property Deleted",
//       delete_Property,
//     };
//     return res.status(200).json(Property_delete);
//   } catch (error) {
//     next(error);
//   }
// };