import { PerformanceData } from '@/types/performanceData';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const CPU = ({ performanceData }: Props) => {
  return (
    <div>CPU</div>
  );
};

export default CPU;
