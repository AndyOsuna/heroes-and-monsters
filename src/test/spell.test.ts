import { describe, it } from "vitest";
import { Wizard } from "../game/hero";
import Side from "../game/side";
import { BoostDamageSpell } from "../game/spell";

describe("Spells", () => {
  it("BoostDamageSpell with Wizard, damage should be 30% greater", () => {
    const spell = new BoostDamageSpell();
    const side1 = new Side([new Wizard()]);
    const side2 = new Side([new Wizard()]);

    side1.attack(side2, spell);
  });
});
