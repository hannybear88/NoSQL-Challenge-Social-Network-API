const router = require("express").Router();
const { User, Thought } = require("../models");

// DBEUG CONST
const DEBUG_DELETE_THOUGHTS = true;

// Get all users
router.get("/", (req, res) => {
	try {
		User.find().then((result) => {
			res.json(result);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get a user
router.get("/:id", (req, res) => {
	try {
		User.findById(req.params.id)
			.populate("thoughts")
			.populate("friends")
			.then((result) => {
				res.json(result);
			});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Post a new user
router.post("/", (req, res) => {
	User.create(req.body).then((result) => {
		res.json(result);
	});
});

// Put an update to a user by _id
router.put("/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	}).then((result) => {
		res.json(result);
	});
});

// Delete the user by _id
router.delete("/:id", (req, res) => {
	User.findByIdAndDelete(req.params.id).then((result) => {
		res.json(result);
	});
});

// Function to delete user's associated thoughts

// ADD FRIEND
// Post a new friend to user data
router.post("/:userId/friends/:friendId", (req, res) => {
	const update = {
		$push: {
			reactions: req.params.friendId,
		},
	};
	User.findByIdAndUpdate(req.params.userId, update, {new: true,}).then((result) => {
		res.json(result);
	});
});

// DELETE FRIEND
// Delete a friend from the user's friend list
router.delete("/:userId/friends/:friendId", (req, res) => {
	const update = {
		$push: {
			reactions: req.params.friendId,
		},
	};
	User.findByIdAndUpdate(req.params.userId, update, {new: true,}).then((result) => {
		res.json(result);
	});
});

module.exports = router;
