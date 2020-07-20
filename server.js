const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const beer = require("./routes/api/beer");
const orders = require("./routes/api/orders");
const path = require("path");
const cors = require('cors');
const Api = require("twilio/lib/rest/Api");
const app = express();
// Bodyparser middleware
app.use(cors());
app.options('*', cors())
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'public/build')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
	});
}else{
	app.use(express.static(path.join(__dirname, 'public/build')))
}

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
app.use(cors());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/beer", beer);
app.use("/api/orders", orders);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
