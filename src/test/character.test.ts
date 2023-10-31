import { describe, expect, it } from "vitest";
import { Monster } from "../game/monster";
import { Weapon } from "../game/weapon";

describe("Character things...", () => {
  it("The HP cannot be less than 0", () => {
    const monster = new Monster(100);
    const monster2 = new Monster(100);

    monster.equipe(new Weapon("nice try", 99999));
    monster.attack(monster2);

    expect(monster2.health).toBe(0);
  });
});
