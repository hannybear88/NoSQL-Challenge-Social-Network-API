const router = require("express").Router();
const { User, Thought } = require("../models");

// Functions
exports.getAllThought = (req, res) => {
	try {
		Thought.find().then((result) => {
			res.json(result);
		});
	} catch (err) {
		res.status(500).json(err);
	}
}

exports.getThoughtById = (req, res) => {
	try {
		Thought.findById(req.params.id).then((result) => {
			res.json(result);
		});
	} catch (err) {
		res.status(500).json(err);
	}
}

exports.createThought = (req, res) => {
	Thought.create(req.body).then((result) => {
		// User.findByIdAndUpdate(req.body.userId, {
		User.findOneAndUpdate(
			{_id: req.body.userId},
			{$push: {
				thoughts: result._id
			}
		}) .then(() =>{
			res.json(result);
		})
	});
}

exports.updateThought = (req, res) => {
	Thought.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	}).then((result) => {
		res.json(result);
	});
}

exports.deleteThought = (req, res) => {
	Thought.findByIdAndDelete(req.params.id).then((result) => {
		res.json(result);
	});
}

exports.addReaction = (req, res) => {
	Thought.update(
		{
			_id: req.params.thoughtId
		},
		{
			$push: {
				reactions: req.body
			}
		},
		{
			new: true
		}
	).then((result) => {
        Thought.findByIdAndUpdate(req.params.thoughtId, {$push: {reactions: result}}).then((result) => {
            res.json(result);
        });
    });
}

exports.removeReaction = (req, res) => {
	const update = {
        $pull: {
            reactions: {
				reactionId:req.params.reactionId
			}
        }
    };
	Thought.findByIdAndUpdate(req.params.thoughtId, update).then((result) => {
		res.json(result);
	});
}