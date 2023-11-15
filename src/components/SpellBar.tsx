import { Spell } from "../game/spell";
import SpellButton from "./SpellButton";
import { CSSProperties } from 'react';

export default function SpellBar({
  spells,
  turn,
  attacker,
  disabled,
}: {
  spells: Spell[];
  turn: (attacker: number, spell: Spell) => void;
  attacker: number;
  disabled: boolean;
}) {

  const redOverlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '90%',
    height: '90%',
    backgroundImage: "url('https://i.postimg.cc/kXbsqwZC/panel-Cerrado.png')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: 11,
  };
  return (
    <div className="text-black h-full w-40 items-center justify-center z-10 relative"> 
      {disabled && <div className="ml-2 flex justify-center items-center mt-10 " style={redOverlayStyle}></div>}
      <div className="bg-[url(../public/panel.png)] bg-contain bg-no-repeat bg-center h-full w-40 flex flex-col justify-center items-center gap-3 pt-16" >
    {spells.map((spell) => (
      
        <SpellButton
          key={spell.name}
          spell={spell}
          onclick={() => turn(attacker, spell)}
          disabled={disabled || spell.currentCooldown > 0}
        />
      
    ))}
    </div>
  </div>
  
  );
}
