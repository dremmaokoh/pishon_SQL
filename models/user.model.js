module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true, 
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,

    },
    email: {
      type: Sequelize.STRING,
  
    },
    phone_number: {
      type: Sequelize.STRING,
  
    },
    emailtoken: {
      type: Sequelize.STRING,
  
    },
    password: {
      type: Sequelize.STRING,

    },

    username: {type: Sequelize.STRING,},
    googleId: { type: Sequelize.STRING, },
    thumbnail: { type: Sequelize.STRING, },
    isVerified: {
      type: Sequelize.STRING,
      enumerable: ["true", "false"],
      defaultValue: "false"  },

      role: {
        type: Sequelize.STRING,
        enumerable: ['user', 'admin'],
        defaultValue: 'user',
        allowNull: true
      },
  });

  return User;
};
