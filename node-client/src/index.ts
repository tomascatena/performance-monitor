import os from 'os';

// Memory in bytes
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const memoryUsage = (totalMemory - freeMemory) / totalMemory;

// OS Type
const osType = os.type();
const osRelease = os.release();
const osPlatform = os.platform();
const osArch = os.arch();

// Uptime
const uptime = os.uptime();

// CPU Info
const cpus = os.cpus();
const cpuModel = cpus[0].model;
const cpuSpeed = cpus[0].speed;
const cpuLoad = cpus[0].times;
const numCores = cpus.length;

const performance = {
  totalMemory,
  freeMemory,
  memoryUsage,
  uptime,
  osType,
  osRelease,
  osPlatform,
  osArch,
  cpuModel,
  cpuSpeed,
  cpuLoad,
  numCores,
};

console.log(performance);
