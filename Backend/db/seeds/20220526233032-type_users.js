'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
      "Type_Users",
      [
        {
          type_user: "Super Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type_user: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type_user: "Member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Type_Users', null, {});
  }
};
