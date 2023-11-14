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
            className="h-16 w-16 bg-contain bg-no-repeat drop-shadow-2xl relative  hover:scale-105 transition-transform duration-200"
            disabled={disabled}
          >
            {spell.currentCooldown > 0 && (
              <h1 className="text-white text-6xl bg-black/70">
                {spell.currentCooldown}
              </h1>
            )}
            <Image src={spell.icon} alt="" fill className="-z-10" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-[url(../public/desc.png)] bg-cover bg-no-repeat bg-center border-0 rounded-none text-white">
          <h1 className="text-lg">{spell.name}:</h1>
          <p>{spell.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
