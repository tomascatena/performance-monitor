import { Server } from 'socket.io';

const socketMain = (io: Server) => {
  io.on('connection', (socket) => {
    const { auth } = socket.handshake;

    switch (auth.token) { // Check for API key and filter clients into rooms
      case 'abc123':
        console.log(`Socket ${socket.id} joined room node-clients`);
        socket.join('node-clients');
        break;

      case 'def456':
        console.log(`Socket ${socket.id} joined room react-clients`);
        socket.join('react-clients');
        break;

      default:
        socket.disconnect();
        console.log(`Socket ${socket.id} disconnected`);
        break;
    }

    console.log(`Socket ${socket.id} connected to worker ${process.pid}`);

    socket.emit('welcome', `Welcome to our cluster driven socket.io server. You are on worker ${process.pid}.`);

    socket.on('performanceData', (data) => {
      console.log('performanceData', data);

      io.to('react-clients').emit('performanceData', data);
    });
  });
};

export default socketMain;
