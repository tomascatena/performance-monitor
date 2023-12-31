import getCpuLoad from './getCpuLoad';
import os, { CpuInfo } from 'os';

/**
 * Get performance load data.
 * @param interval The time interval in milliseconds to get the CPU load
 * @returns Performance load data
 */
const getPerformanceLoadData = async (interval: number = 100) => {
  // Memory information in bytes
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const memoryUsage = (totalMemory - freeMemory) / totalMemory;

  // OS Information
  const osType = os.type();
  const osRelease = os.release();
  const osPlatform = os.platform();
  const osArch = os.arch();
  const hostname = os.hostname();

  const uptime = os.uptime();

  // CPU Information
  const cpus: CpuInfo[] = os.cpus();
  const cpuModel = cpus[0].model;
  const cpuSpeed = cpus[0].speed;
  const numCores = cpus.length;

  const cpuLoad = await getCpuLoad(interval);

  return {
    totalMemory,
    freeMemory,
    memoryUsage,
    osType,
    uptime,
    osRelease,
    osPlatform,
    osArch,
    hostname,
    cpuModel,
    cpuSpeed,
    numCores,
    cpuLoad,
  };
};

export default getPerformanceLoadData;
