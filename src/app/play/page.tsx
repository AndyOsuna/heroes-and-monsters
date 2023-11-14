"use client";
import MenuFinish from "@/components/MenuFinish";
import SpellBar from "@/components/SpellBar";
import Character from "@/game/character";
import { Warrior, Wizard } from "@/game/hero";
import { Monster } from "@/game/monster";
import Side from "@/game/side";
import {
  BoostDamageSpell,
  DamageAllSpell,
  DamageSpell,
  HealAllSpell,
  RandomHealSpell,
  Spell,
} from "@/game/spell";
import Weapon from "@/game/weapon";
import { cn } from "@/lib/utils";
import MonsterImage from "@/public/monster1.png";
import NullImage from "@/public/nullImage.png";
import WarriorImage from "@/public/warrior.png";
import WizardImage from "@/public/wizard.png";
import Image from "next/image";
import { useCallback, useState } from "react";

const getCharacterImage = (character: Character) => {
  switch (character.constructor.name) {
    case "Warrior":
      return WarriorImage;
    case "Wizard":
      return WizardImage;
    case "Monster":
      return MonsterImage;
    default:
      return NullImage;
  }
};

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

let bando1 = new Side([
  new Warrior(new Weapon("Sable laser", 5)),
  new Wizard(),
]);
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
  /*  const [characterPosition, setCharacterPosition] = useState({
    bando1: Array(bando1.getCharacters().length)
      .fill({ x: 0, y: 0 })
      .map((_, index) => ({ x: 0, y: index * 10 })),
    bando2: Array(bando2.getCharacters().length)
      .fill({ x: 0, y: 0 })
      .map((_, index) => ({ x: 200, y: index * 10 })),
  });

  const updateCharacterPosition = useCallback(() => {
    setCharacterPosition({
      bando1: bando1
        .getCharacters()
        .map((_, index) => ({ x: 0, y: index * 10 })),
      bando2: bando2
        .getCharacters()
        .map((_, index) => ({ x: 400, y: index * 10 })),
    });
  }, []);

  useEffect(() => {
    updateCharacterPosition();
  }, [currentTurn, updateCharacterPosition]); */

  const turn = useCallback((attacker: number, usedSpell: Spell) => {
    setCurrentTurn((t) => ++t);

    /* Le bajo el cd a todas las habilidades antes del turno porque cuando se usan en attack se les pone el cd en turnos
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
    <main className="bg-[url(https://i.postimg.cc/0NwQq9VN/bg-play.png)] bg-center bg-no-repeat h-screen w-screen flex justify-between items-center  p-2">
      {gameStatus === "playing" && (
        <>
          <SpellBar
            spells={spells.sideOneSpells}
            turn={turn}
            attacker={1}
            disabled={currentTurn % 2 !== 0}
          />
          <div className="flex justify-between w-[600px] h-[400px]">
            <div className="mr-40 relative">
              {bando1.getCharacters().map((char, index) => (
                <div
                  key={index}
                  style={{ top: `${index * 150}px` }}
                  className={cn(
                    `absolute w-[150px] h-[150px] transition-all duration-500`,
                    currentTurn !== 0 && currentTurn % 2 !== 0
                      ? "left-20"
                      : "left-0"
                  )}
                >
                  <p className="bg-white w-fit mx-auto px-1 rounded text-sm">
                    {char.health}
                  </p>
                  <Image
                    className=""
                    width={150}
                    height={150}
                    src={getCharacterImage(char)}
                    alt={`${char.constructor.name} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="ml-40 relative">
              {bando2.getCharacters().map((char, index) => (
                <div
                  key={index}
                  style={{ top: `${index * 150}px` }}
                  className={cn(
                    `absolute w-[150px] h-[150px] transition-all duration-500`,
                    currentTurn !== 0 && currentTurn % 2 === 0
                      ? "right-20"
                      : "right-0"
                  )}
                >
                  <p className="bg-white w-fit mx-auto px-1 rounded text-sm">
                    {char.health}
                  </p>
                  <Image
                    className="absolute"
                    width={150}
                    height={150}
                    key={index}
                    src={getCharacterImage(char)}
                    style={{}}
                    alt={`${char.constructor.name} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <SpellBar
            spells={spells.sideTwoSpells}
            turn={turn}
            attacker={2}
            disabled={currentTurn % 2 === 0}
          />
        </>
      )}
      {gameStatus === "finished" && <MenuFinish />}
    </main>
  );
}
