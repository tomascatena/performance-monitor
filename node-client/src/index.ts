import getDeviceMacAddress from './utils/getDeviceMacAddress';
import io from 'socket.io-client';
import performanceLoadData from './utils/performanceLoadData';

const socket = io('http://localhost:8080');

socket.on('connect', () => {
  // We need a way to identify this machine to the server for front-end clients
  console.log('connected');
  console.log(socket.id);

  const macAddresses = getDeviceMacAddress();

  console.log(macAddresses);
});

const run = async () => {
  const data = await performanceLoadData();
  console.log(data);
};

run();

export default performanceLoadData;
