import performanceLoadData from './utils/performanceLoadData';

export default performanceLoadData;

const run = async () => {
  const data = await performanceLoadData();
  console.log(data);
};

run();
