import Image from 'next/image';
import React from 'react';

import icon from '../../../public/images/adult/adult-button-icon.svg';
import frog from '../../../public/images/kids/screen-frog.png';
import jap from '../../../public/images/kids/sceen-red-logo.svg';

const AdultButton = () => {
  return (
    <div className='adult-button'>
      <div className="adult-button__section blue">
        <Image src={icon} alt=''/>
      </div>
    </div>
  );
};

export default AdultButton;