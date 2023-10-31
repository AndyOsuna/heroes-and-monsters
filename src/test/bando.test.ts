import { describe, expect, it } from "vitest";
import { Bando } from "../game/bando";
import { Character } from "../game/character";
import { Warrior, Wizard } from "../game/hero";
import { Weapon } from "../game/weapon";

describe("Bandos", () => {
  it("Un bando ataca a otro", () => {
    const listitaCharacters: Character[] = [];
    listitaCharacters.push(new Wizard(), new Warrior(new Weapon("Palo", 1)));
    const listitaCharacters2: Character[] = [];
    listitaCharacters2.push(new Wizard(), new Warrior());

    const b1 = new Bando(listitaCharacters);
    const b2 = new Bando(listitaCharacters2);

    b1.attack(b2);

    expect(b2.someWasAttacked).toBeTruthy();
  });
});
