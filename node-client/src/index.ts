import io from 'socket.io-client';
import performanceLoadData from './utils/performanceLoadData';

const socket = io('http://localhost:8080');

socket.on('connect', () => {
  console.log('connected');
});

const run = async () => {
  const data = await performanceLoadData();
  console.log(data);
};

run();

export default performanceLoadData;
