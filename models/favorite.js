'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorite.belongsTo(models.User)
      Favorite.belongsTo(models.Recipe)
      // define association here
    }
  };
  Favorite.init({      
    title: DataTypes.STRING,
    RecipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        Key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        Key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};