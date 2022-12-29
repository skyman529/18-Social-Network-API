const { user, thought } = require("../models");

module.exports = {
  // GET all users
  getAllusers(req, res) {
    user.find()
      .populate({ path: "thoughts", select: "-__v" })
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET a single user
  getuser(req, res) {
    user.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new user
  createuser(req, res) {
    user.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update user by ID
  updateuser(req, res) {
    console.log("updating user.");
    console.log(req.body);
    user.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found check ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete users by ID
  deleteuser(req, res) {
    user.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found" })
          : thought.deleteMany({ _id: { $in: user.thoughts } }, { new: true })
      )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "User deleted" })
          : res.json({ message: "User and thoughts deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add friends to a user
  addFriend(req, res) {
    console.log("adding a friend");
    console.log(req.body);
    user.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friends from a user
  removeFriend(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No users found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};