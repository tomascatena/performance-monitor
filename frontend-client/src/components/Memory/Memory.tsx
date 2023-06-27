import { Box, Typography } from '@mui/material';
import { PerformanceData } from '@/types/performanceData';
import { useRef } from 'react';
import PerformanceChart from '../PerformanceChart/PerformanceChart';
import drawCircle from '@/utils/drawCircle';

type Props = {
  performanceData: PerformanceData;
};

const Memory = ({ performanceData }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  drawCircle(canvasRef.current, performanceData.cpuLoad);

  const toGB = (bytes: number) => bytes / 1024 / 1024 / 1024;

  return (
    <Box
      sx={{
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
    >
      <Typography variant="h5">Memory Usage</Typography>

      <PerformanceChart
        significantDigits={2}
        parameter={performanceData.memoryUsage * 100}
      />

      <Typography variant="h6">
        Free Memory: {toGB(performanceData.freeMemory).toFixed(2)} GB
      </Typography>

      <Typography variant="h6">
        Total Memory: {toGB(performanceData.totalMemory).toFixed(2)} GB
      </Typography>
    </Box>
  );
};

export default Memory;
