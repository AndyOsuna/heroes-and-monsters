import { Spell } from "@/game/spell";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SpellButton({
  spell,
  onclick,
  disabled,
}: {
  spell: Spell;
  onclick: () => any;
  disabled: boolean;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => onclick()}
            className="h-20 w-20 bg-contain bg-no-repeat drop-shadow-2xl relative"
            disabled={disabled}
          >
            {spell.currentCooldown > 0 && (
              <h1 className="text-white font-light text-6xl bg-black/70">
                {spell.currentCooldown}
              </h1>
            )}
            <Image src={spell.icon} alt="" fill className="-z-10" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-neutral-950 text-white">
          <h1 className="text-lg">{spell.name}:</h1>
          <p>{spell.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
