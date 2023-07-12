module.exports = (sequelize, Sequelize) => {
  const Property = sequelize.define('property', {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true, 
      primaryKey: true,
    },

    propertyName: {
      type: Sequelize.STRING,
      allowNull: false,
     
    },
    propertyType: {
      type: Sequelize.STRING,
      allowNull: false,
      enumerable: ["vacation_rental", "short_let_home"]
    },
    offeringAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    pricePerShare: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
     
    },
    minimumInvestment: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
     estimatedROI: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    holdingPeriod: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bathroom: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    bedroom: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    beds: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    yearBuilt: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    averageRevenuePerMonth: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    amenities: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      enumerable: ["wireless_interview", "smart_TV", "hot_tub","air_conditioner","essentials","washing_machine", "swimming_pool" ] ,
    },
    propertyPicture: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      },
    owner_id: {
        type: Sequelize.INTEGER,
      }
   

}) 

return Property ;
}

