const { Model, DataTypes } = require("sequelize");

class Portion extends Model {
    static init(sequelize) {
        super.init({
            status: DataTypes.BOOLEAN,
            value: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: "portions"
        })
    }

    static associate(models){
        this.belongsTo(models.Purchase, { foreignKey: 'purchase_id', as: 'purchase' });
    }
}

module.exports = Portion;