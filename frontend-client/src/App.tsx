import { Container, Typography } from '@mui/material';
import { PerformanceData, PerformanceDataState } from '@/types/performanceData';
import { useEffect, useState } from 'react';
import socket from './socketConnection';

const App = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceDataState>({});

  useEffect(() => {
    socket.on(`performanceData`, (data: PerformanceData) => {
      setPerformanceData((prevState) => ({
        ...prevState,
        [data.macAddress]: data,
      }));

      console.log(performanceData);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Typography variant="h3">Performance Monitor</Typography>
    </Container>
  );
};

export default App;
