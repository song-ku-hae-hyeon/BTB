import React, { useState, useEffect } from 'react';
import { Stage, Layer, Text } from 'react-konva';

const Ant = () => {
  return (
    <>
      hello
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer onClick={() => console.log('asdf')}>
          <Text text={'hello'} />
        </Layer>
      </Stage>
    </>
  );
};

export default Ant;
