import React from 'react';
import { Image } from 'react-konva';
import type { AntProps } from './types';
import useImage from 'use-image';

const DeadAnt = ({ x, y }: AntProps) => {
  const [image] = useImage('https://svgsilh.com/svg/311140.svg');
  return <Image width={20} height={20} x={x} y={y} image={image} alt="dead-ant-image" />;
};

export default DeadAnt;
