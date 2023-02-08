const router = require("express").Router();
const { User, Thought } = require("../models");

// Get all thoughts
router.get("/", (req, res) => {
	try {
		Thought.find().then((result) => {
			res.json(result);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get a thought
router.get("/:id", (req, res) => {
	try {
		Thought.findById(req.params.id).then((result) => {
			res.json(result);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Post a new thought
router.post("/", (req, res) => {
	Thought.create(req.body).then((result) => {
		res.json(result);
	});
});

// Put an update to a thought by _id
router.put("/:id", (req, res) => {
	Thought.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	}).then((result) => {
		res.json(result);
	});
});

// Delete the thought by _id
router.delete("/:id", (req, res) => {
	Thought.findByIdAndDelete(req.params.id).then((result) => {
		res.json(result);
	});
});

// REACTIONS

// Post reactions in reaction array field
router.post("/:thoughtId/reactions", (req, res) => {
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
});

// Delete reactions in from reaction array field
router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {
	const update = {
        $pull: {
            reactions: {
				_id:req.params.reactionId
			}
        }
    };
	Thought.findByIdAndUpdate(req.params.thoughtId, update).then((result) => {
		res.json(result);
	});
});

module.exports = router;