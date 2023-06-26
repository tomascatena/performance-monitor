import getDeviceMacAddress from './utils/getDeviceMacAddress';
import getPerformanceLoadData from './utils/getPerformanceLoadData';
import io from 'socket.io-client';

const options = {
  auth: {
    token: 'abc123', // Kind of API key
  },
};

const socket = io('http://localhost:8080', options);

socket.on('connect', () => {
  const macAddressList = getDeviceMacAddress();

  const performanceDataInterval = setInterval(async () => {
    const performanceData = await getPerformanceLoadData();

    socket.emit('performanceData', {
      ...performanceData,
      macAddress: macAddressList[0],
    });
  }, 1000);

  socket.on('disconnect', () => {
    clearInterval(performanceDataInterval);
  });
});
