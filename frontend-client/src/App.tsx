import { Container, Typography } from '@mui/material';
import { PerformanceData, PerformanceDataState } from '@/types/performanceData';
import { useEffect, useState } from 'react';
import Widget from '@/components/Widget/Widget';
import socket from './socketConnection';

const App = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceDataState>({});

  useEffect(() => {
    socket.on(`performanceData`, (data: PerformanceData) => {
      setPerformanceData((prevState) => ({
        ...prevState,
        [data.macAddress]: data,
      }));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
