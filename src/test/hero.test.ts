import { describe, expect, it } from "vitest";
import { Warrior, Wizard } from "../game/hero";
import { Weapon } from "../game/weapon";

describe("Heroes attack", () => {
  it("Warrior attack; triplies damage of his weapon", () => {
    const warrior = new Warrior();
    const warrior2 = new Warrior();

    warrior.equipe(new Weapon("Espadachín", 8));

    warrior.attack(warrior2);

    expect(warrior2.health).toBe(100 - 24);
  });

  it("Wizard attack", () => {
    const wizard = new Wizard();
    const wizard2 = new Wizard();

    wizard.equipe(new Weapon("wingardium leviosa", 9));

    wizard.attack(wizard2);

    expect(wizard2.health).toBe(91);
  });
});
