import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMoneyBillWave, FaRegChartBar ,FaClipboardList, FaBullseye, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const TopCards = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Função para buscar os dados da API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api4-eta.vercel.app/todos');
        const userLogin = parseInt(localStorage.getItem('userLogin'));
        
        // Filtrar os dados com base no login do usuário
        const filteredData = response.data.filter(item => item.cd_representant === userLogin);
        setData(filteredData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  // Calculando os totais
  const totalSum = data.reduce((accumulator, item) => accumulator + parseFloat(item.valor), 0);
  const totalQtd = data.reduce((accumulator, item) => accumulator + item.qtd, 0);
  const totalMeta = data.reduce((accumulator, item) => accumulator + item.meta, 0);

  // Calculando a porcentagem da meta em relação às vendas
  const percentageMeta = totalMeta > 0 ? (totalSum / totalMeta) * 100 : 0;

  return (
    <div className='grid lg:grid-cols-3 gap-4 p-4'>
      {/* Primeiro Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>
            {totalSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <p className='text-gray-600'>VENDAS (R$)</p>
        </div>
        <FaMoneyBillWave className='text-green-800 text-4xl ml-4' />
      </div>

      {/* Segundo Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>{totalQtd}</p>
          <p className='text-gray-600'>QUANTIDADE DE PEÇAS</p>
        </div>
        <FaClipboardList className='text-blue-800 text-4xl ml-4' />
      </div>

      {/* Terceiro Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>
            {totalMeta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <p className='text-gray-600'>META (R$)</p>
        </div>
        <FaBullseye className='text-gray-800 text-4xl ml-4' />
      </div>

      {/* Quarto Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>{percentageMeta.toFixed(2)}%</p>
          <p className='text-gray-600'>ATINGIDO (%)</p>
        </div>
        <FaRegChartBar className='text-pink-800 text-4xl ml-4' />
      </div>

      {/* Quinto Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>32</p>
          <p className='text-gray-600'>CLIENTES ATIVOS</p>
        </div>
        <FaUserCheck className='text-green-500 text-4xl ml-4' />
      </div>

      {/* Sexto Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>27</p>
          <p className='text-gray-600'>CLIENTES INATIVOS</p>
        </div>
        <FaUserTimes className='text-red-500 text-4xl ml-4' />
      </div>
    </div>
  );
}

export default TopCards;
