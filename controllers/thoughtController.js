const { thought, user } = require('../models');

module.exports = {
  // GET all thoughts
  getallthoughts(req, res) {
    thought.find()
      .populate({ path: "reactions", select: "-__v" })
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET one thought
  getthought(req, res) {
    thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createthought(req, res) {
    thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } }, 
          { new: true }
        ).then((user) => {
          console.log(user);
          !user
            ? res
                .status(404)
                .json({ message: "Thought created, but no user with this ID." })
            : res.json(user);
        });
      })

      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // DELETE a thought
  deletethought(req, res) {
    thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : User.findOneAndUpdate(
              { username: thought.username },
              { $pull: { thoughts: thought._id } }, 
              { new: true }
            ).then(() => res.json({ message: "Thought deleted." }))
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updatethought(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText, username: req.body.username }, 
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a reaction to a thought by ID
  addReaction(req, res) {
    console.log("reaction added");
    console.log(req.body);
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thoughts found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction  by thought
  removeReaction(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};