import React from "react";
import { Monster } from "@/game/monster";
import monsterImage from "@/public/monster1.png";
import Image from "next/image";

class MonsterComponent extends React.Component {
  monster = new Monster(100);

  render() {
    return (
      <div>
        <Image src={monsterImage} alt="" height={100} width={100}></Image>
      </div>
    );
  }
}

export default MonsterComponent;
