import { io } from 'socket.io-client';

const options = {
  auth: {
    token: `def456`,
  }
};

const socket = io(`http://localhost:8080`, options);

socket.on(`connect`, () => {
  console.log(`Connected to server`);
});

socket.on(`welcome`, (data) => {
  console.log(data);
});

export default socket;
