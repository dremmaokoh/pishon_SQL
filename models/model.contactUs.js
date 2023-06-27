module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define('contact', {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true, 
      primaryKey: true,
    },

    firstName: {
      type: Sequelize.INTEGER,
    },
    lastName: {
      type: Sequelize.INTEGER,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.STRING,
    },

  }) 
    return Contact;
}
