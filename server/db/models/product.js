'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // ✅ Связь с категорией: товар принадлежит одной категории
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,  // TEXT для длинных описаний
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),  // DECIMAL для цен
      allowNull: false,
      defaultValue: 0.00
    },
    oldPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'шт'
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '[]'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isPopular: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true
  });

  return Product;
};