"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import LoggerComp from "@/components/Logger";
import SpellBar from "@/components/SpellBar";
import { Monster } from "@/game/monster";
import Side from "@/game/side";
import { Warrior, Wizard } from "@/game/hero";
import Weapon from "@/game/weapon";
import WarriorImage from "@/public/warrior.png";
import WizardImage from "@/public/wizard.png";
import MonsterImage from "@/public/monster1.png";
import NullImage from "@/public/nullImage.png";
import {
  Spell,
  HealAllSpell,
  RandomHealSpell,
  DamageSpell,
  DamageAllSpell,
  BoostDamageSpell,
} from "@/game/spell";
import MenuFinish from "@/components/MenuFinish";
import Character from "@/game/character";
import HealthBar from "@/components/healthBar";
import Logger from "@/game/logger";

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

let logger = new Logger();

let bando1 = new Side([
  new Warrior(new Weapon("Sable laser", 5)),
  new Wizard(),
]);
let bando2 = new Side([
  new Monster(35, new Weapon("palo", 3)),
  new Monster(35, new Weapon("palo", 10)),
  new Monster(35, new Weapon("palo", 5)),
]);
bando1.setLogger(logger);
bando2.setLogger(logger);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "finished">(
    "playing"
  );
  useEffect(() => {
    setMounted(true);
  }, []);

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

    logger.log(
      "--------------------------------------------------------------------"
    );
    if (bando1.isDead()) {
      logger.log("Ganó el bando 2!");
      setGameStatus("finished");
    } else if (bando2.isDead()) {
      logger.log("Ganó el bando 1!");
      setGameStatus("finished");
    }
  }, []);

  if (!mounted) return null;
  return (
    <main className="bg-[url(../public/bg-play2.png)] bg-cover bg-no-repeat bg-center h-screen w-screen flex justify-between items-center  p-2">
      <LoggerComp logger={logger} fullSize={gameStatus==="finished"} />
      
      {gameStatus === "playing" && (
        <>
          <SpellBar
            spells={spells.sideOneSpells}
            turn={turn}
            attacker={1}
            disabled={currentTurn % 2 === 0}
          />
          <div className="flex justify-between mt-48">
            <div className="mr-40">
              {bando1.getCharacters().map((char, index) => (
                <div key={index} style={{ marginLeft: `${index * -50}px` }}>
                  <HealthBar maxHp={char.maxHealth} currentHp={char.health} />
                  <Image
                    width={150}
                    height={150}
                    key={index}
                    src={getCharacterImage(char)}
                    alt={`${char.constructor.name} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="ml-40">
              {bando2.getCharacters().map((char, index) => (
                <div key={index} style={{ marginLeft: `${index * 50}px` }}>
                  <HealthBar maxHp={char.maxHealth} currentHp={char.health} />
                  <Image
                    width={150}
                    height={150}
                    key={index}
                    src={getCharacterImage(char)}
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
            disabled={currentTurn % 2 !== 0}
          />
        </>
      )}
      {gameStatus === "finished" && (
        <>
          <MenuFinish />
        </>
      )}
    </main>
  );
}
