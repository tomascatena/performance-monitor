import { io } from 'socket.io-client';

const socketConnection = () => {
  const socket = io(`http://localhost:8080`);

  socket.on(`connect`, () => {
    console.log(`Connected to server`);
  });

  socket.on(`welcome`, (data) => {
    console.log(data);
  });

  return socket;
};

export default socketConnection;
