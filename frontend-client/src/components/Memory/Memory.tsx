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
    </Box>
  );
};

export default Memory;
