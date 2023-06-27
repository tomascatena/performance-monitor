import { Box, Card, Typography } from '@mui/material';
import { PerformanceData } from '@/types/performanceData';
import CPU from '@/components/CPU/CPU';
import MachineInfo from '@/components/MachineInfo/MachineInfo';
import Memory from '@/components/Memory/Memory';
import React, { useEffect, useState } from 'react';
import socket from '@/socketConnection';

type Props = {
  performanceData: PerformanceData;
};

type NodeClientConnectedOrNot = {
  isAlive: boolean;
  macAddress: string;
};

const Widget = ({ performanceData }: Props) => {
  const [isNodeClientAlive, setIsNodeClientAlive] = useState(true);

  useEffect(() => {
    const handleClientConnected = ({ isAlive, macAddress }: NodeClientConnectedOrNot) => {
      console.log(`node-client-connected-or-not`, { isAlive, macAddress });
      if (performanceData.macAddress === macAddress) {
        setIsNodeClientAlive(isAlive);
      }
    };

    socket.on(`node-client-connected-or-not`, handleClientConnected);

    // Clean up function that will run when component unmounts or performanceData changes
    return () => {
      socket.off(`node-client-connected-or-not`, handleClientConnected);
    };
  }, [performanceData.macAddress]);

  return (
    <Card
      elevation={3}
      sx={{
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
          mb: 3,
          backgroundColor: isNodeClientAlive ? `#fff` : `#f44336`,
          color: isNodeClientAlive ? `#000` : `#fff`,
          borderRadius: 1,
        }}
      >
        <Typography variant="h4">{performanceData.hostname}</Typography>

        <Typography variant="h5">({performanceData.macAddress})</Typography>

        {
          isNodeClientAlive
            ? <Typography variant="h5">is connected</Typography>
            : <Typography variant="h5">is offline</Typography>
        }
      </Box>

      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: `repeat(3, 1fr)`,
          alignItems: `start`
        }}
      >
        <CPU performanceData={performanceData} />
        <Memory performanceData={performanceData} />
        <MachineInfo performanceData={performanceData} />
      </Box>
    </Card>
  );
};

export default Widget;
