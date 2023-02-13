const express = require("express");
const app = express();
const db = require("./config/connection");
const routes = require("./routes");

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(routes)

db.once("open", () => {
    app.listen(3001, () => {
        console.log("Server is running on PORT 3001!")
    })
})

