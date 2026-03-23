import { Model } from 'sequelize'
const loadModel = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCategory.hasMany(models.Product)
      // TODO exam: New foreign key association
      ProductCategory.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' })
      // TODO exam: END
    }
  }
  ProductCategory.init({
    name: DataTypes.STRING,
    // TODO exam: New foreign key attribute
    restaurantId: DataTypes.INTEGER,
    // TODO exam: END
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'ProductCategory'
  })
  return ProductCategory
}
export default loadModel