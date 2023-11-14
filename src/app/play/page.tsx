"use client";
import { useCallback, useState } from "react";
import Image from 'next/image';
import SpellBar from "@/components/SpellBar";
import { Monster } from "@/game/monster";
import Side from "@/game/side";
import { Warrior, Wizard } from "@/game/hero";
import Weapon from "@/game/weapon";
import Prueba from "@/public/spr_KingWalk_strip_no_bkg.png";
import WarriorImage from '@/public/warrior.png';
import WizardImage from '@/public/wizard.png';
import MonsterImage from '@/public/monster1.png';
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


const getCharacterImage = (character: Character) => {
  switch(character.constructor.name) {
    case 'Warrior':
      return WarriorImage;
    case 'Wizard':
      return WizardImage;
    case 'Monster':
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

let bando1 = new Side([new Warrior(new Weapon("Sable laser", 5)),
new Wizard() ]);
let bando2 = new Side([
  new Monster(35, new Weapon("palo", 3)),
  new Monster(35, new Weapon("palo", 10)),
  new Monster(35, new Weapon("palo", 5)),
  
]);

const bando1Characters = bando1.getCharacters();
const bando2Characters = bando2.getCharacters();

export default function Home() {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "finished">(
    "playing"
  );
  const [isAttackAnimationVisible, setAttackAnimationVisible] = useState(false);

  const turn = useCallback((attacker: number, usedSpell: Spell) => {
    setAttackAnimationVisible(true);
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
    <main className="bg-[url(https://i.postimg.cc/0NwQq9VN/bg-play.png)] bg-center bg-no-repeat h-screen w-screen flex justify-between items-center  p-2">



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
    <Image width={150} height={150} key={index} src={getCharacterImage(char)} alt={`${char.constructor.name} ${index + 1}`} />
  ))}
</div>
<div className="ml-40">

  {bando2.getCharacters().map((char, index) => (
    <div style={{ marginLeft: `${index * 10}px` }}> 
    <Image width={150} height={150} key={index} src={getCharacterImage(char)} alt={`${char.constructor.name} ${index + 1}`} />
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
        
        
           <Image
              className={`h-56 ${isAttackAnimationVisible ? "" : ""}`}
              src={Prueba}
              style={{
                display: isAttackAnimationVisible ? "block" : "none",
                position: "absolute",
                top: "50%", 
                left: currentTurn % 2 === 0 ? "10%" : "auto",
                right: currentTurn % 2 !== 0 ? "-50%" : "auto", 
                transform: "translate(-50%, -50%)",
                transition: "left 0.2s ease-out, right 0.2s ease-out",
                
              }}
              alt=""      
           />
        </>
      )}
      {gameStatus === "finished" && <MenuFinish />}
    </main>
  );
}
