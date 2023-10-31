import { Character } from "./character";

export class Bando {
  constructor(private characters: Character[]) {}

  someWasAttacked(): boolean {
    return this.characters.some((character) => character.wasAttacked);
  }

  isDead(): boolean {
    return this.characters.every((c) => !c.isAlive());
  }
  attack(otherBando: Bando) {
    this.characters.forEach((character) =>
      character.attack(
        otherBando.characters[
          Math.floor(Math.random() * otherBando.characters.length)
        ]
      )
    );

    otherBando.characters = otherBando.characters.filter(
      (character) => character.health > 0
    );
  }
}
