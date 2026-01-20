let io;

export const initSocket = (serverIo) => {
  io = serverIo;
};

export const emitNotification = (userId) => {
  if (io) {
    io.to(userId).emit("new-notification");
  }
};
