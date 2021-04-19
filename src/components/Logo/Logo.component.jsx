import React from 'react';
import { ReactComponent as ReactLogo } from '../../assets/logoText.svg';

export default function Logo({ className }) {
  return (
    <div className={`flex flex-row dark:text-white text-black-900 ${className}`}>
      <img src="/watermelon-icon.png" alt="LogoIcon" className="h-16" />
      <ReactLogo className=" w-32" />
    </div>
  );
}
