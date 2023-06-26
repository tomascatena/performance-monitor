import {Server} from 'socket.io';

const socketMain = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected to worker ${process.pid}`);

    socket.emit('welcome', `Welcome to our cluster driven socket.io server. You are on worker ${process.pid}.`);
  })
}

export default socketMain;