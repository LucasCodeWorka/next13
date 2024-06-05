import React from 'react';
import { FiCalendar } from 'react-icons/fi';

const Header = () => {
  return (
    <div className='flex justify-between px-4 pt-4 bg-gray-100 border-b border-gray-300'>
      <div className="flex items-center">
        <h2 className='text-custom-color font-bold text-3xl'>LIEBE</h2>
      </div>
      <div className="flex items-center">
        <FiCalendar className="text-custom-color text-2xl mr-2" />
        <span className='text-gray-600 font-semibold text-lg'>Maio de 2024</span> 
      </div>
    </div>
  );
};

export default Header;
