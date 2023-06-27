export type PerformanceData = {
  totalMemory: number;
  freeMemory: number;
  memoryUsage: number;
  osType: string;
  uptime: number;
  osRelease: string;
  osPlatform: string;
  osArch: string;
  cpuModel: string;
  cpuSpeed: number;
  numCores: number;
  cpuLoad: number;
  macAddress: string;
};

export type PerformanceDataState = {
  [key: string]: PerformanceData;
};
