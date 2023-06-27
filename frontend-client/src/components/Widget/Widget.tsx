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
        padding: `1rem`,
        margin: `1rem`,
      }}
    >
      <Typography variant="h4">Widget</Typography>

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
