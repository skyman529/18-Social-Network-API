const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  
} = require('../../controllers/userController');

// /api/students
router.route("/").get(getAllUsers).post(createUser);
// /api/students/:studentId
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);
// /api/students/:studentId/assignments
// /api/students/:studentId/assignments/:assignmentId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);
module.exports = router;
