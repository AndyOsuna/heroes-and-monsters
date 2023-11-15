import Character from "./character";
import Weapon from "./weapon";

export class Hero extends Character {
  isAttacking = false; 

  name = "Hero";
  maxHP = 100;
  HP = 100;

  attack(characterAttacked: Character) {
    this.isAttacking = true; 
    super.attack(characterAttacked);
    
   
    setTimeout(() => {
      this.isAttacking = false;
    }, 1000); 
}
}

export class Warrior extends Hero {
  name = "Warrior";

  constructor(weapon?: Weapon) {
    super(100, 3, 0, weapon);
  }
}
export class Wizard extends Hero {
  name = "Wizard";
  constructor() {
    super();
    this.weapon = new Weapon("spell", 20);
  }
}
