'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Referal.init({
    caname:{
      type: DataTypes.STRING,
      validate:{
        notEmpty : true
      }
    },
    cacode:{
      type: DataTypes.STRING,
      validate:{
        notEmpty : true
      }
    },


  }, {
    sequelize,
    modelName: 'Referal',
  });
  return Referal;
};