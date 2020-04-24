import Sequelize from "sequelize";
import Role from './role';
const env = process.env.NODE_ENV || "development";
const config = require("/../config.json")[env];
const url = config.url || process.env.DATABSE_CONNECTION_URI;

const sequelize = new Sequelize.Sequelize(url, config);

const db = {
  sequelize,
  Sequelize,
  Role
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;