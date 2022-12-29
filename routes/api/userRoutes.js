const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/studentController');

// /api/students
router.route("/").get(getAllUsers).post(createUser);
// /api/students/:studentId
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);
// /api/students/:studentId/assignments
// /api/students/:studentId/assignments/:assignmentId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);
module.exports = router;
