import React from 'react';
import appLogo from '../assets/app-logo.png';

function LazyLoad() {
  return (
    <div className='container2'>
        <img className='image-wiggle' src={appLogo}/>
    </div>
  )
}

export default LazyLoad;