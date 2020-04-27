import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];


export const sequelize = new Sequelize(config);
