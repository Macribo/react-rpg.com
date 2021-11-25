import React from 'react';

import { version } from '../../../package.json';

import './styles.scss';

const Footer = () => {
  return(
    <div className='footer__container'>

      <span>{`Deartha le ♥ ag Andrew Steinheiser - v${version} - `}</span>
      <a className='footer__link'
        href='https://github.com/ASteinheiser/react-rpg.com'
        target='_blank'
        rel='noopener noreferrer'>
        {'cód foinse'}
      </a>
      <br/>
      <span>{`Leagan Gaelach á forbairt`}</span>
      <a className='footer__link'
        href='https://github.com/ASteinheiser/react-rpg.com'
        target='_blank'
        rel='noopener noreferrer'>
        {'anseo'}
      </a>

    </div>
  );
};

export default Footer;