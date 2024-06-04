import React, { useEffect, useState } from 'react';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';

const Customers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('https://api4-eta.vercel.app/cli')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between p-4'>
      <h2 className='text-gray-800 font-bold text-XL2' >LISTA DE CLIENTES </h2>
      </div>
      <ul>
        {data.map((order, id) => {
          // Extracting the first four characters

          return (
            <li
              key={id}
              className='bg-gray-50 hover:bg-gray-100 rounded-lg my-2 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 cursor-pointer'
            >
              <div className='flex items-center'>
                <div className='bg-custom-color  p-3 rounded-lg'>
                  <BsPersonFill className='text-gray-800' />
                </div>
                <div className='pl-3'>
                  <p className='text-gray-800 text-xs font-semibold'>
                    {order.nome}
                  </p>
                  <p className='text-gray-800 text-xs font-semibold truncate'>
                    Primeira Compra: {new Date(order.primeiracompra).toLocaleDateString()}
                  </p>
                  <p className='text-gray-800 font-bold text-xs'>
                    Última Compra: {new Date(order.ultimacompra).toLocaleDateString()}
                  </p>
                  <p className='text-gray-800 text-xs truncate'>
                    CNPJ: {order.cpfcnpj}
                  </p>
                  <p className='text-gray-800 text-xs truncate'>
                    {order.cidade} - {order.uf}
                  </p>
                  <p className='text-gray-600 text-xs truncate'>
                    CEP: {order.cep}
                  </p>
                  <p className='text-gray-600 text-xs truncate'>
                    TEL: {order.telefone}
                  </p>
                  <p className='text-gray-600 text-xs truncate'>
                    {order.email}
                  </p>
                </div>
                <div className='sm:flex hidden justify-between items-center'>
                  <BsThreeDotsVertical />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default Customers;
