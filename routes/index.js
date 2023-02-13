const router = require("express").Router();
const { userRoutes, thoughtRoutes } = require("./api")

router.use("/api/user", userRoutes);
router.use("/api/thought", thoughtRoutes);

module.exports = router;