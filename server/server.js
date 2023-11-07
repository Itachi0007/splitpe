const express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
require("dotenv").config();
var path = require("path");
var mongoose = require("mongoose");
var cors = require("cors");

const config = require("./config/config.js");
const router = require("./routes.js");

const app = express();
app.use(cors());
// parse url encoded objects through middleware
app.use(bodyParser.urlencoded({extended: true}));
// parse json objects
app.use(bodyParser.json());
// importing the routes
app.use("/", router);

// serves all our static files from the build directory
app.use(express.static(path.join(__dirname, "build")));
// serves the index.html file on any unknown routes
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

// configuring the database
mongoose.connect(config.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.get("/status", (req, res) => {
	var dict = {
		status: "Service up!",
		result: "SUCCESS",
		method: req.method,
		source: req.url,
	};
	return res.status(200).send(dict);
});

app.all("/*", function (req, res, next) {
	// CORS Headers
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
		return res.status(200).json({});
	}
	next();
});

app.listen(config.PORT, function () {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
