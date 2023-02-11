const router = require("express").Router();
const { thoughtController } = require("../../controllers");

// /api/thoughts
router
	.route("/")
	.get(thoughtController.getAllThought)
	.post(thoughtController.createThought);

// /api/thoughts/:id
router
	.route("/:id")
	.get(thoughtController.getThoughtById)
	.put(thoughtController.updateThought)
	.delete(thoughtController.deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
    .post(thoughtController.addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
	.route("/:thoughtId/reactions/:reactionId")
	.delete(thoughtController.removeReaction);

module.exports = router;