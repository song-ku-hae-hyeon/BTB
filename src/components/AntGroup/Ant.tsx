import { Image } from 'react-konva';
import { AntData } from '@recoil';
import useImage from 'use-image';
import { IMAGE } from '@static';
import { useEffect, useState } from 'react';

const images = [IMAGE.ANT1_URL, IMAGE.ANT2_URL];

const Ant = ({ x, y }: AntData) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 100); // 1초마다 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  const [image] = useImage(images[imageIndex]);
  return <Image width={32} height={32} x={x} y={y} image={image} alt="ant-image" />;
};

export default Ant;
