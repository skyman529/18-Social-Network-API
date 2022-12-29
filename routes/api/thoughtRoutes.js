const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");
// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);
// /api/houghts/:courseId
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

  // new reaction
  router.route("/:thoughtId/reactions").post(addReaction);
  // delete reaction
  router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
