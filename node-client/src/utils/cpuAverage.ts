import os, { CpuInfo } from 'os';

const cpuAverage = () => {
  const cpus: CpuInfo[] = os.cpus();

  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((singleCore) => {
    Object.keys(singleCore.times).forEach((mode) => {
      totalMs += singleCore.times[mode as keyof CpuInfo['times']];
    });

    idleMs += singleCore.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

export default cpuAverage;
