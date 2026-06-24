'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Название товара'
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'URL идентификатор'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'полное описание товара'
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        comment: 'Текущая цена'
      },
      oldPrice: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        comment: 'Старая цена для отображения скидки'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Количество на складе'
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'шт',
        comment: 'Единица измерения'
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: '[]',
        comment: 'JSON массив URL измерений'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Активен/скрыт'
      },
      isNew: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Метка "Новинка"'
      },
      isPopular: {
        type: Sequelize.BOOLEAN
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};