import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosApps } from "react-icons/io";
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiSettings, FiPower } from 'react-icons/fi'; // Importe o ícone FiPower
import { RxPerson, RxSketchLogo } from 'react-icons/rx';

const Sidebar = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Limpar o estado de autenticação
    localStorage.removeItem('isLoggedIn');
    // Redirecionar para a página de login
    router.push('/login');
  };

  return (
    <div className='flex'>
      <div className='fixed w-20 h-screen p-4 bg-custom-color border-r-[1px] flex flex-col justify-between'>

        <div className='flex flex-col items-center'>
          <Link href='/'>
            <div className='bg-gray-100 hover:bg-gray-200  p-3 rounded-lg inline-block'>
              <IoIosApps size={20} />
            </div>
          </Link>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <Link href='/customers'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <RxPerson size={20} />
            </div>
          </Link>
          <Link href='/orders'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <HiOutlineShoppingBag size={20} />
            </div>
          </Link>
          {/* Substitua o botão de texto por um botão com o ícone FiPower */}
          <button onClick={handleLogout} className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
            <FiPower size={20} /> {/* Adicione o ícone FiPower */}
          </button>
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
