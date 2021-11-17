const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require('./controllers')
const PORT = process.env.PORT || 3001;
const db = require("./models");
const { Workout } = require("./models");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
app.use(routes);

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}!  Visit http://localhost:${PORT}`);
});