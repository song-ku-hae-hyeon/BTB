import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { IMAGE } from '@static';
import { AntData } from '@recoil';

const DeadAnt = ({ x, y }: AntData) => {
  const [image] = useImage(IMAGE.DEAD_ANT_URL);
  return <Image width={56} height={56} x={x - 12} y={y - 12} image={image} alt="dead-ant-image" />;
};

export default DeadAnt;
