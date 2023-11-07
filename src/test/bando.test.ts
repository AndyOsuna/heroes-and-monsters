import { describe, expect, it } from "vitest";
import { Character } from "../game/character";
import { Warrior, Wizard } from "../game/hero";
import { Side } from "../game/side";
import { Weapon } from "../game/weapon";

describe("Bandos", () => {
  it("Un bando ataca a otro", () => {
    const listitaCharacters: Character[] = [];
    listitaCharacters.push(new Wizard(), new Warrior(new Weapon("Palo", 1)));
    const listitaCharacters2: Character[] = [];
    listitaCharacters2.push(new Wizard(), new Warrior());

    const b1 = new Side(listitaCharacters);
    const b2 = new Side(listitaCharacters2);

    b1.attack(b2);

    expect(b2.someWasAttacked).toBeTruthy();
  });
});
