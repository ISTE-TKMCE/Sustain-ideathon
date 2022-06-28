'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    teamname:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },

    college:{
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

    mem1:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },

    mem1email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },


    mem2:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },

    mem2email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },

    mem3:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },

    mem3email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },

    phone1:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },

    phone2:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : true
      }
    },

    refid:{
      type: DataTypes.STRING,
      allowNull:false
    },


  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};