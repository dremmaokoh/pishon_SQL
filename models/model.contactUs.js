module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define('contact', {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true, 
      primaryKey: true,
    },

    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    },

  }) 
    return Contact;
}
