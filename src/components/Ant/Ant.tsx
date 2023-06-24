import React from 'react';
import { Image } from 'react-konva';
import type { AntProps } from './types';
import useImage from 'use-image';

const Ant = ({ x, y }: AntProps) => {
  const [image] = useImage('https://i.pinimg.com/originals/1b/66/69/1b66698ba3bf0ec241c236b4df00503a.png');
  return <Image width={20} height={20} x={x} y={y} image={image} alt="ant-image" />;
};

export default Ant;
