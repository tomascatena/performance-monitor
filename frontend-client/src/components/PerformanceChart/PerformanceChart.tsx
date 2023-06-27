import { Box, Typography } from '@mui/material';
import { useRef } from 'react';
import drawCircle from '@/utils/drawCircle';

type Props = {
  parameter: number;
  significantDigits?: number;
};

const PerformanceChart = ({
  parameter,
  significantDigits = 1
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  drawCircle(canvasRef.current, parameter);

  return (
    <Box
      sx={{
        position: `relative`,
        width: `300px`,
        height: `300px`,
        justifyContent: `center`,
      }}
    >
      <canvas
        ref={canvasRef}
        width="300"
        height="300"
        style={{ position: `absolute` }}
      />

      <Typography
        sx={{
          position: `absolute`,
          top: `50%`,
          left: `50%`,
          transform: `translate(-50%, -50%)`,
        }}
        variant="h4"
      >
        {parameter.toFixed(significantDigits)}%
      </Typography>
    </Box>
  );
};

export default PerformanceChart;
