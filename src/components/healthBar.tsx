import React from 'react';
import Character from '@/game/character';

interface HealthBarProps {
  maxHp: number;
  currentHp: number;
}

const HealthBar = ({ maxHp, currentHp }: HealthBarProps) => {
  const hpPorcentaje = (currentHp / maxHp) * 100;
  return (
    <div style={{ width: '100px', backgroundColor: '#a35b5b', border: '5px groove #ac1c1c' }}>
      <div style={{ width: `${hpPorcentaje}%`, backgroundColor: '#ac1c1c'}}>
     {currentHp}/{maxHp}
      </div>
    </div>
  );
};

export default HealthBar;
