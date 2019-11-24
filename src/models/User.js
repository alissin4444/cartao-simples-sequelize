const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(sequelize) {
        super.init({    
            name: DataTypes.STRING,
            limit: DataTypes.INTEGER
        }, { sequelize })
    }
}

module.exports = User;