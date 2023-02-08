const router = require("express").Router();
const userRoutes = require("./user-controller")
const thoughtRoutes = require("./thought-controller")

router.use("/api/user", userRoutes);
router.use("/api/thought", thoughtRoutes);

router.use("*", (req, res) => {
    res.send("Wrong route!!")
})

module.exports = router;