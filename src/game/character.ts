import Logger from "./logger";
import Weapon from "./weapon";
/*
 ? Reworkee un poco la clase para agregar la vida máxima, y cuando la instancias le pasas la vida máxima y el HP
 ? ya se setea en base a esa vida máxima. Eso lo pongo pq va a ser útil para barras de vida, spells que usen de referencia la
 ? vida máxima, etc.  
*/

export default abstract class Character {
  abstract readonly name: string;
  private attacked = false;
  protected HP: number;
  protected logger?: Logger;
  isAttacking: boolean = false;

  constructor(
    protected maxHP: number = 1,
    protected damageMultiplier: number = 1,
    protected defaultDamage: number = 0,
    protected weapon?: Weapon
  ) {
    this.HP = maxHP;
  }
  setLogger(logger: Logger) {
    this.logger = logger;
  }
  get maxHealth() {
    return this.maxHP;
  }
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

    let newWeapon = characterAttacked.receiveDamage(damage);
    if (this.logger)
      this.logger.log(
        `(${this.name}: ${this.HP} HP) attacks (${characterAttacked.name}: ${characterAttacked.HP} HP) for ${damage} damage`
      );
    if (newWeapon) {
      if (this.logger)
        this.logger.log(
          `${this.name} se equipó su nueva arma: ${newWeapon.name}(${newWeapon.damage})`
        );
      this.weapon = newWeapon;
    }
  }

  //! Le quité el private para poder hacerle damage con las spells ademas de las armas
  receiveDamage(damage: number): void | Weapon {
    if (!this.attacked) this.attacked = true;

    this.HP -= damage;
    if (this.HP <= 0) {
      this.HP = 0;
      if (this.logger) this.logger.log(`${this.name} ha sido derrotado`);
    }
  }

  heal(HP: number) {
    if (HP > 0) {
      if (this.HP + HP > this.maxHP) this.HP == this.maxHP;
      else this.HP += HP;
    }
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
