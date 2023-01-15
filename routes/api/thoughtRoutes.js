const router = require('express').Router();
const {
  getallthoughts,
  getthought,
  createthought,
  updatethought,
  deletethought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");
// /api/thoughts
router.route("/").get(getallthoughts).post(createthought);
// /api/thoughts/:courseId
router
  .route("/:thoughtId")
  .get(getthought)
  .put(updatethought)
  .delete(deletethought);

  // new reaction
  router.route("/:thoughtId/reactions").post(addReaction);
  // delete reaction
  router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
