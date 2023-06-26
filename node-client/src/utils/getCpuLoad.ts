import cpuAverage from './cpuAverage';

/**
 * Get CPU load. Because the times property on cpus is time since boot, we will get
 * now times, and 100ms from 'now' times. Compare the two, that will give us current load.
 * @returns
 */
const getCpuLoad = (interval: number = 100) => {
  const start = cpuAverage();

  return new Promise((resolve) => {
    setTimeout(() => {
      const end = cpuAverage();

      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;

      resolve(100 - Math.floor((100 * idleDifference) / totalDifference));
    }, interval);
  });
};

export default getCpuLoad;
