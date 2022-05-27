"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Cars.init(
        {
            plate: DataTypes.STRING,
            manufacture: DataTypes.STRING,
            model: DataTypes.STRING,
            image: {
                type: DataTypes.STRING,
                get() {
                    const rawValue = this.getDataValue("image");
                    return rawValue ? "http://localhost:5000" + rawValue.substring(1) : null;
                },
            },
            rentPerDay: DataTypes.INTEGER,
            capacity: DataTypes.INTEGER,
            description: DataTypes.STRING,
            availableAt: DataTypes.DATE,
            transmission: DataTypes.STRING,
            available: DataTypes.BOOLEAN,
            type: DataTypes.STRING,
            year: DataTypes.INTEGER,
            options: DataTypes.ARRAY(DataTypes.STRING),
            specs: DataTypes.ARRAY(DataTypes.STRING),
        },
        {
            sequelize,
            modelName: "Cars",
        }
    );
    return Cars;
};
