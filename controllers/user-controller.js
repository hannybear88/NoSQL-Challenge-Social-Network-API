const router = require("express").Router();
const { User } = require("../models");

router.get("/", (req, res) => {
  try {
    User.find().then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.post("/", (req, res) => {
  User.create(req.body).then((result) => {
    res.json(result);
  });
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).then((result) => {
    res.json(result);
  });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  });
});



// ADD FRIEND
// router.post("/:userId/friends/:friendId", (req, res) => {

// })



// DELETE FRIEND

module.exports = router;
