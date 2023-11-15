"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import SpellBar from "@/components/SpellBar";
import { Monster } from "@/game/monster";
import Side from "@/game/side";
import { Warrior, Wizard } from "@/game/hero";
import Weapon from "@/game/weapon";
import WarriorAttackImage from '@/public/warriorAttack.gif';
import WarriorIdleImage from '@/public/warriorIdle1.gif';
import WarriorDeadImage from '@/public/warriorDead.gif';
import WizardIdleImage from '@/public/wizardIdle.gif';
import WizardAttackImage from '@/public/wizardAttack.gif';
import WizardDeadImage from '@/public/wizardDead.gif';
import MonsterIdleImage from '@/public/monsterIdle.gif';
import MonsterAttackImage from '@/public/monsterAttack.gif';
import MonsterDeadImage from '@/public/monsterDead.gif';
import Niebla from '@/public/niebla.png';
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
import AnimatedDivs from "@/components/animateDivs";




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


let bando1 = new Side([generateRandomCharacter(),
generateRandomCharacter(),]);
let bando2 = new Side([
  generateRandomCharacter(),
  generateRandomCharacter(),



]);

export default function Home() {



  const getCharacterImage = (character: Character, isSideTwo: boolean) => {
    let imageStyle = isSideTwo ? { transform: 'scaleX(-1)' } : {};
    let image;

    if (!character.isAlive()) {
   
      switch (character.constructor.name) {
        case 'Warrior':
          image = WarriorDeadImage;
          break;
        case 'Wizard':
          image = WizardDeadImage;
          break;
        case 'Monster':
          image = MonsterDeadImage;
          break;
        default:
          image = NullImage;
      }
    } else {

      switch (character.constructor.name) {
        case 'Warrior':
          image = character.isAttacking ? WarriorAttackImage : WarriorIdleImage;
          break;
        case 'Wizard':
          image = character.isAttacking ? WizardAttackImage : WizardIdleImage;
          break;
        case 'Monster':
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

  const [mounted, setMounted] = useState(false)
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "finished">(
    "playing"
  );
  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) return null
  return (
    <main className=" bg-[url(../public/bg-play2.gif)] bg-cover bg-no-repeat bg-center h-screen w-screen flex justify-between items-center  p-2">
      <AnimatedDivs />
      <div className="gallery z-10">
    <Image className="z-10" width={500}  height={500} src={Niebla} alt="Descripción de la imagen"/>
    <Image className="z-10" width={500}  height={500} src={Niebla} alt="Descripción de la imagen"/>
    <Image  className="z-10" width={500}  height={500} src={Niebla} alt="Descripción de la imagen"/>
    <Image  className="z-10" width={500}  height={500} src={Niebla} alt="Descripción de la imagen"/>
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
                  <div key={index} style={{ marginLeft: `${index * -50}px` }} className="flex flex-col items-center">
                    <HealthBar maxHp={char.maxHealth} currentHp={char.health} />
                    {getCharacterImage(char, false)}
                  </div>
                ))}
              </div>
              <div className="mr-52">

                {bando2.getCharacters().map((char, index) => (
                  <div key={index} style={{ marginLeft: `${index * 50}px` }} className="flex flex-col items-center">
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
