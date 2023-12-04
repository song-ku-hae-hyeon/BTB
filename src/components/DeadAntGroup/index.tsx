import { deadAntSelector } from '@recoil';
import { Layer } from 'react-konva';
import { useRecoilValue } from 'recoil';
import Ant from '../AntGroup/Ant';
import DeadAnt from './DeadAnt';

const DeadAntGroup = () => {
  const deadAnts = useRecoilValue(deadAntSelector);
  return (
    <Layer>
      {deadAnts.map((deadAnt, idx) => (
        <DeadAnt {...deadAnt} key={idx} />
      ))}
    </Layer>
  );
};

export default DeadAntGroup;