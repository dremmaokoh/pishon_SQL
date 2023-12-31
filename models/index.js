const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.contact = require("./model.contactUs")(sequelize, Sequelize);
db.property = require("./model.property")(sequelize, Sequelize);

db.user.hasMany(db.property, { as: 'propertys' });
db.property.belongsTo(db.user, {
  foreignKey: 'owner_id',
  as: 'owner',
});

// User-Contact Us 1 to many relationship
db.user.hasMany(db.contact, {as:'contacts'});
db.contact.belongsTo(db.user,{foreignKey:"user_id",as:"user"});



module.exports = db;