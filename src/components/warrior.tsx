import React from 'react';
import { Warrior } from '@/game/hero';
import warriorImage from '@/public/warrior.png'; 
import Image from 'next/image';

class WarriorComponent extends React.Component {
    warrior = new Warrior();

    render() {
        return (
            <div>
             <Image src={warriorImage} alt='' height={100} width={100}>
             </Image>
                
            </div>
        );
    }
}

export default WarriorComponent;
