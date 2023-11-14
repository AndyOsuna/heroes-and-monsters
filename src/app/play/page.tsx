"use client";
import { useCallback, useState } from "react";

import SpellBar from "@/components/SpellBar";
import { Monster } from "@/game/monster";
import Side from "@/game/side";
import { Warrior } from "@/game/hero";
import Weapon from "@/game/weapon";

import {
  Spell,
  HealAllSpell,
  RandomHealSpell,
  DamageSpell,
  DamageAllSpell,
  BoostDamageSpell,
} from "@/game/spell";
import MenuFinish from "@/components/MenuFinish";

let spells = {
  sideOneSpells: [
    new HealAllSpell(),
    new RandomHealSpell(),
    new DamageSpell(),
    new DamageAllSpell(),
    new BoostDamageSpell(),
  ],
  sideTwoSpells: [
    new HealAllSpell(),
    new RandomHealSpell(),
    new DamageSpell(),
    new DamageAllSpell(),
    new BoostDamageSpell(),
  ],
};

let bando1 = new Side([new Warrior(new Weapon("Sable laser", 5))]);
let bando2 = new Side([
  new Monster(35, new Weapon("palo", 3)),
  new Monster(35, new Weapon("palo", 10)),
  new Monster(35, new Weapon("palo", 5)),
]);

export default function Home() {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "finished">(
    "playing"
  );

  const turn = useCallback((attacker: number, usedSpell: Spell) => {
    setCurrentTurn((t) => ++t);
    /**
     * Le bajo el cd a todas las habilidades antes del turno porque cuando se usan en attack se les pone el cd en turnos
     * que corresponde.
     */
    spells.sideOneSpells.forEach((spell) => spell.lowCooldown());
    spells.sideTwoSpells.forEach((spell) => spell.lowCooldown());

    if (attacker == 1) bando1.attack(bando2, usedSpell);
    else bando2.attack(bando1, usedSpell);

    console.log("Turn end");
    if (bando1.isDead()) {
      console.log("Ganó el bando 2 :D");
      setGameStatus("finished");
    } else if (bando2.isDead()) {
      console.log("Ganó el bando 1 :P");
      setGameStatus("finished");
    }
  }, []);

  return (
    <main className="bg-[url(https://i.postimg.cc/0NwQq9VN/bg-play.png)] bg-center bg-no-repeat h-screen w-screen flex justify-between p-2">
      {gameStatus === "playing" && (
        <>
          <SpellBar
            spells={spells.sideOneSpells}
            turn={turn}
            attacker={1}
            disabled={currentTurn % 2 === 0}
          />
          <SpellBar
            spells={spells.sideTwoSpells}
            turn={turn}
            attacker={2}
            disabled={currentTurn % 2 !== 0}
          />
        </>
      )}
      {gameStatus === "finished" && <MenuFinish />}
    </main>
  );
}
