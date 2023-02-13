const router = require("express").Router();
const { User, Thought } = require("../models");

// DBEUG CONST
const DEBUG_DELETE_THOUGHTS = true;

// Functions

exports.getAllUser = (req, res) => {
	try {
		User.find().then((result) => {
			res.json(result);
		});
	} catch (err) {
		res.status(500).json(err);
	}
}

exports.getUserById = (req, res) => {
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
}

exports.createUser = (req, res) => {
	User.create(req.body).then((result) => {
		res.json(result);
	});
}

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	}).then((result) => {
		res.json(result);
	});
}

exports.deleteUser = (req, res) => {
	User.findById(req.params.id).then((result) => {
		return Thought.deleteMany({_id: {$in: result.thoughts}})
	}).then(() => {
		return User.findByIdAndDelete(req.params.id)
	}).then((result) => {
		res.json(result);
	})
		.catch((err) => {
		console.log (err)
		res.json(err)
	})
}

exports.addFriend = (req, res) => {
	const update = {
		$push: {
			friends: req.params.friendId,
		},
	};
	User.findByIdAndUpdate(req.params.userId, update, {new: true,}).then((result) => {
		res.json(result);
	});
}

exports.removeFriend = (req, res) => {
	const update = {
		$pull: {
			friends: req.params.friendId,
		},
	};
	User.findByIdAndUpdate(req.params.userId, update, {new: true,}).then((result) => {
		res.json(result);
	});
}