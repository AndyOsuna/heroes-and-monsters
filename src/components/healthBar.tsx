import React from 'react';
import Character from '@/game/character';

interface HealthBarProps {
  maxHp: number;
  currentHp: number;
}

const HealthBar = ({ maxHp, currentHp }: HealthBarProps) => {
  const hpPorcentaje = (currentHp / maxHp) * 100;
  return (
    <div style={{ width: '100px', height: '20px' , backgroundColor: '#917070', border: '5px inset #ac1c1c' }}>
      <div style={{ width: `${hpPorcentaje}%`,height: '11px', backgroundColor: '#ac1c1c'}} className='flex items-center text-xs'>
     {currentHp}/{maxHp}
      </div>
    </div>
  );
};

export default HealthBar;
