const router = require("express").Router();
const userRoutes = require("./user-controller")

router.use("/api/user", userRoutes);

router.use("*", (req, res) => {
    res.send("Wrong route!!")
})

module.exports = router;