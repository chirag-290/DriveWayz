const { Server } = require("socket.io");
const userModels = require("./models/user.model");
const captainModels = require("./models/captain.model");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", async (data) => {
        const { userId, userType } = data;
        console.log("User joined", userId, userType)

        if (userType === 'user') {
            await userModels.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === 'captain') {
            await captainModels.findByIdAndUpdate(userId, { socketId: socket.id });
        }
    });

    socket.on('update-location-captain', async (data) => {
        const { userId, location } = data;
        console.log("update location", userId, location);

        if (!location || !location.ltd || !location.lng) {
            return socket.emit('error', { message: 'Invalid location data' });
        }

        const geoJSONLocation = {
          type: 'Point',
          coordinates: [location.lng, location.ltd] // Note: GeoJSON uses [longitude, latitude]
      };

        await captainModels.findByIdAndUpdate(userId, {
          location: geoJSONLocation
        });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {

  console.log(messageObject);
  
      if (io) {
          io.to(socketId).emit(messageObject.event, messageObject.data);
      } else {
          console.log('Socket.io not initialized.');
      }
  }

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
