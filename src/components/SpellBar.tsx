import { useEffect } from "react";
import {
  Spell,
  HealAllSpell,
  RandomHealSpell,
  DamageSpell,
  DamageAllSpell,
  BoostDamageSpell,
  NerfDamageSpell,
} from "../game/spell";
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
    <div className="text-black bg-[url(../public/spellBar.png)] bg-contain bg-no-repeat h-4/5 w-40 overflow-hidden flex flex-col items-center pt-8 gap-1.5 pl-0.1 my-auto">
      {spells.map((spell) => (
        <SpellButton
          key={spell.name}
          spell={spell}
          onclick={() => turn(attacker, spell)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
