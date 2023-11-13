import { Spell } from "@/game/spell";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SpellButton({
  spell,
  onclick,
  disabled,
}: {
  spell: Spell;
  onclick: () => any;
  disabled: boolean;
}) {
  const [_xD, setRerender] = useState(false);

  return (
    <button
      onClick={() => {
        onclick();
        setRerender((xd) => !xd);
      }}
      className="h-20 w-20 bg-contain bg-no-repeat drop-shadow-2xl relative"
      disabled={disabled}
    >
      <h1 className="text-blue-400 font-bold text-2xl bg-black/70">
        {spell.currentCooldown}
      </h1>
      <Image src={spell.icon} alt="" fill className="-z-10" />
    </button>
  );
}
