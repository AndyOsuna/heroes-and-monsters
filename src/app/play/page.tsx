"use client";

import LoggerComp from "@/components/Logger";
import MenuFinish from "@/components/MenuFinish";
import SpellBar from "@/components/SpellBar";
import AnimatedDivs from "@/components/animateDivs";
import HealthBar from "@/components/healthBar";

import Character from "@/game/character";
import { Warrior, Wizard } from "@/game/hero";
import Logger from "@/game/logger";
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

import MonsterImage from "@/public/monster1.png";
import MonsterAttackImage from "@/public/monsterAttack1.gif";
import MonsterDeadImage from "@/public/monsterDead.gif";
import MonsterIdleImage from "@/public/monsterIdle.gif";
import Niebla from "@/public/niebla.png";
import NullImage from "@/public/nullImage.png";
import WarriorImage from "@/public/warrior.png";
import WarriorAttackImage from "@/public/warriorAttack1.gif";
import WarriorDeadImage from "@/public/warriorDead.gif";
import WarriorIdleImage from "@/public/warriorIdle1.gif";
import WizardImage from "@/public/wizard.png";
import WizardAttackImage from "@/public/wizardAttack1.gif";
import WizardDeadImage from "@/public/wizardDead.gif";
import WizardIdleImage from "@/public/wizardIdle.gif";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
function generateRandomCharacter() {
  const randomNum = Math.floor(Math.random() * 3);
  switch (randomNum) {
    case 0:
      return new Warrior(new Weapon("Espada", 10));
    case 1:
      return new Wizard();
    case 2:
      return new Monster(30, new Weapon("Garra", 8));
    default:
      return new Warrior(new Weapon("Espada", 10));
  }
}
let logger = new Logger();
let bando1 = new Side([generateRandomCharacter(), generateRandomCharacter()]);
let bando2 = new Side([generateRandomCharacter(), generateRandomCharacter()]);
bando1.setLogger(logger);
bando2.setLogger(logger);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const cursorStyle = {
    cursor: `url('/cursor.png'), auto`,
  };

  const getCharacterImage = (character: Character, isSideTwo: boolean) => {
    let imageStyle = isSideTwo ? { transform: "scaleX(-1)" } : {};
    let image;

    if (!character.isAlive()) {
      switch (character.constructor.name) {
        case "Warrior":
          image = WarriorDeadImage;
          break;
        case "Wizard":
          image = WizardDeadImage;
          break;
        case "Monster":
          image = MonsterDeadImage;
          break;
        default:
          image = NullImage;
      }
    } else {
      switch (character.constructor.name) {
        case "Warrior":
          image = character.isAttacking ? WarriorAttackImage : WarriorIdleImage;
          break;
        case "Wizard":
          image = character.isAttacking ? WizardAttackImage : WizardIdleImage;
          break;
        case "Monster":
          image = character.isAttacking ? MonsterAttackImage : MonsterIdleImage;
          break;
        default:
          image = NullImage;
      }
    }

    return (
      <Image
        style={imageStyle}
        width={150}
        height={150}
        src={image}
        alt={`${character.constructor.name}`}
      />
    );
  };

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
    <main className="main_cursor bg-[url(../public/bg-play2.gif)] bg-cover bg-no-repeat bg-center h-screen w-screen flex justify-between items-center  p-2">
      <LoggerComp logger={logger} fullSize={gameStatus === "finished"} />
      <AnimatedDivs />
      <div className="gallery z-10">
        <Image className="z-10" width={500} height={500} src={Niebla} alt="" />
        <Image className="z-10" width={500} height={500} src={Niebla} alt="" />
        <Image className="z-10" width={500} height={500} src={Niebla} alt="" />
        <Image className="z-10" width={500} height={500} src={Niebla} alt="" />
      </div>
      <div className="h-screen w-screen flex justify-between items-center">
        {gameStatus === "playing" && (
          <>
            <SpellBar
              spells={spells.sideOneSpells}
              turn={turn}
              attacker={1}
              disabled={currentTurn % 2 === 0}
            />
            <div className="flex w-full justify-between mt-36">
              <div className="ml-52">
                {bando1.getCharacters().map((char, index) => (
                  <div
                    key={index}
                    style={{ marginLeft: `${index * -50}px` }}
                    className="flex flex-col items-center"
                  >
                    <HealthBar maxHp={char.maxHealth} currentHp={char.health} />
                    {getCharacterImage(char, true)}
                  </div>
                ))}
              </div>
              <div className="ml-40">
                {bando2.getCharacters().map((char, index) => (
                  <div
                    key={index}
                    style={{ marginLeft: `${index * 50}px` }}
                    className="flex flex-col items-center"
                  >
                    <HealthBar maxHp={char.maxHealth} currentHp={char.health} />
                    {getCharacterImage(char, true)}
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
        {gameStatus === "finished" && <MenuFinish />}
      </div>
    </main>
  );
}
