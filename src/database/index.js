const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Portion = require("../models/Portion");

const connection = new Sequelize(dbConfig);

User.init(connection);
Purchase.init(connection);
Portion.init(connection);

Purchase.associate(connection.models);
Portion.associate(connection.models);
module.exports = connection;