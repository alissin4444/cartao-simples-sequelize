const { Model, DataTypes } = require("sequelize");

class Purchase extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: "purchases"
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.hasMany(models.Portion, { foreignKey: 'purchase_id', as: 'portions' });
    }
}

module.exports = Purchase;