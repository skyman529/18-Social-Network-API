const { users, thought } = require("../models");

module.exports = {
  // GET all users
  getAllUsers(req, res) {
    users.find()
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
  getUser(req, res) {
    users.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .then((users) =>
        !users
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json(users)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new user
  createUser(req, res) {
    users.create(req.body)
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Update user by ID
  updateUser(req, res) {
    console.log("updating user.");
    console.log(req.body);
    users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: "No user found check ID" })
          : res.json(users)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete users by ID
  deleteUser(req, res) {
    users.findOneAndDelete({ _id: req.params.userId })
      .then((users) =>
        !users
          ? res.status(404).json({ message: "No user found" })
          : thought.deleteMany({ _id: { $in: users.thoughts } }, { new: true })
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
    users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: "No user found" })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friends from a user
  removeFriend(req, res) {
    users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: "No users found" })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
};