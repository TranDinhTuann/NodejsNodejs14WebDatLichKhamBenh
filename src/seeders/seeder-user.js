'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      password: '123456',
      firstName: 'Tyrant',
      lastName: 'Baron',
      address: 'VN',
      phoneNumber: '0981634164',
      gender: 1,
      image: 'ảnh',
      roleId: 'R1',
      positionId: 'P0',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
