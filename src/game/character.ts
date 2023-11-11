import Weapon from "./weapon";

export default abstract class Character {
  abstract readonly name: string;
  private attacked = false;

  constructor(
    protected HP: number = 1,
    protected damageMultiplier: number = 1,
    protected defaultDamage: number = 0,
    protected weapon?: Weapon
  ) {}

  get health() {
    return this.HP;
  }
  get wasAttacked() {
    return this.attacked;
  }

  isAlive(): boolean {
    return this.HP > 0;
  }

  attack(characterAttacked: Character): void {
    let damage = this.defaultDamage;
    if (this.weapon) damage = this.weapon.damage;
    damage *= this.damageMultiplier;

    characterAttacked.receiveDamage(damage);
    console.log(
      `(${this.name}: ${this.HP} HP) attacks (${characterAttacked.name}: ${characterAttacked.HP} HP) for ${damage} damage`
    );
  }

  private receiveDamage(damage: number) {
    if (!this.attacked) this.attacked = true;

    this.HP -= damage;
    if (this.HP <= 0) {
      this.HP = 0;
      console.log(`${this.name} ha sido derrotado`);
    }
  }

  healing(HP: number) {
    if (HP > 0) this.HP += HP;
  }

  equipe(weapon: Weapon): void {
    this.weapon = weapon;
  }

  /**
   * @params dmg Multiplicador
   */
  modifyDamage(damageMultiplier: number) {
    if (this.weapon)
      this.weapon.damage = Math.round(this.weapon.damage * damageMultiplier);
  }
}
