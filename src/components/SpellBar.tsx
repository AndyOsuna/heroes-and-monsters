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
    <div className="text-black bg-[url(../public/spellBar.png)] bg-contain bg-no-repeat h-4/5 w-40 overflow-hidden flex flex-col items-center pt-8 gap-1.5 pl-0.1 my-auto relative">
      <div className="absolute w-1 h-1 bg-red-500 top-0 left-0" />
      {spells.map((spell) => (
        <SpellButton
          key={spell.name}
          spell={spell}
          onclick={() => turn(attacker, spell)}
          disabled={disabled || spell.currentCooldown > 0}
        />
      ))}
    </div>
  );
}
