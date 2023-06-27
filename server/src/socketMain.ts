import { Server } from 'socket.io';

const connectedReactClients: string[] = [];
const connectedNodeClients = new Map<string, string | null>();

const socketMain = (io: Server) => {
  io.on('connection', (socket) => {
    const { auth } = socket.handshake;

    switch (auth.token) { // Check for API key and filter clients into rooms
      case 'abc123':
        console.log(`Socket ${socket.id} joined room node-clients`);
        connectedNodeClients.set(socket.id, null);
        socket.join('node-clients');
        break;

      case 'def456':
        console.log(`Socket ${socket.id} joined room react-clients`);
        connectedReactClients.push(socket.id);
        socket.join('react-clients');
        break;

      default:
        socket.disconnect();
        console.log(`Socket ${socket.id} disconnected`);
        break;
    }

    console.log(`Socket ${socket.id} connected to worker ${process.pid}`);

    socket.emit('welcome', `Welcome to our cluster driven socket.io server. You are on worker ${process.pid}.`);

    socket.on('performance-data', (data) => {
      if (connectedNodeClients.get(socket.id) !== data.macAddress) {
        connectedNodeClients.set(socket.id, data.macAddress);

        io.to('react-clients').emit('node-client-connected-or-not', {
          isAlive: true,
          macAddress: data.macAddress,
        });
      }

      io.to('react-clients').emit('performance-data', data);
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);

      if (connectedReactClients.includes(socket.id)) {
        connectedReactClients.splice(connectedReactClients.indexOf(socket.id), 1);
      }

      if (connectedNodeClients.has(socket.id)) {
        io.to('react-clients').emit('node-client-connected-or-not', {
          isAlive: false,
          macAddress: connectedNodeClients.get(socket.id),
        });

        connectedNodeClients.delete(socket.id);
      }
    });
  });
};

export default socketMain;
