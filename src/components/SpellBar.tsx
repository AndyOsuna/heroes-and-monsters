import { Spell } from "../game/spell";
import SpellButton from "./SpellButton";


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
  return (
    <div className="text-black h-full w-40 items-center justify-center z-10"> 
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
