import React, { useEffect, useRef } from 'react';

const Cursor = (props: { paper: React.MutableRefObject<HTMLDivElement> }) => {
  const { paper } = props;
  const imgRef = useRef<any>();

  console.log(props);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      event.preventDefault();

      const mouseY = event.clientY;
      const mouseX = event.clientX;

      console.log(`${mouseX} ${mouseY}`);

      // @ts-ignore
      imgRef.current.style.transform = `translate3d(${mouseX - 30}px, ${mouseY - 70}px, 0)`;
    };

    const handleMouseClick = (event: any) => {
      const mouseY = event.clientY;
      const mouseX = event.clientX;

      imgRef.current.animate(
        [
          {
            transform: `translate3d(${mouseX - 30}px, ${mouseY - 90}px, 0)`,
          },
          {
            transform: `translate3d(${mouseX - 30}px, ${mouseY - 50}px, 0)`,
          },
          {
            transform: `translate3d(${mouseX - 30}px, ${mouseY - 90}px, 0)`,
          },
        ],
        { duration: 300, iterations: 1 },
      );
    };
    // @ts-ignore
    paper.current.addEventListener('mousemove', handleMouseMove);
    paper.current.addEventListener('click', handleMouseClick);
  }, [imgRef.current]);

  return <img width="70px" height="70px" id="cursor" src="/stamp.png" ref={imgRef} alt="image" />;
};

export default Cursor;
