'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    teamname:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },
    teamleader:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },


  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};