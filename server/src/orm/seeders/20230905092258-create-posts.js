'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          content: "Lorem ipsum dolor sit amet Desert Eagle",
          topicId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Lorem ipsum dolor sit amet Ak 47",
          topicId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Lorem ipsum dolor sit amet M4A1",
          topicId: 3,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Insert Image for Post
    await queryInterface.bulkInsert(
      "post_images",
      [
        {
          postId: 1,
          imagePath: "test1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 2,
          imagePath: "test2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 3,
          imagePath: "test3.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("post_images", null, {});
  },
};
