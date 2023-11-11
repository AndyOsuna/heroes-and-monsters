import Character from "./character";
export abstract class Spell {
  constructor(
    readonly name: string,
    private description: string,
    private icon: IconSpell,
    private cooldown: number
  ) {}

  abstract execute(alies: Character[], enemies: Character[]): void;
  abstract clear(alies: Character[], enemies: Character[]): void;

  static RandomSpell(): Spell {
    const cantSpells = 2;

    switch (Math.floor(Math.random() * cantSpells)) {
      case 0: {
        return new BoostDamageSpell();
      }
      case 1: {
        return new NerfDamageSpell();
      }
      default: {
        return new BoostDamageSpell();
      }
    }
  }
}

class IconSpell {
  constructor(private url: string) {}
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
//export class HealAllSpell extends Spell {}

/**
 * Curar un compañero random del mismo bando
 */
//export class RandomHealSpell extends Spell {}

/**
 * Provoca cierto daño
 */
//export class DamageSpell extends Spell {}

/**
 * Provoca daños a todos los personajes en el juego
 */
//export class DamageAllSpell extends Spell {}
/**
 * Aumenta 30% el daño realizado (sube el daño de las armas de mi bando)
 */
export class BoostDamageSpell extends Spell {
  constructor() {
    super(
      "BoostDamage",
      "Habilidad rre sarpada, mata a todos",
      new IconSpell("/xD.jpg"),
      5
    );
  }

  execute(alies: Character[]): void {
    alies.forEach((character) => {
      character.modifyDamage(1.3);
    });
  }
  clear(alies: Character[]): void {
    alies.forEach((character) => {
      character.modifyDamage(1 / 1.3);
    });
  }
}
export class NerfDamageSpell extends Spell {
  constructor() {
    super(
      "NeftDamage",
      "Habilidad rre sarpada, mata a todos",
      new IconSpell("/xD.jpg"),
      5
    );
  }

  execute(_alies: Character[], enemies: Character[]): void {
    enemies.forEach((character) => {
      character.modifyDamage(0.7);
    });
  }
  clear(_alies: Character[], enemies: Character[]): void {
    enemies.forEach((character) => {
      character.modifyDamage(1 / 0.7);
    });
  }
}
