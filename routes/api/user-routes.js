const router = require("express").Router();
const { userController } = require("../../controllers");

// /api/users
router.route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

// /api/users/:id
router.route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId")
  .post(userController.addFriend)
  .delete(userController.removeFriend);

module.exports = router;