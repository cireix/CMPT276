let io;
module.exports = {
    init: function(server) {
        io = require('socket.io').listen(server);
        return io;
    },
    getIO: function() {
        if (!io) {
            throw new Error("must init before calling");
        }
        return io;
    }
}