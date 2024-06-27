'use client';
import React from 'react';
import icon from '../../../public/images/kids/kids-button-icon.svg'; 
import image from '../../../public/images/kids/kids-button-img.svg';
import Image from 'next/image';
import './landing-switch-button.scss';

const KidsButton = () => {
  return (

    <div className='kids-button'>
      <div className="kids-button__icon-wrap">
        <Image className='kids-button__icon' src={icon} alt="" />
      </div>
      <div className="kids-button__image-wrap">
        <Image className='kids-button__image' src={image} alt="" />
      </div>
    </div>
  );
};

export default KidsButton;