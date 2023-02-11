const router = require("express").Router();
const userRoutes = require("./user-controller")

router.use("/api/user", userRoutes);

router.use("*", (req, res) => {
    res.send("Wrong route!!")
})

module.exports = router;



// const router = require("express").Router();
// const apiRoutes = require("./api");

// router.use("/api", apiRoutes);

// router.use((req, res) => {
//   res.status(404).send("<h1>😝 404 Error!</h1>");
// });

// module.exports = router;