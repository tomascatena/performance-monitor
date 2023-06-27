import { PerformanceData } from '@/types/performanceData';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const Memory = ({ performanceData }: Props) => {
  return (
    <div>Memory</div>
  );
};

export default Memory;
