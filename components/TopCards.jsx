import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopCards = () => {
  const [data, setData] = useState([]);
  
  // Função para converter o formato de moeda brasileiro para número
  function parseCurrency(value) {
    return parseFloat(value.replace("R$", "").replace(/\./g, "").replace(",", "."));
  }

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api4-eta.vercel.app/todos');
        setData(response.data);
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

  return (
    <div className='grid lg:grid-cols-3 gap-4 p-4'>
      {/* Primeiro Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>
            {totalSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <p className='text-gray-600'>VENDAS (R$)</p>
        </div>
      </div>

      {/* Segundo Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>{totalQtd}</p>
          <p className='text-gray-600'> QUANTIDADE </p>
        </div>
      </div>

      {/* Terceiro Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>
            {totalMeta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <p className='text-gray-600'>META (R$)</p>
        </div>
      </div>
      {/* Quarto Card */}
      <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>
            1373</p>
          <p className='text-gray-600'>CLIENTES ATIVOS</p>
        </div>
      </div>
      {/* Quarto Card */}
          <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-2'>
          <p className='text-2xl font-bold'>
          1395 </p>
          <p className='text-gray-600'>CLIENTES INATIVOS</p>
        </div>
      </div>

    </div>
  


  );
}

export default TopCards;
