import { Box, Typography } from '@mui/material';
import { PerformanceData } from '@/types/performanceData';
import CPU from '@/components/CPU/CPU';
import MachineInfo from '@/components/MachineInfo/MachineInfo';
import Memory from '@/components/Memory/Memory';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const Widget = ({ performanceData }: Props) => {
  return (
    <Box
      sx={{
        border: `1px solid #fff`,
        borderRadius: `5px`,
        p: 1,
        m: 1,
      }}
    >
      <Box
        sx={{
          display: `flex`,
          alignItems: `center`,
          gap: 1,
          justifyContent: `center`,
          mb: 3
        }}
      >
        <Typography variant="h4">{performanceData.hostname}</Typography>

        <Typography variant="h5">({performanceData.macAddress})</Typography>
      </Box>

      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: `repeat(3, 1fr)`,
        }}
      >
        <CPU performanceData={performanceData} />
        <Memory performanceData={performanceData} />
        <MachineInfo performanceData={performanceData} />
      </Box>
    </Box>
  );
};

export default Widget;
