const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require('cors');
const Api = require("twilio/lib/rest/Api");
const { Console } = require("console");

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server up and running on port ${port} !`));

var io = require("./config/socket").init(server);
const users = require("./routes/api/users");
const beer = require("./routes/api/beer");
const orders = require("./routes/api/orders");



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





io.on("connection",(socket) => {
	socket.on('set', (user) => {
		socket.user = user;
		console.log(socket.user, "online")
		io.to(socket.id).emit("test",socket.id)
	});
	socket.on("logout",(user) => {
		console.log(socket.user, "offline")
		socket.user = null;
	})
	socket.on("accepted",(user) => {
		const socketList = io.sockets.sockets;
		for(var x in socketList){
			const c = socketList[x];
			if(user === c.user) {
				io.to(c.id).emit("accepted");
			}
		}
	})
	socket.on("almost",(user,eta) => {
		const socketList = io.sockets.sockets;
		for(var x in socketList){
			const c = socketList[x];
			if(user === c.user) {
				io.to(c.id).emit("almost",eta);
			}
		}
	})
	socket.on("here",(user) => {
		const socketList = io.sockets.sockets;
		for(var x in socketList){
			const c = socketList[x];
			if(user === c.user) {
				io.to(c.id).emit("here");
			}
		}
	})
	socket.on("location",(user,loc) => {
		const socketList = io.sockets.sockets;
		for(var x in socketList){
			const c = socketList[x];
			if(user === c.user) {
				io.to(c.id).emit("location",loc);
			}
		}
	})
})

module.exports = {
	init: function(server) {
        // start socket.io server and cache io value
        io = require('socket.io').listen(server); io.origins('*:*');
        return io;
    },
	getIO: function() {
		return io;
	}
}