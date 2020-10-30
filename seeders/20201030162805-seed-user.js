'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      
      email: 'test@test.com',
      password: 'blaat',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      email: 'scooby.doo@misterymachine.com',
      password: '444-555-6666',      
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      email: 'herbie.husker@unl.edu',
      password: '402-437-0001',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
