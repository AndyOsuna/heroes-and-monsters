import React from 'react';
import { Wizard } from '@/game/hero';
import wizardImage from '@/public/wizard.png'; 
import Image from 'next/image';

class WizardComponent extends React.Component {
    wizard = new Wizard();

    render() {
        return (
            <div>
             <Image src={wizardImage} alt='' height={100} width={100}>
             </Image>
                
            </div>
        );
    }
}

export default WizardComponent;