import { Character } from "./character";
import { Spell } from "./spell";

export class Side {
  constructor(private characters: Character[], public spell?: Spell) {}

  someWasAttacked(): boolean {
    return this.characters.some((character) => character.wasAttacked);
  }

  isDead(): boolean {
    return this.characters.every((c) => !c.isAlive());
  }
  attack(otherBando: Side, spell?: Spell) {
    /* Cada personaje ataca a otro del otro bando aleatoriamente */

    spell?.execute(this.characters, otherBando.characters);

    this.characters.forEach((character) =>
      character.attack(
        otherBando.characters[
          Math.floor(Math.random() * otherBando.characters.length)
        ]
      )
    );

    /* Cuando un personaje se queda sin vida se elimina del otro bando */
    otherBando.characters = otherBando.characters.filter(
      (character) => character.health > 0
    );
    spell?.clear(this.characters, otherBando.characters);
  }
}
