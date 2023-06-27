import { PerformanceData } from '@/types/performanceData';
import { Typography } from '@mui/material';
import { duration } from 'moment';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const MachineInfo = ({ performanceData }: Props) => {
  return (
    <div>
      <Typography variant="h5">Operating System</Typography>
      <Typography variant="body1">Platform: {performanceData.osType}</Typography>
      <Typography variant="body1">Release: {performanceData.osRelease}</Typography>
      <Typography variant="body1">Architecture: {performanceData.osArch}</Typography>

      <Typography
        sx={{ mt: 2 }}
        variant="h5"
      >
        Time Online
      </Typography>
      <Typography variant="body1">{duration(performanceData.uptime, `seconds`).humanize()}</Typography>

      <Typography
        sx={{ mt: 2 }}
        variant="h5"
      >
        Processor information
      </Typography>
      <Typography variant="body1">Type: {performanceData.cpuModel}</Typography>
      <Typography variant="body1">Number of Cores: {performanceData.numCores}</Typography>
      <Typography variant="body1">Clock Speed: {performanceData.cpuSpeed} MHz</Typography>
    </div>
  );
};

export default MachineInfo;
