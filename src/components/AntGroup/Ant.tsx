import { Image } from 'react-konva';
import { AntData } from '@recoil';
import useImage from 'use-image';
import { IMAGE } from '@static';
import { useEffect, useState } from 'react';

const Ant = ({ x, y }: AntData) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [image] = useImage(IMAGE.ANT_SPRITE_URL);
  const imageLength = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % imageLength);
    }, 100); // 0.1초마다 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);
  const crop = {
    x: 64 * imageIndex,
    y: 0,
    width: 64,
    height: 64,
  };

  return <Image width={32} height={32} x={x} y={y} image={image} alt="ant-image" crop={crop} />;
};

export default Ant;
