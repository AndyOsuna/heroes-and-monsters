import { describe, expect, it } from "vitest";
import { Monster } from "../game/monster";
import { Weapon } from "../game/weapon";

describe("Monster attack", () => {
  it("Monster attack without weapon", () => {
    const monster = new Monster(100);
    const monster2 = new Monster(100);

    monster.attack(monster2);

    expect(monster2.health).toBe(99);
  });

  it("Monster attack with weapon", () => {
    const monster = new Monster(100);
    const monster2 = new Monster(100);

    monster.equipe(new Weapon("la poderosa", 10));

    monster.attack(monster2);

    expect(monster2.health).toBe(90);
  });
});
