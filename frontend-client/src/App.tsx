import { Container, Typography } from '@mui/material';
import { PerformanceData, PerformanceDataState } from '@/types/performanceData';
import { useEffect, useState } from 'react';
import Widget from '@/components/Widget/Widget';
import socket from './socketConnection';

const App = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceDataState>({});

  useEffect(() => {
    const handlePerformanceDataUpdate = (data: PerformanceData) => {
      setPerformanceData((prevState) => ({
        ...prevState,
        [data.macAddress]: data,
      }));
    };

    socket.on(`performance-data`, handlePerformanceDataUpdate);

    // Clean up function that will run when component unmounts
    return () => {
      socket.off(`performance-data`, handlePerformanceDataUpdate);
    };
  }, []);

  return (
    <Container maxWidth='xl'>
      <Typography
        variant="h3"
        align="center"
      >
        Performance Monitor
      </Typography>

      {
        Object.keys(performanceData).map((key) => (
          <Widget
            key={key}
            performanceData={performanceData[key]}
          />
        ))
      }
    </Container>
  );
};

export default App;
