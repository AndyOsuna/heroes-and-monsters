import { StaticImageData } from "next/image";
import Character from "./character";
import celestialHarmonyIcon from "@/public/celestialHarmonyIcon.png";
// import fortuneMendIcon from "@/assets/fortuneMendIcon.png";
// import lifebaneBurstIcon from "@/assets/lifebaneBurstIcon.png";
// import riftbreakerIcon from "@/assets/riftbreakerIcon.png";
// import furyInfusionIcon from "@/assets/furyInfusionIcon.png";
// import guardiansRespiteIcon from "@/assets/guardiansRespiteIcon.png";

/**
 * Agregué el currentCooldown para poder trackearlo ahi a cada uno, luego en el game voy a agregar una funcion que les reste
 * 1 cada turno.
 */
export abstract class Spell {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly icon: StaticImageData,
    protected cooldown: number,
    public currentCooldown: number = 0
  ) {}

  abstract execute(alies: Character[], enemies: Character[]): void;
  abstract clear(alies: Character[], enemies: Character[]): void;
  getCurrentCooldown(): number {
    return this.currentCooldown;
  }
  lowCooldown(): void {
    if (this.currentCooldown > 0) this.currentCooldown--;
  }
  chechCd(): boolean {
    if (this.currentCooldown == 0) return true;
    return false;
  }

  static RandomSpell(): Spell {
    const cantSpells = 2;

    switch (Math.floor(Math.random() * cantSpells)) {
      case 0: {
        return new BoostDamageSpell();
      }
      case 1: {
        return new HealAllSpell();
      }
      default: {
        return new BoostDamageSpell();
      }
    }
  }
}

class IconSpell {
  constructor(readonly url: string) {}
}
/*
 * 6 Spells:
 *  1. Curar a todo el bando
 *  2. Realizar x cantidad de daño al bando enemigo
 *  3. Quitar 20 puntos de vida tanto a mi bando como al enemigo
 *  4. Curar a un objetivo random de mi bando
 *  5. Disminuye el daño recibido en un 30% durante un turno
 *  6. Aumenta el daño realizado en un 30% durante un turno
 */

/**
 * Curación global: sana a todos los personajes de todos los bandos.
 */
export class HealAllSpell extends Spell {
  constructor() {
    super(
      "Celestial Harmony",
      "Heal both sides members for 50% of their max health",
      celestialHarmonyIcon,
      6
    );
  }
  execute(alies: Character[], enemies: Character[]): void {
    if (this.currentCooldown > 0) {
      console.log("No se puede usar el hechizo, esta en cooldown");
      return;
    }
    alies.forEach((character) => {
      character.heal(character.maxHealth * 0.5);
    });
    enemies.forEach((character) => {
      character.heal(character.maxHealth * 0.5);
    });
    this.currentCooldown = this.cooldown;
  }
  clear(_alies: Character[], _enemies: Character[]): void {}
}

/**
 * Curar un compañero random del mismo bando
 */
export class RandomHealSpell extends Spell {
  constructor() {
    super(
      "Fortune's Mend",
      "Heals a random member of your side for 20% of their max health",
      celestialHarmonyIcon,
      2
    );
  }

  execute(alies: Character[], _enemies: Character[]): void {
    if (this.currentCooldown > 0) {
      console.log("No se puede usar el hechizo, esta en cooldown");
      return;
    }
    const randomAlie = alies[Math.floor(Math.random() * alies.length)];
    randomAlie.heal(randomAlie.maxHealth * 0.2);
    this.currentCooldown = this.cooldown;
  }
  clear(_alies: Character[], _enemies: Character[]): void {}
}

/**
 * Provoca cierto daño
 */
export class DamageSpell extends Spell {
  constructor() {
    super(
      "Riftbreaker",
      "Deals 5% of the enemy's max health as damage",
      celestialHarmonyIcon,
      2
    );
  }
  execute(_alies: Character[], enemies: Character[]): void {
    if (this.currentCooldown > 0) {
      console.log("No se puede usar el hechizo, esta en cooldown");
      return;
    }
    enemies.forEach((character) => {
      character.receiveDamage(character.maxHealth * 0.05);
    });
    this.currentCooldown = this.cooldown;
  }
  clear(_alies: Character[], _enemies: Character[]): void {}
}

/**
 * Provoca daños a todos los personajes en el juego
 */
export class DamageAllSpell extends Spell {
  constructor() {
    super(
      "Lifebane Burst",
      "Deals 30% of the max health to all characters",
      celestialHarmonyIcon,
      6
    );
  }
  execute(alies: Character[], enemies: Character[]): void {
    if (this.currentCooldown > 0) {
      console.log("No se puede usar el hechizo, esta en cooldown");
      return;
    }
    alies.forEach((character) => {
      character.receiveDamage(character.maxHealth * 0.3);
    });
    enemies.forEach((character) => {
      character.receiveDamage(character.maxHealth * 0.3);
    });
    this.currentCooldown = this.cooldown;
  }
  clear(_alies: Character[], _enemies: Character[]): void {}
}
/**
 * Aumenta 30% el daño realizado (sube el daño de las armas de mi bando)
 */
export class BoostDamageSpell extends Spell {
  constructor() {
    super(
      "Fury Infusion",
      "Bosts your side's weapon damage by 30% for one turn",
      celestialHarmonyIcon,
      5
    );
  }

  execute(alies: Character[]): void {
    if (this.currentCooldown > 0) {
      console.log("No se puede usar el hechizo, esta en cooldown");
      return;
    }
    alies.forEach((character) => {
      character.modifyDamage(1.3);
    });
    this.currentCooldown = this.cooldown;
  }
  clear(alies: Character[]): void {
    alies.forEach((character) => {
      character.modifyDamage(1 / 1.3);
    });
  }
}
